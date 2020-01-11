const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    debugger;
    const notes = loadNotes();
    const dupNote = notes.find((note) => note.title = title)
    if(!dupNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note Added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if(notes.length > newNotes.length){
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes:'))
    notes.forEach(note => {
        console.log('- ' + note.title);
    });
}
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }
}


const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}