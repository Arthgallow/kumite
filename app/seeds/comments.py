from app.models import db, Comment
from app.models.comment import comment_thread, new_comment

def seed_comments():

    comment_1 = Comment ( user_id=1, description=' YOU SUCK CASE!!!')
    comment_2 = Comment ( user_id=2, description=' I love you CASE!!!')
    comment_3 = Comment ( user_id=3, description=' Boyka is going to destroy you!!!')
    comment_4 = Comment ( user_id=1, description=' JCVD over Jaka')
    comment_5 = Comment ( user_id=3, description=' Jaka all day!!!')
    comment_6 = Comment ( user_id=6, description=' F*** you Demo User.')
    comment_7 = Comment ( user_id=5, description=' F*** you Demo User.')
    comment_8 = Comment ( user_id=5, description=' Thanks for the suport Bobbie.')

    comment_9 = Comment ( user_id=7, description=' Why do you say Case sucks?')
    comment_10 = Comment ( user_id=1, description=' Boyka is the worlds most complete fighter')
    comment_11 = Comment ( user_id=4, description=' I Love Case Too')
    comment_12 = Comment ( user_id=4, description=" You don't say")

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_comment_on_user():
    comment_1 = new_comment.insert().values(user_id=6, comment_id=1)
    comment_2 = new_comment.insert().values(user_id=6, comment_id=2)
    comment_3 = new_comment.insert().values(user_id=6, comment_id=3)
    comment_4 = new_comment.insert().values(user_id=4, comment_id=4)
    comment_5 = new_comment.insert().values(user_id=7, comment_id=5)
    comment_6 = new_comment.insert().values(user_id=1, comment_id=6)
    comment_7 = new_comment.insert().values(user_id=1, comment_id=7)
    comment_8 = new_comment.insert().values(user_id=3, comment_id=8)

    db.session.execute(comment_1)
    db.session.execute(comment_2)
    db.session.execute(comment_3)
    db.session.execute(comment_4)
    db.session.execute(comment_5)
    db.session.execute(comment_6)
    db.session.execute(comment_7)
    db.session.execute(comment_8)
    db.session.commit()

def undo_comment_on_user():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_comment_thread():
    comment_1=comment_thread.insert().values(post=1, reply=9)
    comment_2=comment_thread.insert().values(post=9, reply=10)
    comment_3=comment_thread.insert().values(post=2, reply=11)
    comment_4=comment_thread.insert().values(post=1, reply=12)

    db.session.execute(comment_1)
    db.session.execute(comment_2)
    db.session.execute(comment_3)
    db.session.execute(comment_4)
    db.session.commit()

def undo_comment_thread():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
