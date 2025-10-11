from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

bcrypt = Bcrypt()
db = SQLAlchemy()
auth_bp = Blueprint("auth", __name__)

# === Models ===
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class LoginLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)

# === Routes ===
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(name=name, email=email, password=hashed_pw)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id

        log = LoginLog(email=email)
        db.session.add(log)
        db.session.commit()

        return jsonify({"message": "Login successful", "name": user.name}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out"}), 200
