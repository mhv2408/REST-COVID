from flask import Flask, request, jsonify, render_template
import requests
from datetime import datetime, timedelta

app = Flask(__name__)

API_URL = "https://api.covidtracking.com/v1/states/{state}/daily.json"

@app.route('/api/covid', methods=['GET'])
def get_last_7_days_data():
    state = 'az'  # Arizona
    response = requests.get(API_URL.format(state=state))
    data = response.json()

    # Get the last 7 days
    last_7_days = data[:7]
    result = [{
        'date': entry['date'],
        'positive': entry['positive'],
        'negative': entry['negative']
    } for entry in last_7_days]

    return jsonify(result)

@app.route('/api/covid', methods=['POST'])
def get_data_by_state_and_date():
    req_data = request.get_json()
    state = req_data['state']
    start_date = req_data['start_date']
    end_date = req_data['end_date']

    response = requests.get(API_URL.format(state=state.lower()))
    data = response.json()

    # Filter data by date range
    start_datetime = datetime.strptime(start_date, "%Y%m%d")
    end_datetime = datetime.strptime(end_date, "%Y%m%d")

    filtered_data = [entry for entry in data if start_datetime <= datetime.strptime(str(entry['date']), "%Y%m%d") <= end_datetime]

    result = [{
        'date': entry['date'],
        'positive': entry['positive'],
        'negative': entry['negative']
    } for entry in filtered_data]

    return jsonify(result)

@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
