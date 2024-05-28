from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class UsernameAndEmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user_model = get_user_model()

        if username is None:
            username = kwargs.get(user_model.USERNAME_FIELD)
        if username is None or password is None:
            return
        try:
            if "@" in username:
                user = user_model.objects.get(email=username)
            else:
                user = user_model.objects.get(username=username)

        except user_model.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            # decreases the chances of timing attack to check for valid username
            user_model().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
