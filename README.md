# Simple vulnerable login portal

You can change the users and credentials under /config/config.js

## To install

`npm install app`
and
`node app`

A mongo db instance running on port 27017 is needed to work
`sudo docker run -it  -p 27017:27017 --name mongodb -d mongo`

## Script to automate the extraction

You can test mongoExtract.py to extract the data on the app
