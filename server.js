const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use("/",express.static(__dirname + '/dist/to-do-app-frontend'));
console.log(__dirname + '/dist');
const port =process.env.PORT || 8080;
// Start the app by listening on the default
// Heroku port
app.listen(port,()=>{console.log("connected to http://localhost:"+port);});


