import sqlite3

from flask import Flask, render_template, request, redirect, url_for, session
import datetime
import json
import re

import requests
from pytz import timezone

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/', methods=['GET'])
def login_page():
    if 'username' in session:
        return render_template('index.html')
    return render_template('page-login.html')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    session['username'] = email
    print(f'email:{email}, password: {password}')
    conn = sqlite3.connect('data.db')
    cur = conn.cursor()

    select_query = "SELECT * from users where email = ? and password = ? "
    rows = []
    for row in cur.execute(select_query, (email, password)):
        rows.append(row)
    print(rows)
    if len(rows) == 1:
        conn.commit()
        conn.close()
        return render_template('index.html')
    else:
        conn.commit()
        conn.close()
        return render_template('page-login.html', message='Invalid Credentials')


@app.route('/register', methods=['POST'])
def register_user():
    conn = sqlite3.connect('data.db')
    cur = conn.cursor()
    # check if it is already there
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    select_query = "SELECT * FROM users where email = ?"
    rows = []
    for row in cur.execute(select_query, (email,)):
        rows.append(row)
    if not rows:
        user = (username, password, email)
        insert_user = "INSERT INTO users values (?,?,?) "
        cur.execute(insert_user, user)
        conn.commit()
        conn.close()
        return render_template('page-login.html', message='Account created, Please login')
    else:
        conn.commit()
        conn.close()
        return render_template('page-login.html', message='User account already exists')


@app.route('/register', methods=["GET"])
def register_form():
    return render_template('page-register.html')


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('login_page'))


def create_tables():
    conn = sqlite3.connect('data.db')
    curr = conn.cursor()
    create_table = "CREATE TABLE IF NOT EXISTS users (username text, password text, email text PRIMARY KEY)"
    curr.execute(create_table)
    conn.commit()
    conn.close()


if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
