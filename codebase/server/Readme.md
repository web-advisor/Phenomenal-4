# Steps to run the Server : 

- Clone the entire Project:
    git clone https://github.com/{github-username}/HealthTechies.git

- In the terminal, change directory to server
    cd codebase/server

- delete package-lock.json in the server directory

- In the terminal, run this command to install all the dependencies for the project(npm, node should be installed)
    npm install --legacy-peer-deps

- Run the server
    node app.js 
- Use nodemon so that you don't have to run the server again and again. nodemon should be installed globally else install nodemon in the server itself
    nodemon app.js
