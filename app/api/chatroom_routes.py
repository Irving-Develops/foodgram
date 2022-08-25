from flask import Blueprint, jsonify, session, request
from app.models import Chatroom, db
# from app.forms import
from flask_login import current_user, login_user, logout_user, login_required

chatroom_routes = Blueprint('chatrooms', __name__)


@chatroom_routes.route("", methods=['GET'])
@login_required
def get_chatrooms():
    chatrooms = Chatroom.query.all()
    print(current_user, "\n chatrooms \n \n ")
    return {'chatrooms': [chatroom.to_dict() for chatroom in chatrooms]}