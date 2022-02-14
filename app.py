from flask import Flask, render_template
from utils.get_data import getTweetData
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("home.html")

@app.route('/basic')
def display_basic():
    return render_template("basic.html", tweetData=getTweetData())

@app.route('/creative')
def display_data_d3():
    return render_template("creative.html")

@app.route('/advanced')
def display_creative():
    return render_template("advanced.html")

@app.route('/questions')
def display_questions():
    return render_template("questions.html")
