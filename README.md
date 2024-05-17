<p align="center">
    <img src="https://github.com/iamaakashbasnet/nepse-virt/assets/136826895/e0de5eb8-4eba-4b5f-839d-75d9c490c1a8" alt="NEPSEVirt logo" width="200" />
</p>
<h3 align="center">NEPSE Virt</h3>
<p align="center">Paper trading platform for NEPSE</p>

<hr />

Learning how in general full stack app works. This project seamlessly integrates Django and JavaScript, leveraging the power of Django Rest Framework on the backend and React with TypeScript on the frontend.

## Project Setup

Install required packages

```
$ pip install -r requirements.txt
$ npm i
```

Create .env file
```
SECRET_KEY=django-insecure-v^81vr#=p19zvn+@+h8v3*opqlr_3c5i6ltxwj&d7vt3o&^qf^
DEBUG=TRUE
```

Initialize database:

```
$ python manage.py makemigrations
$ python manage.py migrate
```

Initialize cron job:
```
$ python manage.py crontab add
```

<br />

<details>
    <summary>MVP Demo</summary>
    <br>
    <p align="center">
        <img src="https://github.com/iamaakashbasnet/nepsevirt/assets/136826895/2952d50f-8d0d-4480-8d09-68db05224890" alt="NEPSEVirt demo" width="100%" />
    </p>
</details>
