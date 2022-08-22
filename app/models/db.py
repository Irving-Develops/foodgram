from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


db = SQLAlchemy()

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"), primary_key=True),
)

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), default='https://scontent-gru1-2.cdninstagram.com/v/t51.288…0JqLVTh1NgMlWSW-syOCHA&oe=6300438F&_nc_sid=cff2a4')
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    my_posts = db.relationship("Post", back_populates="owner")
    comments = db.relationship("Comment", back_populates="users")
    liker = db.relationship("Post", secondary=likes, back_populates="likes")

    followed = db.relationship(
    'User', secondary=followers,
    primaryjoin=(followers.c.follower_id == id),
    secondaryjoin=(followers.c.followed_id == id),
    backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')


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
            'profile_pic': self.profile_pic,
            'likes': [post.id for post in self.liker]
        }
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(255))
    caption = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    # Relationships
    owner = db.relationship('User', back_populates='my_posts', lazy='subquery')
    comments = db.relationship('Comment', back_populates='posts', cascade="all, delete")
    likes = db.relationship("User", secondary=likes, back_populates="liker")

    def to_dict(self):
        return {
            'id': self.id,
            'img_url': self.img_url,
            'caption': self.caption,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'owner': self.owner.to_dict(),
            'likes': [user.id for user in self.likes]
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    # Relationships
    users = db.relationship("User", back_populates='comments')
    posts = db.relationship("Post", back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment_text': self.comment_text,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'created_at': self.created_at,
            'owner': self.users.to_dict()
        }
