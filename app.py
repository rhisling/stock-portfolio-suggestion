import datetime
import json
import re
import sqlite3

import requests
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from pytz import timezone

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

"""
ROUTES

"""


@app.route('/', methods=['GET'])
def login_page():
    if 'username' in session:
        AAPLprice_url = f'https://api.iextrading.com/1.0/stock/AAPL/price'
        AAPLprice = requests.get(AAPLprice_url).json()
        ADBEprice_url = f'https://api.iextrading.com/1.0/stock/ADBE/price'
        ADBEprice = requests.get(ADBEprice_url).json()
        FBprice_url = f'https://api.iextrading.com/1.0/stock/FB/price'
        FBprice = requests.get(FBprice_url).json()
        MSFTprice_url = f'https://api.iextrading.com/1.0/stock/MSFT/price'
        MSFTprice = requests.get(MSFTprice_url).json()
        GOOGprice_url = f'https://api.iextrading.com/1.0/stock/GOOG/price'
        GOOGprice = requests.get(GOOGprice_url).json()
        EBAYprice_url = f'https://api.iextrading.com/1.0/stock/EBAY/price'
        EBAYprice = requests.get(EBAYprice_url).json()
        AMZNprice_url = f'https://api.iextrading.com/1.0/stock/AMZN/price'
        AMZNprice = requests.get(AMZNprice_url).json()
        IBMprice_url = f'https://api.iextrading.com/1.0/stock/IBM/price'
        IBMprice = requests.get(IBMprice_url).json()
        TSLAprice_url = f'https://api.iextrading.com/1.0/stock/TSLA/price'
        TSLAprice = requests.get(TSLAprice_url).json()
        TWTRprice_url = f'https://api.iextrading.com/1.0/stock/TWTR/price'
        TWTRprice = requests.get(TWTRprice_url).json()
        PYPLprice_url = f'https://api.iextrading.com/1.0/stock/PYPL/price'
        PYPLprice = requests.get(PYPLprice_url).json()
        print("AAPLPRICE",AAPLprice)
        return render_template('index.html',AAPLPrice=AAPLprice,ADBEPrice=ADBEprice,GOOGPrice=GOOGprice,FBPrice=FBprice,MSFTPrice=MSFTprice,EBAYPrice=EBAYprice,AMZNPrice=AMZNprice,IBMPrice=IBMprice,TSLAPrice=TSLAprice,TWTRPrice=TWTRprice,PYPLPrice=PYPLprice)
    return render_template('page-login.html')

@app.route('/team', methods=['GET'])
def team():
    return render_template('team.html')

@app.route('/userprofile', methods=['GET'])
def userprofile():
    return render_template('userprofile.html',username=session['username'])



@app.route('/google-login', methods=['POST'])
def googleLogin():
    print(request)
    email = request.form['email']
    password = request.form['password']
    session['username'] = email
    print(f'email:{email}, password: {password}')
    return redirect("/", code=200)



@app.route('/login', methods=['POST'])
def login():
    print(request)
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
        AAPLprice_url = f'https://api.iextrading.com/1.0/stock/AAPL/price'
        AAPLprice = requests.get(AAPLprice_url).json()
        ADBEprice_url = f'https://api.iextrading.com/1.0/stock/ADBE/price'
        ADBEprice = requests.get(ADBEprice_url).json()
        FBprice_url = f'https://api.iextrading.com/1.0/stock/FB/price'
        FBprice = requests.get(FBprice_url).json()
        MSFTprice_url = f'https://api.iextrading.com/1.0/stock/MSFT/price'
        MSFTprice = requests.get(MSFTprice_url).json()
        GOOGprice_url = f'https://api.iextrading.com/1.0/stock/GOOG/price'
        GOOGprice = requests.get(GOOGprice_url).json()
        EBAYprice_url = f'https://api.iextrading.com/1.0/stock/EBAY/price'
        EBAYprice = requests.get(EBAYprice_url).json()
        AMZNprice_url = f'https://api.iextrading.com/1.0/stock/AMZN/price'
        AMZNprice = requests.get(AMZNprice_url).json()
        IBMprice_url = f'https://api.iextrading.com/1.0/stock/IBM/price'
        IBMprice = requests.get(IBMprice_url).json()
        TSLAprice_url = f'https://api.iextrading.com/1.0/stock/TSLA/price'
        TSLAprice = requests.get(TSLAprice_url).json()
        TWTRprice_url = f'https://api.iextrading.com/1.0/stock/TWTR/price'
        TWTRprice = requests.get(TWTRprice_url).json()
        PYPLprice_url = f'https://api.iextrading.com/1.0/stock/PYPL/price'
        PYPLprice = requests.get(PYPLprice_url).json()
        print("AAPLPRICE", AAPLprice)
        ##return render_template('index.html')
        return render_template('index.html', AAPLPrice=AAPLprice, ADBEPrice=ADBEprice, GOOGPrice=GOOGprice,
                               FBPrice=FBprice, MSFTPrice=MSFTprice, EBAYPrice=EBAYprice, AMZNPrice=AMZNprice,
                               IBMPrice=IBMprice, TSLAPrice=TSLAprice, TWTRPrice=TWTRprice, PYPLPrice=PYPLprice)
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


@app.route('/trends', methods=['POST'])
def get_trends_for_charts():
    data = request.get_json()
    symbol = data['symbol']
    url = f'https://api.iextrading.com/1.0/stock/{symbol}/chart/dynamic'
    price_url = f'https://api.iextrading.com/1.0/stock/{symbol}/price'
    company_url = f'https://api.iextrading.com/1.0/stock/{symbol}/company'
    response = requests.get(url)
    if not response:
        # return render_template('error.html', msg="Invalid Symbol")
        return "Unknown symbol"

    response = response.json()["data"][~10:]
    charts = [item['open'] for item in response]
    vishal = [item['date'] for item in response]
    price = requests.get(price_url).json()
    company_name = requests.get(company_url).json()['companyName']
    date = get_time()
    change = response[-1]['change']
    change_percent = response[-1]['changePercent']
    print("*****")
    print(company_name)
    print("******")

    res = {
            'price': price,
            'change': round(float(change), 2),
            'change_percent': round(float(change_percent), 2),
            'date': date,
            'name': company_name,
            'charts': charts,
            'symbol':symbol,
            'vishal': vishal
        }
    return jsonify(res)
    # print("requestdata", str(data))
    # symbol = data['symbol']
    # key = data['key']
    # url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={symbol}&apikey={key}'
    # url2 = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={key}'
    # url3 = f'https://api.intrinio.com/prices?identifier={symbol}&api_key=OjkwMmVlODE5Yjc1MTQzZWExZTI0ZWMzNzA0NGE3NjA4'
    # name = get_name(url)
    # charts = get_chart_trends(url3)
    # if name == 'invalid_symbol':
    #     print('Invalid Symbol')
    #     return render_template('error.html', msg="Invalid Symbol")
    # elif name == 'api_error':
    #     print("Check your internet connection or try again later")
    #     return render_template('error.html', msg="Check your internet connection or try again later")
    # elif name:
    #     price, change, change_percent = get_price(url2)
    #     date = get_time()
    #     res = {
    #         'price': price,
    #         'change': round(float(change), 2),
    #         'change_percent': round(float(change_percent), 2),
    #         'date': date,
    #         'name': name,
    #         'charts': charts,
    #         'symbol':symbol
    #     }
    #     return jsonify(res)


"""

PRIVATE METHODS

"""


def get_chart_trends(link):
    response = requests.get(link)
    lt = []
    series = response.json()['data']
    ##print(str(series))
    count = 0
    for item in series:
        if count == 10:
            break
        lt.append(item["adj_open"])
        count += 1

    return lt



def clean_data(json_data):
    result_map = {}
    for key in json_data:
        new_key = re.sub(r'[0-9]*\.\s', '', key)
        result_map[new_key] = json_data[key]
    return result_map


def get_name(link):
    try:
        response = requests.get(link)
        if response.ok and response.content:
            print(type(response.content))
            j_data = json.loads(response.content)
            if not j_data['bestMatches']:
                return "invalid_symbol"
            result_map_unclean = j_data['bestMatches'][0]
            # print(result_map_unclean)
            result_map = clean_data(result_map_unclean)
            # print(result_map)
            if float(result_map['matchScore']) == 1.000:
                return result_map['name']
            return "invalid_symbol"
        return "api_error"
    except requests.exceptions.RequestException:
        print("Check your internet connection or try again later")


def get_price(link):
    response = requests.get(link)
    j_data = json.loads(response.content)
    print("jdata",str(j_data))
    result_map_unclean = j_data['Global Quote']
    result_map = clean_data(result_map_unclean)
    if result_map['price'] and result_map['change'] and result_map['change percent']:
        return result_map['price'], result_map['change'], result_map['change percent'][:-1]


def get_time():
    now = datetime.datetime.now()
    datetime_obj_pacific = timezone('US/Pacific').localize(now)
    temp_date = str(datetime_obj_pacific.strftime("%a %b %d %H:%M:%S %Z %Y"))
    return temp_date


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
