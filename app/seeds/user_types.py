from app.models import db, User, UserType

def seed_user_types():
    Bystander = UserType(type='Bystander')
    Fighter = UserType(type='Fighter')
    Promoter = UserType(type='Promoter')

    db.session.add(Bystander)
    db.session.add(Fighter)
    db.session.add(Promoter)
    db.session.commit()


def undo_user_types():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
