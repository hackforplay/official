var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
	console.log('Server listening on port %s', app.get('port'));
});
