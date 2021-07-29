from flask import Blueprint, jsonify, request, session
from sqlalchemy import inspect
from app.models import Comment
from app.models.comment import new_comment, comment_thread




comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/users/<int:user_id>')
def get_user_comments(user_id):
    print("AHHHHH", user_id)
    comments=Comment.query.filter_by(user_id=user_id).first()



    print("Comment", comments.to_dict())
    thread = {"thread": [comment.to_dict() for comment in comments.thread]}
    print("STUFF",thread)

    # thread = comment_thread.query.all()
    # print("THREAD", thread)

    # data= Comment.query.all()
    # return {"comments": [data.to_dict() for data in data]}
    # return {"comments": comments.to_dict()}


@comment_routes.route('/users/<int:user_id>/comments', methods=['POST'])
