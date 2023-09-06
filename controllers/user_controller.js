const userModel = require('../models/user_model');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


module.exports = {
    
    register: (req, res)=> {
        
        res.render('register');


    },
  addregister:  (req, res) => {
      // res.send(req.body);
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var mobile_no = req.body.mobile_no;
    var password = req.body.password;
    var username = req.body.username;
  
    const saltRound = 10;

    bcrypt.hash(password, saltRound, (err, hash) => {

    if(err){
      res.send(err);
    }else{
      const inputData= {
        first_name: first_name,
        last_name:last_name,
        email :email,
        mobile_no :mobile_no,
        password :password,
        username :username,
      };
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
          auth: {
                user: 'subhamani1299@gmail.com',
                pass: 'iofblwscatdemvkx'
              }
      })

      const mailTemplate = `
          Your registration successfull now you can login with your username and password we mentioned your username password below
          Username: ${username} Password: ${password}`

      const loginSuccessfulEmail = {
        from: 'subhamani1299@gmail.com',
        to: email,
        subject: 'Registration successfull',
        text: mailTemplate
      }

      transporter.sendMail(loginSuccessfulEmail, (error, response) => {
        if(error){
          res.send(error);
        }else{
          userModel.addregister(inputData, function(data){
            res.redirect('/login');
          });


       
      }
      })
    }
  })    
  },
  
  home:  (req, res) => {
   res.render('home');
  },
  login: (req, res) =>{
    
    res.render('login');
  },
  logout: (req, res) =>{
      req.session.destroy();
      res.redirect('/');

  },
  loginform: (req, res) => {
   var username = req.body.user_name;
   var password = req.body.pass_word;
    

    userModel.loginDetails(username, function (data) {
       const userProvidedPassword = password;

        const storedPasswordHash = data[0].password; // Retrieve this from the database

        bcrypt.compare(userProvidedPassword, storedPasswordHash, (err, hash) => {
          if (err) {
            console.error('Error comparing passwords:', err);
          } else if (hash) {
            console.log('Passwords match! User can log in.');
            req.session.username = data[0].username;
            req.session.password = data[0].password;
            req.session.role = data[0].role;
            req.session.save();
            console.log(req.session);

            res.redirect('/');
          } else {
            console.log('Passwords do not match. Access denied.')
            res.redirect('/login');
          }
        });
    })
       
  },
  session_api: (req, res) => {
    if (req.session.role) {
    if (req.session.role == 2) {
      var username = req.session.username;
      var role = req.session.role;
      var email = req.session.email;
      var sessionDetails = {
        username: username,
        mail: email,
        role: role
      }
      res.send(sessionDetails);
    }
  } else {
    var sessionDetails = {
      username: 'Account',
      role: 0
    }
    res.send(sessionDetails);
  }




  },
  update_user: (req, res) => {

    const inputData = {
    
       last_name : req.body.last_name,
       first_name :req.body.first_name,
       email : req.body.email,
       mobile_no : req.body.mobile_no,
      
    };
    var userid = req.body.id;

   userModel.updateData(inputData, userid, function (data) {
      res.redirect('/profile')

    })

  },
profile_details: (req, res) => { 
 if (req.session.role) {
    if (req.session.role == 2) {
      var username = req.session.username;
      var password = req.session.password;

      userModel.loginDetails(username, function (data) {

      
        const profiledetails = {
          firstname: data[0].first_name,
          lastname: data[0].last_name,
          email: data[0].email,
          mobile_no: data[0].mobile_no,
          username: data[0].username,
          password: data[0].password,
          user_id: data[0].id
        };
        res.render('profile', { profiledetails });
          
      })
    
    }else{
      res.redirect('/login');
   }
  } else {
    res.redirect('/login');
}
  },
  user_details: (req, res) => {
    
    if (req.session.role) {
    if (req.session.role == 2) {
      var username = req.session.username;
      var password = req.session.password;


      userModel.loginDetails(username, function (data) {
        // res.send(result);
        const userdetails = {
          firstname: data[0].first_name,
          lastname: data[0].last_name,
          email: data[0].email,
          mobile_no: data[0].mobile_no,
          username: data[0].username,
          password: data[0].password,
          user_id: data[0].id,
        };
        res.render('account', { userdetails });
      })

      
    }else{
      res.redirect('/login');
   }
  } else {
    res.redirect('/login');
}
  }

}