# Itinerary-App-With-Here-Maps
A JavaScript application for creating routes on the map by using data from the HERE-Maps API.

You can also find the application online on heroku: http://itinerarywithheremaps.herokuapp.com/. During the first request the page is going to load slower since the heroku dyno sleeps after a while of inactivity. 

The route is stored only locally and no database for permanent store was used.

The following technologies were used for the creation of the application:
 - IDE: Visual Studio code
 - JavaScript
 - AngularJS
 - HTML5
 - CSS3
 - Bootstrap.css. The design is responsive and the application can also be used from mobile devices
 - Jasmine & Karma for unit-testing. Starting with, one Angular-Service and one Anguler-Controller were tested.
 - Gulp for creating a minified JS file by combining the written JS files. The online application uses the minified JS file.
 - Node.js (v4.2.6), Jade, Express for the backend
 
## How to start the application
 - Navigate to the root folder of the project.
 - From a command prompt install the npm dependencies using the **npm install** command.
 - Start the local node server using the **npm start** command.
 - Navigate to http://localhost:3000
 
## What are the features of the application
The following features were implemented and can be tested:
 - On the top of the application you see the search area. Write something in the input field and click on the **Add it to the list!** button
  - If there is no ambiguity for the place you searched for, the place is going to be automatically added in you itinerary list.
  - If there are more than one places with this name, then a list with all the available results is going to be shown. Click on an option from this list, and this option will be added in your itineray list.
 - On the middle left of the application is the area with the list containing all the waypoints of your itinerary.
  - By clicking on a waypoint, you can then use the three action-buttons and move the waypoint up or down. By using the trash-icon you can remove the waypoint from the itinerary.
   - When the list has no or only one waypoint, the navigation (up & down) buttons are not shown.
  - The other feature that you can see in this area is the transportation mode. You can pick between the following three modes:
   - car
   - public transportation
   - on feet
 - on the middle right part of the application you can see the map that contains your itinerary. The map is refreshed every time you do one of the following actions:
  - Add a new waypoint in the list by using the search form
  - Move a waypoint up or down by using the action-icons on the left
  - Remove a waypoint by using the trash-icon on the left
  The route from the map disappears, when there are fewer than two waypoints in your list.
 - Here are some extra features for the application:
  - The application does not allow the itinerary to have the same waypoint twice. A message is shown in this case.
  - The application will show you the total distance of the itinerary in KM and also the needed time to travel from start to finish.
  - The application will inform you, if there is no public transportation option that can travel you from A to B.

## The structure of the Angular application
Inside the public/javascripts folder you can find the following folders/ files:
 - /app.js: The starting point of the application
 - /controllers/: The controllers of the application. The controllers were created based on the distinguished HTML areas in the UI.
 - /services/: The logic that has to be shared between multiple controllers.
 - /services/REST/: The code responsible for the GET calls to the HERE API.
 - /handlers/: Helper code that can be used from the whole application (for example exception handling).
 
## Few words about the testing files
For testing the application the Jasmine framework was used. As test runner I chose Karma. The ListController and ItineraryService were tested. The rest of code will be also tested.
You can test the application by typing the following command from the root of the project: **npm test**

## Few words about the gulp file
A simle deployment task was created with gulp. You can run the task by running the following command from the root of the project: **gulp**

## Final words
In total I invested a weekend on this project and I really enjoyed doing this application. I hope you have fun using it and that you can identify my coding style with JavaScript and Angular.

Christos Monogios
