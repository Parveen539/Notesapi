const notemodel = require('../model/notes-schema');

const createNote = async (req, res) => {
    const {title, description} = req.body;

    const newNote = new notemodel({
        title : title,
        description : description,
        userId : req.userId
    })
    try {
        await newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something gone wrong"});
    }
}



const updateNote = async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;
    const newNote = {
        title : title,
        description : description,
        userId : req.userId
    }
    try {
        await notemodel.findByIdAndUpdate(id, newNote, {new : true});
        return res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something gone wrong"});
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await notemodel.findByIdAndDelete(id);
        return res.status(202).json(note);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something gone wrong"});
    }
}

const getNote = async (req, res) => {
    try {
        const notes = await notemodel.find({userId : req.userId});
        return res.status(200).json(notes);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something gone wrong"});
    }
}

module.exports = { createNote, updateNote, deleteNote, getNote };