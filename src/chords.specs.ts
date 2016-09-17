/// <reference path="../typings/index.d.ts" />

'use strict'
import chai = require('chai')
import Chords = require('./chords')
var assert = chai.assert

describe('chords parser', () => {

    let parser = new Chords.ChordParser()

    describe('simple note DoReMi', () => {


        it('lower case chord', () => {
            assert.equal(parser.Parse("do"), Chords.Note.Do)
        })

        it('upper case chord', () => {
            assert.equal(parser.Parse("DO"), Chords.Note.Do)
        })

        let cases = [
            { input: "Do", expected: Chords.Note.Do },
            { input: "Re", expected: Chords.Note.Re },
            { input: "Mi", expected: Chords.Note.Mi },
            { input: "Fa", expected: Chords.Note.Fa },
            { input: "Sol", expected: Chords.Note.Sol },
            { input: "La", expected: Chords.Note.La },
            { input: "Si", expected: Chords.Note.Si }
        ]


        for (let test of cases) {
            it(test.input, () => {
                assert.equal(parser.Parse(test.input), test.expected)
            })
        }
    })


    describe('simple note ABC', () => {

        let cases = [
            { input: "C", expected: Chords.Note.Do },
            { input: "D", expected: Chords.Note.Re },
            { input: "E", expected: Chords.Note.Mi },
            { input: "F", expected: Chords.Note.Fa },
            { input: "G", expected: Chords.Note.Sol },
            { input: "A", expected: Chords.Note.La },
            { input: "B", expected: Chords.Note.Si }
        ]

        let parser = new Chords.ChordParser().SetABC()

        for (let test of cases) {
            it(test.input, () => {
                assert.equal(parser.Parse(test.input), test.expected)
            })
        }

        it('fail on lowercase letters', () => {
            assert.throws(() => parser.Parse("a"), Chords.UnexpectedInputError)
        })
    })

    parser.SetDoReMi();

    describe('complex chords', () => {
        it('with bemolle', () => {
            assert.equal(parser.Parse("Mib"), Chords.Note.MiBemolle)
        })

        it('with space and bemolle', () => {
            assert.equal(parser.Parse("Mi b"), Chords.Note.MiBemolle)
        })

        it('with space and diesis', () => {
            assert.equal(parser.Parse("Do #"), Chords.Note.DoDiesis)
        })
    })

    describe('not a chord', () => {
        it('custom error with no chord string', () => {
            assert.throws(() => parser.Parse("test"), Chords.UnexpectedInputError)
        })
    })
})