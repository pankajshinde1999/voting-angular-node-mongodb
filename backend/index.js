const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: true }));//enables body part data
app.use(bodyParser.json());//json data
app.use(cors());//use model from line 3 

//database connection without warning
const uri = 'mongodb://localhost:27017/voting';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) console.error(err);
    else console.log("database connection")
  })
}
connectWithDB()
//link to the routers module like a import concept 
const adminRouter = require('./router/admin.router.js');
app.use('/', adminRouter);
//user routers 
const userRouter = require('./router/user.router.js');
app.use('/', userRouter);
//votes routers
const voteRouter = require('./router/vote.router.js');
app.use('/polls', voteRouter);
//listen port 
app.listen(8080, () => console.log('Listing on port 8080'));