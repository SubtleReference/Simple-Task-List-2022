var express = require('express');
var app = express();

// Store all environment variables
app.set('port', process.env.PORT || 3001);
app.set('env', process.env.NODE_ENV || 'production');

// App middleware
// serve index.html at this path
app.use(express.static(__dirname + '/client')); 

app.listen(app.get('port'), function(){
  console.log('Please go to localhost:' + app.get('port') + ' in your web browser.');
});

