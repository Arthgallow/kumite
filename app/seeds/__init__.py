from flask.cli import AppGroup
from .user_types import seed_user_types, undo_user_types
from .users import seed_users, undo_users
from .fighters import seed_fighters, undo_fighters
from .follows import seed_follows, undo_follows
from .comments import seed_comments, undo_comments, seed_comment_on_user, undo_comment_on_user, seed_comment_thread, undo_comment_thread

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_user_types()
    seed_users()
    seed_fighters()
    seed_follows()
    seed_comments()
    seed_comment_on_user()
    seed_comment_thread()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_user_types()
    undo_users()
    undo_fighters()
    undo_follows()
    undo_comments()
    undo_comment_on_user()
    undo_comment_thread()
    # Add other undo functions here
