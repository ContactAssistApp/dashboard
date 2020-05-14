# web-dashboard
A minimal web dasboard powered by min.io and node.js web framework

## Description
Volunteers from Microsoft and University of Washington have built a web-based dashboard where anyone can access narrowcast COVID-19 report messages sent by healthcare authorities.

## Getting started
  > git clone https://github.com/covidsafe/web-dashboard.git
    
  > cd web-dashboard/
  
  > npm install
  
  > npm start

## API Enpoints

  > GET /size  
  
    i.e. http://localhost:3000/api/size?lat=42.7569&lon=-73.9828&precision=4&lastTimestamp=1589489812000&api-version=2020-05-05
  
  > GET /list  
  
    i.e. http://localhost:3000/api/list?lat=42.7569&lon=-73.9828&precision=4&lastTimestamp=1589489812000&api-version=2020-05-05
  
  > GET /message 
  
    i.e. http://localhost:3000/api/message?api-version=2020-05-05 

  > GET /report 
  
    i.e. http://localhost:3000/api/report?api-version=2020-05-05


## Deployment

[aka.ms/covidsafe](https://aka.ms/covidsafe)
