# REST API for COVID Data Tracking

## Description
This Flask application provides a RESTful API that retrieves COVID-19 tracking data. It supports retrieving data for the last 7 days for Arizona and allows users to query data by state and date range via POST requests.

## Features
- **GET Endpoint**: Returns COVID-19 data (positive and negative cases) for Arizona for the last 7 days.
- **POST Endpoint**: Users can request COVID-19 data by specifying a state, start date, and end date.
## Installation
### Prerequisites
- Python 3.8 or higher
- pip
### Setup
To set up this project locally, follow these steps:
To set up this project locally, follow these steps:

1. Clone the repository
```
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
```
2. Create and activate a virtual environment (Windows)
```
python -m venv venv
venv\Scripts\activate
```
or on MacOS/Linux:
```
python3 -m venv venv
source venv/bin/activate
```
3. Install required packages
```
pip install -r requirements.txt
```

## Usage
To run the server, execute:
```flask run```
This will start the local server on http://127.0.0.1:5000/.

## API Endpoints

### GET /api/covid/arizona/last7days
**Description**: Retrieve COVID-19 data for the last 7 days for Arizona.<br/>
**Method**: GET<br/>
**Response**: JSON object listing the dates, positive cases, and negative cases.

### POST /api/covid/data
**Description**: Submit a request to retrieve COVID-19 data by state and specified date range.<br/>
**Method**: POST<br/>
**Body**:
```
{
  "state": "AZ",
  "start_date": "20220101",
  "end_date": "20220107"
}
```
**Response**: JSON object listing the dates, positive cases, and negative cases.

`python -m unittest discover -s tests`
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

