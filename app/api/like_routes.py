from flask import Blueprint, request
from app.models import db, likes
from flask_login import current_user, login_required


like_routes = Blueprint('likes', __name__)

@like_routes.route("", methods=["GET"])
# @login_required
def get_likes():
    
    print(likes)
    return "Hello"