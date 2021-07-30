from types import resolve_bases
from flask import Blueprint, jsonify, request, session
from sqlalchemy import inspect
from app.models import db, Comment,User
from app.models.comment import new_comment, comment_thread




comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['POST'])
def add_comment():
    print("JUMP", request.json)
    if(request.json['type'] == "User"):
        comment = Comment(
            user_id=request.json['user_id'],
            description=request.json['description'],
        )

        db.session.add(comment)
        db.session.commit()
        print('comment', comment, comment.id)
        length = len(Comment.query.all())
        print("length", length)
        # comment = Comment.query.get(length)
        user= User.query.get(int(request.json['objId']))
        print('user', user)
        user.comments.append(comment)
        db.session.commit()

    if(request.json['type'] == "location"):
        comment = Comment(
            user_id=request.json['user_id'],
            description=request.json['description'],
        )
        db.session.add(comment)
        db.session.commit()

    return {"comments" : comment.to_dict()}




@comment_routes.route('/<feature>/<int:id>/')
def get_comments(feature, id):
    feature=eval(feature).query.get(id)
    return {"comments": [comment.to_dict() for comment in feature.comments]}


@comment_routes.route('/<int:id>/', methods=['DELETE'])
def delete_comment(id):
    print("commentId", id)
    comment=Comment.query.get(id)
    print("feature", comment)
    db.session.delete(comment)
    db.session.commit()
    return {"Message": "Comment Deleted"}

@comment_routes.route('/<int:id>/', methods=['POST'])
def get_one_comment(id):
    print("REQ", request.json)
    comment = Comment.query.get(id)
    comment.description = request.json['description']
    db.session.commit()
    return {"Message": "Comment Updated"}





"This route is good for deleting anything that is not a comment"
# @comment_routes.route('/<feature>/<int:id>/', methods=['DELETE'])
# def delete_comment(feature, id):
#     print("feature ", feature)
#     feature=eval(feature).query.get(id)
#     print("feature", feature)
#     db.session.delete(comment)
#     db.session.commit()
#     return None, 204
