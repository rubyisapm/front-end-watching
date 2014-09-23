/**
 * Created by ruby on 2014/9/23.
 */
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

// this will only be invoked if the path ends in /bar
router.use('/bar', function(req, res, next) {
    // ... maybe some additional /bar logging ...
    res.send('bar');
    next();
});

// always invoked
router.use(function(req, res, next) {
    res.send('Hello World');
});

app.use('/foo', router);
/*app.param('id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE');
    next();
})*/

app.get('/user/:id', function (req, res, next) {

    console.log('although this matches'+req.params.id);
    next();
});

app.get('/user/:id', function (req, res) {
    console.log('and this matches too');
    res.end();
});
app.listen(3000);