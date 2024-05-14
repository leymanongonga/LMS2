//import packages/dependencies
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs')
const bodyparser =require('body-parser');
const mysql = require('mysql');
const { check, validationResdult } = require('express-validation');

const app = express();

app.use( session({
   secret: 'gafl2j-95lkjoip-4=095mn',
   rerve: false,
   saveUninitialized: true 
}));

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms_app'
});

connection.connect();

app.use(express.static(__dirname));

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyparser.urlencoded({ extended: true}));

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', [
    //validation
    check('email').isEmail(),
    check('username').isAlphanumeric().withMessage('username must be alphanumeric'),

    check('email').custom(async(value) =>{
      const user = await  user.findOne({email: value})
      if(user){
            throw new error('email already exists!');
      }
    }),
    check('username').custom(async (value) =>{
        const user = await User.Findone({username: value});
        if(user){
               throw new error('username already exists!');
        }   
    }),
], async (req, res) => {
    const error = validationResdult(req);
    if(!error.isempty()){
        return res.status(400).json({ errors: error.array()});
    }

    const saltRounds =10;
    const hashedpassword = await bcrypt.hash(req.body.password, saltRounds);

     const newUser = new user({
        email: req.body.email,
        username: req.body.username,
        password: hashedpassword,
        full_name: req.body.full_name
     });
     
     try {
          const savedUser = await   newUser.save();
          res.status(201).json(savedUser);     
     } catch(err) {
           res.status(500).json({ error: err.message});
     }
}); 
                                           
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server is running on port: ${PORT}');
});
