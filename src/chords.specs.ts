/// <reference path="../typings/index.d.ts" />

'use strict'
import chai = require('chai')
import Chords = require('./chords')
var assert = chai.assert

describe('chords parser', () => {

    describe('simple note DoReMi', () => {

        let cases = [
            { input: "Do", expected: Chords.Note.Do },
            { input: "do", expected: Chords.Note.Do },
            { input: "DO", expected: Chords.Note.Do },
            { input: "Re", expected: Chords.Note.Re },
            { input: "Mi", expected: Chords.Note.Mi },
            { input: "Fa", expected: Chords.Note.Fa },
            { input: "Sol", expected: Chords.Note.Sol },
            { input: "La", expected: Chords.Note.La },
            { input: "Si", expected: Chords.Note.Si }
        ]

        let parser = new Chords.ChordParser()
        parser.SetDoReMi()

        for (let test of cases) {
            it(`parse ${test.input}`, () => {
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

        let parser = new Chords.ChordParser()
        parser.SetABC()

        for (let test of cases) {
            it(`parse ${test.input}`, () => {
                assert.equal(parser.Parse(test.input), test.expected)
            })
        }

        it ('no not parse lowercase letters', () => {
            assert.throws(() => parser.Parse("a"), Chords.UnexpectedInputError)
        })
    })

    describe('complex chords', ()=> {
        it ('chord with bemolle', () => {
            let parser = new Chords.ChordParser()
            assert.equal(parser.Parse("Mib"), Chords.Note.MiBemolle)
        })

        it ('chord with space and bemolle', () => {
            let parser = new Chords.ChordParser()
            assert.equal(parser.Parse("Mi b"), Chords.Note.MiBemolle)
        }) 
        
        it ('chord with space and diesis', () => {
            let parser = new Chords.ChordParser().SetABC()
            assert.equal(parser.Parse("C #"), Chords.Note.DoDiesis)
        })
    })

    describe('not a chord', () => {
        it('returns error with no chord string', () => {
            let parser = new Chords.ChordParser()
            assert.throws(() => parser.Parse("test"), Chords.UnexpectedInputError)
        })
    })
})