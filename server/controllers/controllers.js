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

    editLocation: async (req, res) => {

    },

    deleteLocation: async (req, res) => {
        
    }
}