var connect = require('connect')
var app = connect()

const port = process.env.PORT || 3000

app.use(require('morgan')('dev'))
app.use(require('compression')())
app.use(require('cors')())

app.use(require('serve-static')(__dirname + '/public'))

app.listen(port, function() {
	console.log('Server listening on port %s', port)
})
