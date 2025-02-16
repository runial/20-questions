import requests

def generate_image(prompt):

    realurl = f"https://pollinations.ai/p/{prompt.replace(' ', '%20')}"
    
    
    response = requests.get(realurl)
    
   
    if response.status_code == 200:
        # Save the image content to a file
        with open('generated_image.jpg', 'wb') as file:
            file.write(response.content)
        print('Image generated and saved as generated_image.jpg')
    else:
        print('Failed to generate image')


generate_image(input("Enter a prompt: "))
