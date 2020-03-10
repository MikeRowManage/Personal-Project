module.exports = (req, res, next) => {
    console.log('hit checkUser:', req.session)
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            next()
        }
    }