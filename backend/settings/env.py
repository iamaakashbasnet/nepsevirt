# ENVIRONMENT = 'prod'
ENVIRONMENT = 'dev'

SETTINGS_MODULE = 'backend.settings.dev'

if ENVIRONMENT == 'dev':
    SETTINGS_MODULE = 'backend.settings.dev'
if ENVIRONMENT == 'prod':
    SETTINGS_MODULE = 'backend.settings.prod'
