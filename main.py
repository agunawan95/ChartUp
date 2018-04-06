from flask import *
from flask_cors import CORS, cross_origin
import os
import pandas as pd

app = Flask(__name__)
app.config['ROOT'] = os.getcwd()
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/", methods=['GET'])
def main():
    return render_template("chart/chart.html")

@app.route("/load/<filename>", methods=['GET'])
def load_file(filename=None):
    df = pd.read_csv("data/" + filename, delimiter=";")
    table = df.head(50).to_html(classes='table table-hover')
    shape = df.dtypes.apply(lambda x: x.name).to_dict()
    result = {
        'shape': shape,
        'preview': table
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)