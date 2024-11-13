from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

x = datetime.datetime.now()

# Declare the APP server instance
app = Flask(__name__)
# Enable CORS policies
CORS(app)

# GET Endpoint =============================================================================
@app.route("/", methods=["GET"])
def index():
  return jsonify({"msg": "Hello Python REST API"}),200

@app.route('/data')
def get_time():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
# POST Endpoint =============================================================================
@app.route('/post_endpoint', methods=['POST'])
def create_data():
    # Get the data from the POST endpoint
    data = request.get_json()
    if not data:
        return (jsonify({'error': 'No data provided'}), 400)
    return (jsonify({'response': 'ok all good'}), 201)

if __name__ == "__main__":
  app.run(debug=True, port=5000)