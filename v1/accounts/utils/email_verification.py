from django.conf import settings
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage

from v1.accounts.utils.token import account_activation_token


def send_account_verification_email(request, user, email=None):
    mail_subject = 'Activation link has been sent to your email address.'
    message = render_to_string(f'{settings.BASE_DIR}/v1/accounts/templates/activate_account_email.html', {
        'user': user,
        'domain': request.META.get('HTTP_ORIGIN'),
        'uid': urlsafe_base64_encode(force_bytes(user.id)),
        'token': account_activation_token.make_token(user)
    })
    to_email = user.email
    email = EmailMessage(mail_subject, message, to=[to_email])
    email.send()
