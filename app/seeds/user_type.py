from capstone.kumite_app.app.models.user import Bystander, Promoter
from app.models import db, User

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
