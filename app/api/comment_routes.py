from flask import Blueprint, jsonify, request, session
from sqlalchemy import inspect
from app.models import db, Comment,User
from app.models.comment import new_comment, comment_thread




comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['POST'])
def add_comment():
    print("HELLO", request.json['user_id'])
    print("Session", session)
    comment = Comment(
        user_id=request.json['user_id'],
        description=request.json['description'],
    )
    db.session.add(comment)
    db.session.commit()
    length = len(Comment.query.all())
    print("LEN",length)
    comment = Comment.query.get(length)
    print("COMMENT", comment)
    return {"comment" : comment.to_dict()}




@comment_routes.route('/users/<int:user_id>')
def get_user_comments(user_id):
    print("AHHHHH", user_id)

    user = User.query.get(user_id)
    user_comments= {"comments": [comment.to_dict() for comment in user.comments]}
    return user_comments, 200


@comment_routes.route('/<int:id>')
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return None, 204
