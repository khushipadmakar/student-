from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database import db, User
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier


app = Flask(__name__)

# Enable CORS for frontend requests
cors = CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})

# Configurations
app.config['JWT_SECRET_KEY'] = 'super-secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

db.init_app(app)
jwt = JWTManager(app)

# Ensure database tables are created
with app.app_context():
    db.create_all()

@app.route('/api/signup', methods=['POST','GET'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    user = User.query.filter_by(username=data['username']).first()

    if not user:
        return jsonify({'message': 'User does not exist'}), 404
    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token, 'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


num_rows = 500
np.random.seed(42)

data = {
    'CGPA': np.round(np.random.uniform(5.0, 10.0, num_rows), 2),
    'Attendance': np.random.randint(50, 100, num_rows),
    'Backlogs': np.random.randint(0, 5, num_rows),
    'Coding_Skills': np.random.randint(1, 11, num_rows),
    'Projects': np.random.randint(1, 6, num_rows),
    'Internships': np.random.randint(0, 5, num_rows),
    'Certifications': np.random.randint(1, 6, num_rows),
    'Placement': np.random.choice([0, 1], num_rows, p=[0.4, 0.6])
}
df = pd.DataFrame(data)

# Train Model
X = df.drop(columns=['Placement'])
y = df['Placement']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Improvement Suggestions
improvement_tips = {
    "CGPA": "Revise concepts and practice previous exam papers.",
    "Attendance": "Attend lectures and participate in discussions.",
    "Backlogs": "Seek mentorship and clear your backlogs.",
    "Coding_Skills": "Practice coding on LeetCode, CodeChef, and HackerRank.",
    "Projects": "Work on real-world projects to enhance skills.",
    "Internships": "Apply for internships on LinkedIn, Internshala.",
    "Certifications": "Complete online courses from Coursera, Udemy, edX."
}
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        student_data = request.json
        student_df = pd.DataFrame([student_data])

        # Make Prediction
        prediction = rf.predict(student_df)[0]

        # Identify Weak Areas (Exclude Backlogs from this logic)
        low_performance = [
            feature for feature in student_data 
            if student_data[feature] < df[feature].median() and feature != "Backlogs"
        ]

        improvement_suggestions = {
            feature: improvement_tips[feature] 
            for feature in low_performance if feature in improvement_tips
        }

        response = {
            "prediction": "Placed" if prediction == 1 else "Not Placed",
            "message": "Congratulations! You are likely to be placed." if prediction == 1 else "You need to work on improving your skills.",
            "suggestions": improvement_suggestions
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == "__main__":
    app.run(debug = True ,port = 5000)