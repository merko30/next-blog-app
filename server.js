const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const morgan = require("morgan");
const path = require('path');
dotenv.config({ silent: true });


const app = express();

// database connection
require('./config/database');

// bodyparser, cors setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// passport setup
app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use(morgan("dev"));


// static
app.use('/uploads', express.static(__dirname + '/static/uploads'))

// routes 
app.use("/api/posts", require('./routes/posts'));
app.use("/api/comments", require('./routes/comments'));
app.use("/api/auth", require('./routes/user'));

if(process.env.NODE_ENV === 'production'){
  //set stati folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}



app.use((err, req, res, next) => {
  res.status(err.code || 500).send({ error: err.message || 'Internal server error happened' })
})



const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
