from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()


comments = db.Table(
    "comments",
    db.Column('id', db.Integer, primary_key=True, nullable=False),
    db.Column('comment_text', db.String(255), nullable=False),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id') nullable=False),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id') nullable=False),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    my_posts = db.relationship("Post", back_populates="owner")
    others_posts = db.relationship("Post", secondary=comments, back_populates="commentator")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'username': self.username,
            'profile_pic': self.profile_pic
        }


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(255))
    caption = db.Column(db.String(255))
    user_id = db.Column(db.String, db.ForeignKey("user.id"), nullable=False)

    # Relationships
    owner = db.relationship('User', back_populates='my_posts')
    commentator = db.relationship('User', secondary=comments, back_populates="others_posts")

    def to_dict(self):
        return {
            'id': self.id,
            'img_url': self.img_url,
            'caption': self.caption,
            'user_id': self.user_id
        }