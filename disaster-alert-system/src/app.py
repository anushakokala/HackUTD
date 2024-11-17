from flask import Flask, jsonify, request
import json
from optimize_route import optimized_route 

app = Flask(__name__)

@app.route('/get_optimized_route', methods=['GET'])
def get_optimized_route():

    return jsonify(optimized_route)

if __name__ == '__main__':
    app.run(debug=True)
