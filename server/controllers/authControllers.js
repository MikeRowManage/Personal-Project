const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        // console.log('hit register, req.body', req.body)
        const {username, first_name, last_name, email, profile_pic, zipcode, password} = req.body 
        const {session} = req
        const db = req.app.get('db') 

        let user = await db.check_user([username])
        user=user[0]
        if(user) {
            return res.status(400).send('User already exists')
        }  
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newUser = await db.register_user([username, first_name, last_name, email, profile_pic, zipcode, hash])
        newUser = newUser[0]
        session.user = newUser
        res.status(201).send(session.user)
    },

    login: async (req, res) => {
        // console.log('hit login, req.body:', req.body)
        const {username, password} = req.body
        const {session} = req
        const db = req.app.get('db')

        let user = await db.check_user([username])
        user = user[0]
        if(!user) {
            return res.status(400).send('User not found')
        }
        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            session.user = user
            res.status(202).send(session.user) 
        } else {
            res.status(201).send('Incorrect username or password')
        }
    },

    logout: (req, res) => {
        console.log('hit logout')
        if(req.session) req.session.destroy()
        res.sendStatus(200)
    }
}