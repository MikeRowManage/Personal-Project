require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  cors = require('cors')
  aws = require('aws-sdk'),
  authCtrl = require("./controllers/authControllers"),
  ctrl = require('./controllers/controllers'),
  checkUser = require('./middleware/checkUser'),
  nodemailer = require('nodemailer'),
  { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const app = express();

app.use(express.json());
app.use(cors())
app.use( express.static( `${__dirname}/../build` ) )

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
app.post('/send', ctrl.nodeMailer)

app.post('/api/locations/:id', ctrl.addNewLocation)
app.get('/api/locations', ctrl.getAllLocations)
app.get('/api/locations/:id', ctrl.getUserLocations)
app.delete('/api/locations/:id', ctrl.deleteLocation)
app.put('/api/locations/:id', ctrl.editLocation)
app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
})


