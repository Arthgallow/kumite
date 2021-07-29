from app.models import db, follow_user

def seed_follows():
    follow_1=follow_user.insert().values(following=4, follower=1)
    follow_2=follow_user.insert().values(following=5, follower=1)
    follow_3=follow_user.insert().values(following=6, follower=1)
    follow_4=follow_user.insert().values(following=5, follower=2)
    follow_5=follow_user.insert().values(following=7, follower=3)
    follow_6=follow_user.insert().values(following=4, follower=3)
    follow_7=follow_user.insert().values(following=7, follower=2)
    follow_8=follow_user.insert().values(following=8, follower=2)
    follow_9=follow_user.insert().values(following=1, follower=2)
    follow_10=follow_user.insert().values(following=2, follower=3)

    db.session.execute(follow_1)
    db.session.execute(follow_2)
    db.session.execute(follow_3)
    db.session.execute(follow_4)
    db.session.execute(follow_5)
    db.session.execute(follow_6)
    db.session.execute(follow_7)
    db.session.execute(follow_8)
    db.session.execute(follow_9)
    db.session.execute(follow_10)
    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
