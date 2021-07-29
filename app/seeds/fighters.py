from app.models import db, Fighter

def seed_fighters():

    fighter_1 = Fighter(
        user_id=4 , fighter_height= 70, fighter_weight= 202,
        fighter_reach=69, fighting_style="Karate, Kickboxing, Muay Thai, Taekwondo " ,
        fighter_age=35, fighter_wins=18, fighter_losses=1,
        fighter_titles="The Muscles from Brussels "
    )
    fighter_2 = Fighter(
        user_id=5, fighter_height=70, fighter_weight=202,
        fighter_reach=70 , fighting_style="MMA",
        fighter_age=32, fighter_wins=40, fighter_losses=1,
        fighter_titles="The Most Complete Fighter in the World "
    )
    fighter_3 = Fighter(
        user_id=6 ,fighter_height=73, fighter_weight=207,
        fighter_reach =72, fighting_style = " Kyokushin Karate, MMA" ,
        fighter_age=40, fighter_wins=29, fighter_losses=3,
        fighter_titles = "Coach"
    )
    fighter_4 = Fighter(
        user_id= 7 , fighter_height=66, fighter_weight=155,
        fighter_reach=66, fighting_style = "Silat,  Silat Harimau" ,
        fighter_age=38 , fighter_wins=20, fighter_losses=0,
        fighter_titles="The Tiger"
    )

    db.session.add(fighter_1)
    db.session.add(fighter_2)
    db.session.add(fighter_3)
    db.session.add(fighter_4)
    db.session.commit()


def undo_fighters():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
