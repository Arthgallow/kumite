from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    email = field.data

    if not re.match("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        raise ValidationError('Email is required.')


def valid_password(form, field):
    password = field.data

    if len(password) < 6:
        raise ValidationError('Password must be at least 8 characters.')


def valid_username(form, field):
    username = field.data

    if len(username) < 3:
        raise ValidationError('Username must be at least 3 characters.')

def valid_firstname(form, field):
    first_name = field.data
    if not re.match("^[a-zA-Z]+$", first_name):
        raise ValidationError('First name must be letters only.')
    if len(first_name) < 3:
        raise ValidationError('First name must be at least 3 characters.')

def valid_lastname(form, field):
    last_name = field.data
    if not re.match("^[a-zA-Z]+$", last_name):
        raise ValidationError('First name must be letters only.')
    if len(last_name) < 3:
        raise ValidationError('First name must be at least 3 characters.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, valid_username])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), valid_password])
    first_name = StringField('first_name', validators=[ valid_firstname])
    last_name = StringField('lastname', validators=[ valid_lastname])
    user_image = TextField('userImg')
    user_type_id = IntegerField('user_type')
