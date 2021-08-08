from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Fighter

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    results = db.session.query(Fighter, User).join(User).all()
    print("GETTING ALL fighters", results)
    data = [(u.to_dict() , f.to_dict()) for f, u in results]
    print("GETTING ALL fighters", data)

    return jsonify(data)

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
