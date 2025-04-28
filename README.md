# 20 Questions
## Introduction
Our project was made for the MIT Beaver Works CRE[AT]E Challenge 2024-25. Our goal was to work with a co-designer to meet their needs, and to do so, we made this specially-designed 20 questions game. We are a team of four students from Thomas Jefferson High School for Science and Technology (TJHSST).

The co-designer has numerous conditions that impact his ability to play one of his favorite games, 20 questions. These conditions affect his ability to read and remember, which is why we created this adaptation. We leveraged AI technology to create a memory tracker, complete with speech recognition, image generation, and color coding. This allows our co-designer to overcome his conditions and better enjoy conversations with others.

You can check out the project at https://runial.github.io/20-questions/.

## Software tools
Our final application is made with HTML, CSS, and JavaScript and is available as a website. Although we considered using other platforms (like iOS or Android), we realized that there would be issues with portability and cross-platform use. So, we ultimately chose to make a web app so Kiran can use it on any device they prefer.

For our project, we did not use any frameworks or dependencies. As for external APIs, our project had three in total. For image generation, we used Pollinations.ai (https://pollinations.ai/). And for punctuating and capitalizing the speech recognition, we used Google's Gemini API (https://ai.google.dev/) with Pollinations.ai (https://pollinations.ai/) as fallback in case the usage limit is reached.

In terms of version management, we used Git for repository management and GitHub as our repository host.

In terms of IDEs, some of us used Visual Studio Code (https://code.visualstudio.com/), while others used JetBrains WebStorm (https://www.jetbrains.com/webstorm/).

## Deploying our website
Our project is entirely digital and does not have any dependencies or frameworks, so it is simple to run and deploy locally. It is entirely written in HTML, CSS, and JS.

Here are instructions to deploy the website locally:
* Go to our GitHub repository's releases page (https://github.com/runial/20-questions/releases).
* Download the source code and extract into a new folder.
* You have to run the top-level .html file (not the one in the image_generation or speech_to_text folder). Due to JS limitations, you can't run the .html file directly. We recommend deploying the website to localhost through the VS Code Live Server extension, available here: https://github.com/ritwickdey/vscode-live-server.

You can also deploy the website online using GitHub Pages, which is what we used:
* Upload the code to a GitHub repository.
* On your repo page, go to Settings > Pages.
* Set "Source" to "Deploy from a branch".
* Set the branch and folder to the location your HTML file is located in.
  
## Navigating our code
HTML:
* The top-level index.html file contains the HTML code for our website. It also contains references to other CSS and JS files. Any files that aren't referenced in this HTML file is unused code.

JS:
* We used JS modules to organize our code.
* Image generation is handled through the generateImage() function, while speech recognition is handled through the SpeechToText class.
* We also have the callLlm() function, which calls a text-based AI model, and the $ object, which contains useful helper functions.

CSS:
* Our CSS code is split into two files. variables.css defines color variables while main.css handles everything else.
