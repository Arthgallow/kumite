from flask import Blueprint, jsonify, request
from app.models import db, User, Fighter


fighter_routes = Blueprint('fighters', __name__)

@fighter_routes.route('/')
def get_all_fighters():
    print("*"*50)
    results = db.session.query(Fighter, User).join(User).all()
    print("GETTING ALL fighters", results)
    data = [(u.to_dict() , f.to_dict()) for f, u in results]
    print("UMM",  data)
    print("*"*50)
    return jsonify(data)
