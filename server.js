const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt-as-promised');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/scrum');

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    })

    socket.on('message', (message) => {
        console.log('Message received: ' + message);
        io.sockets.emit('message', {type: 'new-message', text: message});
    })
})

http.listen(5000, () => {
    console.log('started on port 5000');
})

app.use(express.static(path.join(__dirname, 'scrum/dist')));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

var ItemSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required'],
        minlength: [5, 'Title must be at least 5 characters']
    },
    description: {
        type: String
    },
    value: { // priority value
        type: Number,
        required: [true, 'Value is required']
    },
    updater: { // users who have changed the status of the item
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    danger: {type: Boolean, default: false},
    bugs: {type: Array, default: []},
    status: {type: String, default: 'Listed'},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: {
        type: String, 
        unique: true, 
        required: [true, 'Email is required'], 
        validate: {
            validator: function(value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: 'Email must be in valid format'
        },
    },
    password: { 
        type: String,
        required: [true, 'Password is required'],
        unique: false,            
        minlength: 8,
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/.test(value);
            },
            message: 'Password must contain at least 1 number, uppercase and special character'
        },                
    },
    status: {
        type: String,
        default: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    online: {
        type: String,
        default: false
    }
})

mongoose.model('Item', ItemSchema);
mongoose.model('User', UserSchema);
var Item = mongoose.model('Item');
var User = mongoose.model('User');

//--------------------------Items-------------------------

// get all items
app.get('/items', function(req, res) {
    Item.find({}).populate('owner').exec(function(err, items) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(items);
        }
    })
})

// get users items
app.get('/items/users', function(req, res) {
    User.findOne({_id: req.session.user_id}, function(err, user){
        if(user.status == 'Admin') {    
            Item.find({}, function(err, items) {
                console.log(items);
                if(err) {
                    res.json(err);
                }
                else {
                    res.json({items});
                }
            })
        }
        else {
            Item.find({owner: user}, function(err, items) {
                if(err) {
                    res.json(err);
                }
                else {
                    res.json({items, user});
                }
            })
        }
    });
})

// get a specific item
app.get('/items/:id', function(req, res) {
    Item.findOne({_id: req.params.id})
        .populate('owner')
        .populate('updater').exec(function(err, item) {
            if(err) {
                res.json(err);
            }
            else {
                res.json(item);
            }
    })
})

// create a new item
app.post('/items', function(req, res) {
    item = new Item(req.body);
    item._id = new mongoose.Types.ObjectId();

    item.save(function(err) {
        if(err) {
            let errors = [];
            if(err.code !== 11000) {
                for(let key in err.errors) {
                    errors.push(err.errors[key].message);
                }
            }
            if(err.code === 11000) {
                errors.push('An item with that name already exists');
            }

            res.json({errors});
        }
        else {
            res.json(item);
        }
    })
})

// assign an item to a user
app.put('/users/:id', function(req, res) {
    User.update({_id: req.params.id}, { $push: { items: req.body.item } }, function(err, user) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(user);
        }
    })
    Item.findOne({_id: req.body.item}, function(err, item) {
        item.owner = req.params.id;
        item.save(function(err, updatedItem) {});
    })
})

// edit a specific item
app.put('/items/:id', function(req, res) {
    Item.update({_id: req.params.id}, req.body, function(err, item) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(item);
        }
    })
})

// add a bug to a specific item
app.put('/items/bug/:id', function(req, res) {
    Item.update({_id: req.params.id}, {$push: {bugs: req.body.bug}}, function(err, item) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(item);
        }
    })
})

// delete a specific item
app.delete('/items/:id', function(req, res) {
    Item.remove({_id: req.params.id}, function() {
        res.json('Deleted');
    })
})

// delete all items
app.delete('/items/', function(req, res) {
    Item.remove({}, function() {
        res.json('Deleted');
    })
})

//-------------------------Users----------------------

// hash password on registration
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(this.password, 10).then(function(hash) {
        user.password = hash;
        next();
    });
});

app.post('/users/create', function(req, res) {
    user = new User(req.body);
    user._id = new mongoose.Types.ObjectId();

    user.save(function(err) {
        if(err) {
            let errors = [];
            if(err.code !== 11000) {
                for(let key in err.errors) {
                    errors.push(err.errors[key].message);
                }
            }
            if(err.code === 11000) {
                errors.push('This email is already registered');
            }

            res.json({errors});
        }
        else {
            res.json({message: 'User Created'});
        }
    })
})

// user registration
app.post('/users/reg', function(req, res) {
    user = new User(req.body);
    user._id = new mongoose.Types.ObjectId();

    user.save(function(err) {
        if(err) {
            let errors = [];
            if(err.code !== 11000) {
                for(let key in err.errors) {
                    errors.push(err.errors[key].message);
                }
            }
            if(err.code === 11000) {
                errors.push('This email is already registered');
            }

            res.json({errors});
        }
        else {
            if(!req.session.user_id) {
                req.session.user_id = user._id;
                res.session.user_name = user.name;
                res.json(user);
            }
            else {
                res.json({message: 'User Created'});
            }
        }
    })
})

// user login
app.post('/users/login', function(req, res) {
    User.findOneAndUpdate({email: req.body.email}, {$set: {online: "true"}}, function(err, user) {
        if(!user) {
            res.json({errors: 'Email is not registered'});
        }
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(() => {
                req.session.user_id = user._id;
                req.session.user_name = user.name;
                res.json(user);
            })
            .catch(bcrypt.MISMATCH_ERROR, () => {
                res.json({errors: ['Incorrect password']});
            })
        }        
    })      
})

// get all users
app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(users);
        }
    })
})

// get user info
app.get('/user/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(user);
        }
    })
})

// get user id
app.get('/users/getid', function(req, res) {
    res.json({id: req.session.user_id});
})

// change user status
app.put('/users/status/:id', function(req, res) {
    User.update({_id: req.params.id}, req.body, function(err, user) {
        if(err) {
            res.json(err);
        }
        else {
            res.json(user);
        }
    })
})

// delete user
app.delete('/users/:id', function(req, res) {
    User.remove({_id: req.params.id}, function() {
        res.json('Deleted')
    })
})

// delete all users
app.delete('/users', function(req, res) {
    User.remove({}, function() {
        res.json('Deleted all users');
    })
})

// user logout
app.get('/users/logout', function(req, res) {
    User.findOneAndUpdate({_id: req.session.user_id}, {$set : {online: "false"}}, function(err, user){});
    req.session.destroy;
    if(!req.session.user_id) {
        res.json('Logged out');
    }
    else {
        res.json('Still logged in');
    }
})

app.listen(8000, function() {
    console.log('listening on port 8000');
})
