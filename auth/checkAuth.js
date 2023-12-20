module.exports = function checkAuth(req, res, next){
    if (req.user) next();
    else {
            res.redirect('/')
    }
}