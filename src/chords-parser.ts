
import { Note } from './note'
import { Chord } from './chord'
import { UnexpectedInputError } from './errors/UnexpectedInputError'

export * from './note'
export * from './errors/UnexpectedInputError'

export default class ChordParser {

    private Notes: string[]
    private Modifiers: string[]
    private RegexOptions: string

    private Diesis: string
    private Bemolle: string

    private Minor: string

    constructor() {
        this.Diesis = '#'
        this.Bemolle = 'b'
        this.SetDoReMi()
    }

    public SetABC() {
        this.Minor = 'm'
        this.Notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
        this.RegexOptions = ""
        return this
    }

    public SetDoReMi() {
        this.Minor = '-'
        this.Notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si']
        this.RegexOptions = "i" // case insensitive
        return this
    }

    private Tokenize(str: string): { note: string, modifier: string } {

        var regex = RegExp(`(${this.Notes.join('|')})` + // note
            `(?: *)` + // optional spaces
            `(${this.Diesis}|${this.Bemolle})?`,
            `g${this.RegexOptions}`)

        var array = regex.exec(str)

        if (array === null) {
            throw new UnexpectedInputError('Invalid String')
        }

        return {
            note: array[1],
            modifier: array[2]
        }
    }

    public Parse(str: string): Note {

        var tokens = this.Tokenize(str)

        var notes = [Note.Do, Note.Re, Note.Mi, Note.Fa, Note.Sol, Note.La, Note.Si]

        for (let index in notes) {

            if (RegExp(this.Notes[index], this.RegexOptions).exec(tokens.note) === null)
                continue // not this note, try another one

            let note = notes[index] as Note

            if (RegExp(this.Diesis).exec(tokens.modifier) !== null)
                note++

            if (RegExp(this.Bemolle).exec(tokens.modifier) !== null)
                note--

            return note
        }

        throw new Error('Something went wrong')
    }
}
