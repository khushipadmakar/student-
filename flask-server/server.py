from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database import db, User


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
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST','GET'])
def login():
    data = request.get_json()
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





if __name__ == "__main__":
    app.run(debug = True ,port = 5000)
