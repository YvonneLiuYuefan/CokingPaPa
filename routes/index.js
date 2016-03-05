///<reference path='../types/node.d.ts'/>
///<reference path='../types/express.d.ts'/>
var User = (function () {
    function User(theName, theEmail, thePassword) {
        this.name = theName;
        this.email = theEmail;
        this.password = thePassword;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    return User;
})();
var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'Home' });
        });
        /* GET menu page. */
        /* GET DIY spet1 page. */
        router.get('/DIYs1', function (req, res, next) {
            res.render('DIYs1', { title: 'DIY step 1 set up taste preference' });
        });
        /* GET DIYs2 page. */
        router.get('/DIYs2', function (req, res, next) {
            res.render('DIYs2', { title: 'DIY step 2 select everything you like' });
        });
        /* GET DIYs3 page. */
        router.get('/DIYs3', function (req, res, next) {
            res.render('DIYs3', { title: 'DIY step 3 Review and pay' });
        });
        /* GET Hello World page. */
        router.get('/helloworld', function (req, res) {
            res.render('helloworld', { title: 'Hello, World!!' });
        });
        /* GET Userlist page. */
        router.get('/userlist', function (req, res) {
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function (e, docs) {
                res.render('userlist', {
                    "userlist": docs
                });
            });
        });
        /* GET New User page. */
        router.get('/newuser', function (req, res) {
            res.render('newuser', { title: 'Add New User' });
        });
        /* POST to Add User Service */
        router.post('/adduser', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var userName = req.body.username;
            var userEmail = req.body.useremail;
            // Set our collection
            var collection = db.get('usercollection');
            // Submit to the DB
            collection.insert({
                "username": userName,
                "email": userEmail
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });
        module.exports = router;
    }
    return Router;
})();
var router = new Router();
