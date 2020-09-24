// Express router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', function (req, res) {
    const { f_name, l_name, username, email, password } = req.body;

    // Validation
    if(!f_name || !l_name || !username || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                f_name,
                l_name,
                username,
                email,
                password
            });

            // Create salt & hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            f_name: user.f_name,
                                            l_name: user.l_name,
                                            username: user.username,
                                            email: user.email,
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
});

module.exports = router;
