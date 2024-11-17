import requests
import json

# Function to get node coordinates by ID
def get_node_coordinates(node_id):
    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    node({node_id});
    out body;
    """
    
    response = requests.get(overpass_url, params={'data': query})
    data = response.json()
    
    if 'elements' in data and len(data['elements']) > 0:
        node = data['elements'][0]
        return node['lat'], node['lon']
    else:
        return None

# Function to process OSM data
def process_osm_data(osm_data):
    processed_data = []
    
    for element in osm_data['elements']:
        if 'nodes' in element:
            # Retrieve coordinates for each node ID
            coordinates = []
            for node_id in element['nodes']:
                coords = get_node_coordinates(node_id)
                if coords:
                    coordinates.append(coords)
            processed_data.append({
                'id': element['id'],
                'type': element.get('type'),
                'coordinates': coordinates
            })
    
    return processed_data

# Load OSM data
osm_file_name = 'osm_data.json'

with open(osm_file_name, 'r') as f:
    osm_data = json.load(f)

# Process OSM data
processed_data = process_osm_data(osm_data)

# Save the processed data to a new JSON file
processed_file_name = 'processed_osm_data.json'
with open(processed_file_name, 'w') as f:
    json.dump(processed_data, f, indent=2)

print(f"Processed data successfully saved to {processed_file_name}")
