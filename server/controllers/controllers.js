module.exports = {
    getAllLocations: async (req, res) => {
        const {zipcode} = req.query
        const db = req.app.get('db')

        const locations = await db.get_all_locations([zipcode])
           const searchedLocations = locations.filter(el => {
               return el.zipcode === +zipcode
           })
           res.status(200).send(searchedLocations)
    },

    getUserLocations: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        const userLocations = await db.get_user_locations([id])
            res.status(200).send(userLocations)
    },

    addNewLocation: async (req, res) => {
        const {id} = req.params
        const {location_name, street_address, city, state, zipcode, image, description, rating} = req.body
        const db = req.app.get('db')

        await db.add_new_location([id, location_name, street_address, city, state, zipcode, image, description, rating])
        .then(() => {
            res.sendStatus(201)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    },

    editLocation: (req, res) => {
        const {id} = req.params
        const {location_name, street_address, city, state, zipcode, image, description, rating} = req.body
        const db = req.app.get('db')

        db.edit_location([location_name, street_address, city, state, zipcode, image, description, rating, id])
        .then(() => {
            res.sendStatus(200)
        }).catch(() => {
            res.sendStatus(500)
        })
    },

    deleteLocation: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        await db.delete_location([id])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    },

    getAWS: (req, res) => {

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
}
}