from flask import *
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
app.config['ROOT'] = os.getcwd()
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/", methods=['GET'])
def main():
    return render_template("chart/chart.html")

if __name__ == '__main__':
    app.run(debug=True)