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

export class ChordParser {

    private Notes: {expr: RegExp, note: Note}[];

    private Minor: string;
    private Major: string;

    constructor() {
        this.Major = "+";
        this.SetDoReMi();
    }

    public SetABC() {
        this.Minor = "m";
        this.Notes = [
            { expr: /^C/i, note: Note.Do },
            { expr: /^D/i, note: Note.Re },
            { expr: /^E/i, note: Note.Mi },
            { expr: /^F/i, note: Note.Fa },
            { expr: /^G/i, note: Note.Sol },
            { expr: /^A/i, note: Note.La },
            { expr: /^B/i, note: Note.Si },
        ];
        return this;
    }

    public SetDoReMi() {
        this.Minor = "-"
        this.Notes = [
            { expr: /^do/i, note: Note.Do },
            { expr: /^re/i, note: Note.Re },
            { expr: /^mi/i, note: Note.Mi },
            { expr: /^fa/i, note: Note.Fa },
            { expr: /^sol/i, note: Note.Sol },
            { expr: /^la/i, note: Note.La },
            { expr: /^si/i, note: Note.Si },
        ];
        return this;
    }

    public Parse(str: string): Note {

        for (let c of this.Notes) {
            if (str.match(c.expr)) return c.note
        }

        return undefined;
    }
}