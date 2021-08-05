from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User( first_name='Demo', last_name='User',
        username='Demo', email='demo@aa.io', password='password',
        user_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92d0y28IYriJb-iPor5FC5-QJbiKOnjH50A&usqp=CAU",
        user_type_id=1)
    marnie = User(first_name='Marnie', last_name='User',
        username='marnie', email='marnie@aa.io', password='password',
        user_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92d0y28IYriJb-iPor5FC5-QJbiKOnjH50A&usqp=CAU",
        user_type_id=1)
    bobbie = User(first_name='Bobbie', last_name='User',
        username='bobbie', email='bobbie@aa.io', password='password',
        user_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92d0y28IYriJb-iPor5FC5-QJbiKOnjH50A&usqp=CAU",
        user_type_id=1)
    Jean = User( first_name='Jean-Claude', last_name='Van Damme',
        username= 'JCVD', email = "jean-claude@aa.io", password = "password",
        user_image="https://fightstate.com/wp-content/uploads/2015/07/jeanclaudevandamme-large_new.jpg",
        user_type_id=2)
    Yuri = User( first_name='Yuri', last_name='Boyka',
        username= 'Boyka', email = "yuri@aa.io", password = "password",
        user_image="data:image/jpeg;base64,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",
        user_type_id=2)
    Case = User( first_name='Case', last_name='Walker',
        username= 'Case', email = "case@aa.io", password = "password",
        user_image="https://theactionelite.com/wp-content/uploads/2017/12/michael-jai-white-compressed-750x400.png",
        user_type_id=2)
    Jaka = User( first_name='Jaka', last_name='',
        username= 'Jaka', email = "Jaka@aa.io", password = "password",
        user_image="https://static.tokopedia.net/blog/wp-content/uploads/2019/03/1.-Iko-Uwais-Jaka.jpg",
        user_type_id=2)
    Vega = User( first_name='Hugo', last_name='Vega',
        username= 'H.Vega', email = "Hugo@aa.io", password = "password",
        user_image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Esai_Morales.JPG/352px-Esai_Morales.JPG",
        user_type_id=3)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Jean)
    db.session.add(Yuri)
    db.session.add(bobbie)
    db.session.add(Case)
    db.session.add(Jaka)
    db.session.add(Vega)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
