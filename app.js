const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");

app.use(logger("dev"));

app.use(express.static(__dirname+'/public'))

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/dashboard.html" );
} );

// define a route for the stuff inventory page
app.get( "/stuff", ( req, res ) => {
    res.sendFile( __dirname + "/views/games.html" );
} );

// define a route for the item detail page
app.get( "/stuff/item", ( req, res ) => {
    res.sendFile( __dirname + "/views/stat.html" );
} );

// define a route for the item detail page
app.get( "/stuff/item", ( req, res ) => {
    res.sendFile( __dirname + "/views/history.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );