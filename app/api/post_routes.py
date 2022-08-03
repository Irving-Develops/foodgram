from flask import Blueprint, request
from app.models import db, Post
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint("posts", __name__)

@post_routes.route("", methods=['GET'])
@login_required
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route("", methods=["POST"])
@login_required
def upload_post():
    if "post" not in request.files:
        return {"errors": "post required"}, 400

    post = request.files["post"]

    if not allowed_file(post.filename):
        return {"errors": "file type not permitted"}, 400
    
    post.filename = get_unique_filename(post.filename)

    upload = upload_file_to_s3(post)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_post = Post(user=current_user, url=url)
    db.session.add(new_post)
    db.session.commit()
    return {"url": url}
    print(test)