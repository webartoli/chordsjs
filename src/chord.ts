
import { Note } from './note'

export class Chord {
    private _note: Note;

    get Note(): Note {
        return this._note;
    }

    set Note(note: Note) {
        this._note = note;
    }
}