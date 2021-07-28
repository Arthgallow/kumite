from .db import db


comment_thread = db.Table(
    'comment_thread',
    db.Model.metadata,
    db.Column('post', db.Integer, db.ForeignKey('comments.id')),
    db.Column('reply', db.Integer, db.ForeignKey('comments.id'))
)

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    description = db.Column(db.String(500))

    thread = db.relationship(
        'Comment',
        secondary=comment_thread,
        primaryjoin=(comment_thread.c.post == id),
        secondaryjoin=(comment_thread.c.reply == id),
        backref=db.backref('replies', lazy='dynamic'),
    )
