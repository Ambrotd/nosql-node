# Simple vulnerable login portal

You can change the users and credentials under /config/config.js

## To install

`npm install app`
and
`node app`

A mongo db instance running on port 27017 is needed to work
`sudo docker run -it  -p 27017:27017 --name mongodb -d mongo`

## Run it using docker
1. Start the mongo service:`sudo docker run -it  -p 27017:27017 --name mongodb -d mongo`
2. Run the nosql-node image `sudo docker run -it  -p 4000:4000 --name nosql -d ambrotd/nosql-node`

Navigate to localhost:4000 and have fun

## Script to automate the extraction

You can test mongoExtract.py to extract the data on the app
