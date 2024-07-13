import os
import json

# Define the source directory containing subfolders with images
source_dir = 'Myntra\stylematch\dataset_category'

# Define the target directory where the JSON files will be saved
target_dir = 'Myntra\stylematch\info_dress'

# Ensure the target directory exists
#os.makedirs(target_dir, exist_ok=True)

# Function to generate a short description and cost
def generate_description_and_cost(index):
    descriptions = [
        'Elegant and stylish',
        'Casual summer dress',
        'Chic evening wear',
        'Perfect for parties',
        'Comfortable and cool',
        'Modern and trendy',
        'Stylish and sleek',
        'Classic design',
        'Elegant evening dress',
        'Comfort fit',
        'Bright and colorful',
        'Formal wear'
    ]
    cost = (index + 1) * 10.99
    return descriptions[index % len(descriptions)], f'${cost:.2f}'

# Iterate over each subfolder in the source directory
for subdir, _, files in os.walk(source_dir):
    if subdir == source_dir:
        continue  # Skip the root directory itself

    # Filter out image files (you can adjust the extensions as needed)
    image_files = [f for f in files]

    # Prepare the list of dictionaries
    dresses = []
    for index, image_file in enumerate(image_files):
        name = os.path.splitext(image_file)[0]
        description, cost = generate_description_and_cost(index)
        dress = {
            'name': name,
            'description': description,
            'price': cost
        }
        dresses.append(dress)

    # Create the target file path
    subfolder_name = os.path.basename(subdir)
    target_file_path = os.path.join(target_dir, f'{subfolder_name}.json')

    # Save the list of dictionaries to a JSON file
    with open(target_file_path, 'w') as json_file:
        json.dump(dresses, json_file, indent=4)

    print(f'Processed {len(image_files)} images in {subfolder_name}, saved to {target_file_path}')
