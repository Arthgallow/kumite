from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Fighter



fighter_routes = Blueprint('fighters', __name__)

@fighter_routes.route('/')
@login_required
def get_all_fighters():
    print("*"*50)
    results = db.session.query(Fighter, User).join(User).all()
    print("GETTING ALL fighters", results)
    data = [(u.to_dict() , f.to_dict()) for f, u in results]

    return jsonify(data)
