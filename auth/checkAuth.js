module.exports = function checkAuth(req, res, next){
    if (req.user) next();
    res.redirect('/')
}