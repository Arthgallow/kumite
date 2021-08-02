from flask import Blueprint, jsonify, request, session
from sqlalchemy import inspect
from app.models import db, Comment,User
from app.models.comment import new_comment, comment_thread




comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['POST'])
def add_comment():
    data=eval(request.json['type']).query.get(int(request.json['objId']))

    comment = Comment(
        user_id=request.json['user_id'],
        description=request.json['description'],
        user_name=request.json['user_name'],
        user_img =request.json['user_img'] ,
    )

    db.session.add(comment)
    db.session.commit()
    print('*'*50)
    print("NEW COMMENT", comment)
    print('*'*50)

    if(request.json['type'] == "Comment"):
        print('*'*50)
        print("ADD COMMENT", request.json['objId'], comment.id)
        print("Insert Before", request.json['objId'], comment.user_id)
        print('*'*50)
        print('*'*50)
        add_comment = new_comment.insert().values(user_id=int(request.json['objId']), comment_id=comment.id)
        print('*'*50)
        print("Insert After", add_comment)
        print('*'*50)
        db.session.execute(add_comment)
        db.session.commit()

        add_to_thread = comment_thread.insert().values()


    if(request.json['type'] == "User"):
        print("*"*80)
        print("FUCK", request.json)
        comment = Comment(
            user_id=request.json['user_id'],
            description=request.json['description'],
            user_name=request.json['user_name'],
        )

        feature = data.query.get(int(request.json['objId']))
        feature.comments.append(comment)
        db.session.commit()

    print('*'*50)
    print("Hit the Return ", {"comments" : comment.to_dict()})
    print('*'*50)

    return {"comments" : comment.to_dict()}




@comment_routes.route('/<feature>/<int:id>/')
def get_comments(feature, id):

    feature=eval(feature).query.get(id)
    return {"comments": [comment.to_dict() for comment in feature.comments]}


@comment_routes.route('/<int:id>/', methods=['DELETE'])
def delete_comment(id):
    comment=Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"Message": "Comment Deleted"}

@comment_routes.route('/<int:id>/', methods=['POST'])
def get_one_comment(id):
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
