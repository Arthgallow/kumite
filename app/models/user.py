from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .comment import Comment, new_comment


follow_user = db.Table(
    'follows',
    db.Model.metadata,
    db.Column("following", db.Integer, db.ForeignKey('users.id')),
    db.Column("follower", db.Integer, db.ForeignKey('users.id'))
)


class UserType(db.Model):
    __tablename__ = 'user_types'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False, unique=True)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_image = db.Column(db.Text, nullable=True)
    comments = db.relationship('Comment', secondary=new_comment, backref=db.backref('users', lazy='dynamic'))
    user_type_id = db.Column(db.Integer, db.ForeignKey('user_types.id'), nullable=False)
    type = db.relationship('UserType')

    followers = db.relationship(
    "User",
    secondary=follow_user,
    primaryjoin=(follow_user.c.following == id),
    secondaryjoin=(follow_user.c.follower == id),
    backref=db.backref('following', lazy='dynamic'),
    lazy='dynamic'
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'pic': self.user_image,
        }

    def get_followers(self):
        return [user.to_dict() for user in self.followers]

class Bystander(db.Model):
    __tablename__ = 'bystanders'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    user = db.relationship('User')


class Promoter(db.Model):
    __tablename__ = 'promoters'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    user = db.relationship('User')


class Fighter(db.Model):
    __tablename__ = 'fighters'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    fighter_height = db.Column(db.Integer, nullable=False)
    fighter_weight = db.Column(db.Integer, nullable=False)
    fighter_reach = db.Column(db.Integer, nullable=True)
    fighting_style = db.Column(db.String(500), nullable=True)
    fighter_age = db.Column(db.Integer, nullable=True)
    fighter_wins = db.Column(db.Integer, nullable=False)
    fighter_losses = db.Column(db.Integer, nullable=False)
    fighter_titles = db.Column(db.String(500), nullable=False)

    user = db.relationship('User')
