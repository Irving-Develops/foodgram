from flask import Blueprint, jsonify, session, request
from app.models import Comment, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("", methods=['GET'])
@login_required
def get_comments():
    comments = Comments.query.all()
    return {'comments': [[comment.to_dict() for comment in comments]]}

@comment_routes.route("", methods=['POST'])
@login_required
def add_comment():

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit()
        comment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            post_id=form.data['post_id']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400


@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required