from django.contrib.auth import get_user_model
from rest_framework import serializers


class RequestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'username',
                  'email', 'avatar', 'is_verified',)


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


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data.get('new_password') != data.get('confirm_password'):
            raise serializers.ValidationError("New passwords do not match.")
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'avatar', 'username',)
