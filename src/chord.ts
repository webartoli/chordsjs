
import { Note } from './note'
export * from './note'

export interface IChord {
    Note: Note;
    Minor?: boolean;
}

export class Chord implements IChord {
    private _note: Note
    private _minor: boolean

    get Note(): Note {
        return this._note;
    }

    get Minor(): boolean {
        return this._minor;
    }

    constructor(chord: IChord) {
        this._note = chord.Note;
        this._minor = chord.Minor;
    }

    public Transpose(semitones: number): void{
        this._note = Chord.Normalize(this._note + semitones)
    }

    private static Normalize(semitones: number) : number {
        return (semitones + 12) % 12
    }
}