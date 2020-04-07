const path = require('path');
//require mysql in mode modules to use it
const mysql = require('mysql');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// must pass in app because it contains the Express application
module.exports = function(app, connection) {
    // if no mathching route is found default to index.html
    app.get('/users', function(req, res) {
        
        //res.send('Hello from simple-react project');
        connection.query('SELECT * FROM `simple-react-sql`.user;', function(err, data){
            (err)?res.send(err):res.json({ users: data});
        });
    });
    app.get('/', function(req, res) {
        
        //res.send('Hello from simple-react project');
        connection.query('SELECT * FROM `simple-react-sql`.user;', function(err, data){
            (err)?res.send(err):res.json({ users: data});
        });
    });
};