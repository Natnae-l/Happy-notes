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
 
    try {
        let deletedNote = await Notes.findByIdAndDelete({_id: req.params.id});
        if (deletedNote){
            res.redirect('/dashboard')
        } else{
            res.redirect(`/dashboard/item/${req.params.id}`)
        }
    } catch (error) {
        console.log(error)
    }
}

addNote = async (req, res, next) => {
    res.render('dashboard/addNote', {
        layout: '../views/layouts/dashboard',
    })
}
add = async (req, res, next) => {

    let newNote = new Notes({
        title: req.body.name,
        body: req.body.body,
        user: req.user._id
    })
    try {
      await newNote.save();
    } catch(err){
        console.log(err)
    }
    res.redirect('/dashboard')
}

dashboardSearchSubmit = async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Notes.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ],
      }).where({ user: req.user._id });
      console.log(searchResults)
  
      res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };
module.exports = {
    dashboard, showNotes, updateNotes, deleteNote, addNote, add, dashboardSearchSubmit
}