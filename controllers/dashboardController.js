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
    if (note) res.render('dashboard/view-notes', {
        layout: '../views/layouts/dashboard',
        noteID: req.params.id,
        note
    });

    
}
updateNotes = async (req, res, next) => {
    // console.log(req.body, req.params.id)
    try {
        let updateNote = await Notes.findById({_id: req.params.id});
        if (updateNote && req.body.name && req.body.body){
            await Notes.findByIdAndUpdate({_id: req.params.id}, {
               name: req.body.name,
               body: req.body.body 
            })
            res.redirect(`/dashboard/item/${req.params.id}`)
        } else {
                    res.redirect(`/dashboard/item/${req.params.id}`)
        }       
    } catch(err){
        console.log(err)
    }   
}

deleteNote = async (req, res, next) => {
    console.log(req.params.id)
}

module.exports = {
    dashboard, showNotes, updateNotes, deleteNote
}