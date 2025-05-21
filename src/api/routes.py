from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

bcrypt = Bcrypt()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "¡Hola! Soy un mensaje desde el backend, revisa la pestaña de red en el inspector de Google."
    }
    return jsonify(response_body), 200

@api.route('/public', methods=['GET'])
def public_route():
    response_body = {
        "message": "Hola, soy una ruta pública"
    }
    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    response_body = {
        "message": f"Hola {user.email}, soy una ruta privada"
    }
    return jsonify(response_body), 200

@api.route('/user/login', methods=["POST"])
def sign_in():
    data_request = request.get_json()
    if not data_request.get('email') or not data_request.get('password'):
        return jsonify({"message": "Los campos: email y password son requeridos"}), 400
    user = User.query.filter_by(email=data_request["email"]).first()
    if not user or not bcrypt.check_password_hash(user.password, data_request["password"]):
        return jsonify({"message": "El email o la contraseña es incorrecto"}), 401
    try:
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "token": access_token,
            "user": user.serialize()
        }), 200
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"message": "Error en el servidor"}), 500

@api.route('/user/create', methods=["POST"])
def create_user():
    data_request = request.get_json()
    if not data_request.get('email') or not data_request.get('password'):
        return jsonify({"message": "Los campos: email y password son requeridos"}), 400
    if User.query.filter_by(email=data_request["email"]).first():
        return jsonify({"message": "El correo ya está registrado"}), 409
    # Validación adicional de contraseña (opcional)
    if len(data_request["password"]) < 8:
        return jsonify({"message": "La contraseña debe tener al menos 8 caracteres"}), 400
    new_user = User(
        email=data_request["email"],
        password=bcrypt.generate_password_hash(data_request["password"]).decode('utf-8')
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuario creado exitosamente"}), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"message": "Error en el servidor al crear el usuario"}), 500