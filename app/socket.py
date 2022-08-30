from flask_socketio import SocketIO, emit
from app.models import Message, db
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print(data, "\n \n in socket \n \n")
    emit("chat", data, broadcast=True)
    # message = Message(
    #     message=data.message,
    #     chatroom_id=data.chatroom_id,
    #     owner_id=data.owner_id
    # )
    # print(message, "\n \n message in socket \n \n")
    # db.session.add(message)
    # db.session.commit()



# @socketio.on("delete")
# def delete_message(message):
#     emit("delete", message, broadcast=True)
