module.exports = {
    getAllLocations: async (req, res) => {
        const {location_zipcode} = req.query
        const db = req.app.get('db')

        const locations = await db.get_all_locations([location_zipcode])
           const searchedLocations = locations.filter(el => {
               return el.location_zipcode === +location_zipcode
           })
           res.status(200).send(searchedLocations)
    },

    getUserLocations: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        try{
            const userLocations = await db.get_user_locations([id])
            if(req.session.user){
            return res.status(200).send(userLocations)
            }
        } catch (error) {
            return res.sendStatus(500)
        }
    },

    addNewLocation: async (req, res) => {
        const {id} = req.params
        const {location_name, street_address, city, state, location_zipcode, image, description, rating} = req.body
        const db = req.app.get('db')
        console.log(req.body)

        await db.add_new_location([id, location_name, street_address, city, state, location_zipcode, image, description, rating])
        .then(() => {
            res.sendStatus(201)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    },

    editLocation: (req, res) => {
        const {id} = req.params
        const {location_name, street_address, city, state, location_zipcode, image, description, rating} = req.body
        const db = req.app.get('db')

        db.edit_location([location_name, street_address, city, state, location_zipcode, image, description, rating, id])
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

    nodeMailer: (req, res) => {
        const {first_name, email} = req.body
        const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is read to take messages')
  }
})

        let mail = {
            from: "Toilet Quest",
            to: email,
            subject: "Welcome to Toilet Quest!",
            text: `Hi ${first_name}, 
            Thank you for using Toilet Quest! We hope you enjoy your safe bathroom seeking adventure with a little help from us. Happy hunting from all of us here at Toilet Quest!
            
            Sincerely, 
            Michael Priestley
            Creator of Toilet Quest`
        }

        transporter.sendMail(mail, (err, data) => {
            if(err) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'success'
                })
            }
        })
    }
}