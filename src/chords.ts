export const enum Note {
    Do = 0,
    DoDiesis = 1,
    Re = 2,
    MiBemolle = 3,
    Mi = 4,
    Fa = 5,
    FaDiesis = 6,
    Sol = 7,
    SolDiesis = 8,
    La = 9,
    SiBemolle = 10,
    Si = 11
}

export class UnexpectedInputError extends Error {

    constructor(public message?: string) {
        super(message);
        this.name = "UnexpectedInput";
    }
}

export class ChordParser {

    private Notes: string[];
    private Modifiers: string[];
    private RegexOptions: string;

    private Diesis: string;
    private Bemolle: string;

    private Minor: string;

    constructor() {
        this.Diesis = '#'
        this.Bemolle = 'b'
        this.SetDoReMi();
    }

    public SetABC() {
        this.Minor = "m";
        this.Notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        this.RegexOptions = "";
        return this;
    }

    public SetDoReMi() {
        this.Minor = "-"
        this.Notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
        this.RegexOptions = "i" // case insensitive
        return this;
    }

    public Parse(str: string): Note {

        var regex = RegExp(`(${this.Notes.join('|')})` + // note
            `(?: *)` + // optional spaces
            `(${this.Diesis}|${this.Bemolle})?`,
            `g${this.RegexOptions}`);

        var tokens = regex.exec(str);

        if (tokens === null) {
            throw new UnexpectedInputError("Invalid String");
        }

        var notes = [Note.Do, Note.Re, Note.Mi, Note.Fa, Note.Sol, Note.La, Note.Si];

        for (let index in notes) {
            let note = notes[index] as Note;
            let noteString = this.Notes[index];

            if (RegExp(noteString, this.RegexOptions).exec(tokens[1]) === null) 
                continue; // not this note, try another one

            if (RegExp(this.Diesis).exec(tokens[2]) !== null)
                note++;

            if (RegExp(this.Bemolle).exec(tokens[2]) !== null) 
                note--;

            return note;
        }

        throw new Error("Something went wrong");
    }
}