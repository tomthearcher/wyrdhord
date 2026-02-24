import os
import glob

base_dir = '/Users/will/Documents/WEB_stuff/WebApps_MENU'
html_files = glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True)

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace Sceo and Wudubora in the random apps arrays
    modified = content.replace("'Sceo'", "'sceo'").replace("'Wudubora'", "'wudubora'")
    
    # Replace Sceo and Wudubora in href paths (main menu index.html)
    modified = modified.replace('href="Sceo/"', 'href="sceo/"')
    modified = modified.replace('href="Wudubora/"', 'href="wudubora/"')
    
    # Replace Sceo and Wudubora in img src paths (main menu index.html)
    modified = modified.replace('src="Sceo/', 'src="sceo/')
    modified = modified.replace('src="Wudubora/', 'src="wudubora/')
    
    if content != modified:
        with open(filepath, 'w') as f:
            f.write(modified)
        print(f"Updated {filepath}")

print("Done")
