from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("", methods=['GET'])
@login_required
def get_comments():
    comments = Comments.query.all()
    return {'comments': [[comment.to_dict() for comment in comments]]}

@comment_routes.route("", methods=['POST'])
@login_required
def add_comment():
    