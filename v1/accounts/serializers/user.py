from django.contrib.auth import get_user_model
from rest_framework import serializers


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'username', 'email', 'avatar',)


class CreateUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = get_user_model().objects.create(
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'username', 'email', 'password',)
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'avatar', 'username',)
