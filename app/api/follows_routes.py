from flask import Blueprint, jsonify, request
from app.models import db, User
from app.models.user import follow_user


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<feature>/<int:id>/')
def get_followers(feature, id):
    feature = eval(feature).query.get(id)
    if feature:
        followers =feature.get_followers()
        return jsonify(followers)
    return jsonify({'message': 'User not found'})


@follow_routes.route('/<feature>/<int:feature_id>/', methods=['POST'])
def follow_new_user(feature,feature_id):
    if feature_id == request.json['sessionUser']:
        return jsonify({'message': 'You cannot follow yourself'})
    followed_user = db.session.query(follow_user).all()
    if followed_user.count((feature_id, request.json['sessionUser'])) >= 1:
        return jsonify({'message': 'You already follow this user'})
    newFollow=follow_user.insert().values(following=feature_id, follower=request.json['sessionUser'])
    db.session.execute(newFollow)
    db.session.commit()
    return {'message': 'User followed'}



@follow_routes.route('/following/<int:id>/')
def get_following(id):
    followed = [User.query.get(user[0]).to_dict() for user in    db.session.query(follow_user).filter_by(follower=id).all()]
    return jsonify(followed)



@follow_routes.route('/<feature>/<int:feature_id>/', methods=['DELETE'])
def unfollow(feature,feature_id):
    if feature_id == request.json['sessionUser']:
        return jsonify({'message': 'You cannot follow yourself'})
    followed_user = db.session.query(follow_user).all()
    if followed_user.count((feature_id, request.json['sessionUser'])) > 0:
        print("COOOOL", followed_user)
        db.session.query(follow_user).filter_by(following=feature_id, follower=request.json['sessionUser']).delete()
        db.session.commit()
        return jsonify({'message': 'You unfollowed this user'})
    return {'message': "You don't follow this user"}


