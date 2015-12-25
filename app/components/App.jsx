import uuid from 'node-uuid'
import React, {Component} from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                { id: uuid.v4(), task: 'Learn Webpack' },
                { id: uuid.v4(), task: 'Learn React' },
                { id: uuid.v4(), task: 'Learn Redux' }
            ]
        };
    }

    render() {
        const notes = this.state.notes;
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes items={notes}
                       onEdit={this.editNote}
                       onDelete={this.deleteNote} />
            </div>
        );
    }

    addNote = () => {
        const note = {
            id: uuid.v4(),
            task: 'New Task'
        };

        this.setState({
            notes: [...this.state.notes, note]
        });

        console.log('add a note');
    }

    editNote = (id, task) => {
        const notes = this.state.notes.map((note) => {
            if (note.id == id) note.task = task;
            return note;
        });

        this.setState(notes);

        console.log('note edited', id, task);
    }

    deleteNote = (id) => {
        this.setState({
            notes: this.state.notes.filter((note) => note.id != id)
        });
    }
}
