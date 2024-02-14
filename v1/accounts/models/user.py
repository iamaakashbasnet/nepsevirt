from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from PIL import Image


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


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='Email',
                              max_length=120, unique=True)
    username = models.CharField(
        verbose_name='Username', max_length=30, unique=True)
    firstname = models.CharField(verbose_name='First name', max_length=30)
    lastname = models.CharField(verbose_name='Last name', max_length=30)
    avatar = models.ImageField(default='default.jpg', upload_to='profile_pics')

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(
        verbose_name='Date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Last login', auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'firstname', 'lastname']

    objects = UserManager()

    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.avatar.path)  # pylint: disable=E1101
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.avatar.path)  # pylint: disable=E1101

    def __str__(self) -> str:
        return f'{self.username}'
