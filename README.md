<p align="center">
    <img src="https://github.com/iamaakashbasnet/nepse-virt/assets/136826895/e0de5eb8-4eba-4b5f-839d-75d9c490c1a8" alt="NEPSEVirt logo" width="200" />
</p>
<h3 align="center">NEPSE Virt</h3>
<p align="center">Paper trading platform for NEPSE</p>


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

Fetch stock data (Hit GET request to this route):
```
http://localhost:8000/data/get-live-data/
```
or

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


## Techstack
- Frontend
    - **UI** - ReactJS & TailwindCSS
    - **State Management** - Redux/Toolkit
    - **HTTP Client** - Axios
    - **Async State Management** - React Query
    - **Routing** - React Router v6
- Backend
    - **Framework** - Django & Django Rest Framework
    - **Auth Method** - JWT
    - **Data Scraping** - Selenium
    - **Cron Job** - Django Corn Tab
- Database
    - **Production** - PostgreSQL
    - **Development** - Sqlite
- Data Source
    - **Live Data** - Merolagani
    - **Historic Data** - ShareSansaar
<p align="center">
    <img src="https://github.com/iamaakashbasnet/nepsevirt/assets/136826895/4d37ae34-85ab-4c16-bea2-b746a6fbd654" width="100%" />
</p>
