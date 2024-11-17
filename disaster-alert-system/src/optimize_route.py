import json
from flask import Flask, jsonify
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    base_url="https://api.sambanova.ai/v1", 
    api_key="8202d9b3-560f-4201-84e1-ff0d2cf0861e"
)

@app.route('/optimized_route', methods=['GET'])
def get_optimized_route():

    with open('processed_osm_data.json', 'r') as f:
        processed_data = json.load(f)

    origin = [32.9855, -96.7488]  # UTD Location (Example)
    destination = [32.9916, -96.7456]  # Example Destination (UTD Police Department)

    waypoints = [origin, destination]  # Initialize with origin and destination

    for road in processed_data:
        for coord in road["coordinates"]:
            waypoints.append(coord)

    data_to_send = {
        "waypoints": waypoints,
        "origin": origin,
        "destination": destination,
        "parameters": {
            "avoid_disaster_zone": True,  # Example: Can be customized
            "time_sensitive": True
        }
    }

    # Sending the data to SambaNova API for route optimization
    response = client.chat.completions.create(
        model="Meta-Llama-3.1-405B-Instruct",  # Specify the correct model
        messages=[
            {"role": "system", "content": "Provide the most optimized route based on the waypoints."},
            {"role": "user", "content": json.dumps(data_to_send)}  # Send the prepared data as JSON
        ],
        stream=False  # No streaming, just return the final response
    )

    # Check the response for the optimized route
    optimized_route = []
    if response and 'choices' in response and len(response['choices']) > 0:
        message = response['choices'][0].get('message', {})
        optimized_route_content = message.get('content', '')

        if optimized_route_content:
            try:
                optimized_route = json.loads(optimized_route_content)  # Parse the optimized route
            except json.JSONDecodeError:
                optimized_route = []

    print("Optimized Route:", optimized_route)  # Debugging line to check the result

    return jsonify({"optimized_route": optimized_route})

if __name__ == '__main__':
    app.run(debug=True)
