/// <reference path="../typings/index.d.ts" />

'use strict'

import {assert} from 'chai'
import * as Parser from './chords-parser'
import ChordParser from './chords-parser'

let parser = new ChordParser()

describe('chords parser', () => {

    describe('simple note DoReMi', () => {
        
        it('lower case chord', () => {
            assert.equal(parser.Parse("do"), Parser.Note.Do)
        })

        it('upper case chord', () => {
            assert.equal(parser.Parse("DO"), Parser.Note.Do)
        })

        let cases = [
            { input: "Do", expected: Parser.Note.Do },
            { input: "Re", expected: Parser.Note.Re },
            { input: "Mi", expected: Parser.Note.Mi },
            { input: "Fa", expected: Parser.Note.Fa },
            { input: "Sol", expected: Parser.Note.Sol },
            { input: "La", expected: Parser.Note.La },
            { input: "Si", expected: Parser.Note.Si }
        ]

        for (let test of cases) {
            it(test.input, () => {
                assert.equal(parser.Parse(test.input), test.expected)
            })
        }
    })

    describe('simple note ABC', () => {
        let cases = [
            { input: "C", expected: Parser.Note.Do },
            { input: "D", expected: Parser.Note.Re },
            { input: "E", expected: Parser.Note.Mi },
            { input: "F", expected: Parser.Note.Fa },
            { input: "G", expected: Parser.Note.Sol },
            { input: "A", expected: Parser.Note.La },
            { input: "B", expected: Parser.Note.Si }
        ]

        let parser = new ChordParser().SetABC()

        for (let test of cases) {
            it(test.input, () => {
                assert.equal(parser.Parse(test.input), test.expected)
            })
        }

        it('fail on lowercase letters', () => {
            assert.throws(() => parser.Parse("a"), Parser.UnexpectedInputError)
        })
    })

    parser.SetDoReMi();

    describe('complex chords', () => {
        it('with bemolle', () => {
            assert.equal(parser.Parse("Mib"), Parser.Note.MiBemolle)
        })

        it('with space and bemolle', () => {
            assert.equal(parser.Parse("Mi b"), Parser.Note.MiBemolle)
        })

        it('with space and diesis', () => {
            assert.equal(parser.Parse("Mi #"), Parser.Note.Fa)
        })

        it('with space and bemolle', () => {
            assert.equal(parser.Parse("Fa b"), Parser.Note.Mi)
        })
    })

    describe('not a chord', () => {
        it('custom error with no chord string', () => {
            assert.throws(() => parser.Parse("test"), Parser.UnexpectedInputError)
        })
    })
})