require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  aws = require('aws-sdk'),
  authCtrl = require("./controllers/authControllers"),
  ctrl = require('./controllers/controllers'),
  checkUser = require('./middleware/checkUser'),
  { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 4 },
    secret: SESSION_SECRET
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set("db", db);
  console.log("|---Database is connected---|");
  app.listen(SERVER_PORT, () =>
    console.log(`|---Server is running on Port: ${SERVER_PORT}---|`)
  );
}).catch(err => console.log(err))

app.post('/api/register', checkUser, authCtrl.register)
app.post('/api/login', checkUser, authCtrl.login)
app.post('/api/logout', authCtrl.logout)
app.get('/api/user', checkUser)

app.post('/api/locations/:id', ctrl.addNewLocation)
app.get('/api/locations', ctrl.getAllLocations)
app.get('/api/locations/:id', ctrl.getUserLocations)
app.delete('/api/locations/:id', ctrl.deleteLocation)
app.put('/api/locations/:id', ctrl.editLocation)
app.get('/sign-s3', ctrl.getAWS)


