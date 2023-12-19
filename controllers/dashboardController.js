
dashboard = async (req, res, next) => {
    const locals = {
        title: 'dashboard',
        description: 'node description'
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
}

module.exports = {
    dashboard
}