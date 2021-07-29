from .db import db


new_comment = db.Table('new_comments',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('comment_id', db.Integer, db.ForeignKey('comments.id')),
)

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

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'thread': self.thread,
        }
