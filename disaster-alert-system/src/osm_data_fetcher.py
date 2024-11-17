import requests
import json

# Define the Overpass API endpoint
overpass_url = "http://overpass-api.de/api/interpreter"

# Define the query for roads and intersections near UTD (University of Texas at Dallas)
overpass_query = """
[out:json];
(
  way(around:200,32.9855,-96.7488)[highway];  // Roads within 200 meters of UTD
  node(around:200,32.9855,-96.7488)[highway];  // Intersections (nodes) within 200 meters
);
out body;
"""

# Send the request to the Overpass API
response = requests.get(overpass_url, params={'data': overpass_query})

# Parse the JSON response
osm_data = response.json()

# Define the file name
osm_file_name = 'osm_data.json'

# Automatically create the file if it doesn't exist
with open(osm_file_name, 'w') as f:
    json.dump(osm_data, f, indent=2)

print(f"Data successfully fetched and saved to {osm_file_name}")
