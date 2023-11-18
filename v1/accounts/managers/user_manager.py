from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, username, firstname, lastname, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address.')
        if not username:
            raise ValueError('User must have an username.')
        if not firstname and lastname:
            raise ValueError('User must have a first name and a last name.')
        if not password:
            raise ValueError('User must have a password.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          firstname=firstname, lastname=lastname, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, firstname, lastname, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address.')
        if not username:
            raise ValueError('User must have an username.')
        if not firstname and lastname:
            raise ValueError('User must have a first name and a last name.')
        if not password:
            raise ValueError('User must have a password.')

        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          firstname=firstname, lastname=lastname, **extra_fields)
        user.set_password(password)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user.save()
        return user
