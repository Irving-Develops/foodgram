from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class PostForm(FlaskForm):

    caption = form.data

    def caption_length:
        if len(caption) > 255:
            raise ValidationError('Caption cannot be longer than 255 characters')

    img_url = StringField('image url', validators=[DataRequired()])
    caption = StringField('caption', validators=[caption_length])