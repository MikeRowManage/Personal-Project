require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  authCtrl = require("./controllers/authControllers"),
  ctrl = require('./controllers/controllers'),
  { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

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

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/logout', authCtrl.logout)

app.post('/api/locations/:id', ctrl.addNewLocation)
app.get('/api/locations', ctrl.getAllLocations)
app.get('/api/locations/:id', ctrl.getUserLocations)


