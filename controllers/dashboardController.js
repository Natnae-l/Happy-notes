const Notes = require('../model/notesModel')
const mongoose = require('mongoose')


dashboard = async (req, res, next) => {
 
    let notes = await Notes.find({user: req.user._id})

    const locals = {
        title: 'dashboard',
        description: 'node description'
    }
    let user = req.user;

    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard',
        user,
        notes
    });
}

showNotes = async (req, res, next) => {
    const note = await Notes.findById({_id: req.params.id}).where({
        user: req.user._id
    }).lean()
     console.log(note)
    if (note) res.render('dashboard/view-notes', {
        layout: '../views/layouts/dashboard',
        noteID: req.params.id,
        note
    });

    
}
updateNotes = async (req, res, next) => {
    res.render('dashboard/view-notes')
}

module.exports = {
    dashboard, showNotes, updateNotes
}