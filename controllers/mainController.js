
// get home page
homePage = async  (req, res, next) => {
    const locals = {
        title: 'nodeJs notes',
        description: 'node description'
    }
    res.render('index', locals);
};

// get about page
aboutPage = async  (req, res, next) => {
    res.render('about');
};

module.exports = {homePage, aboutPage}