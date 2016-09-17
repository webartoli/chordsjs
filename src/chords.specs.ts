/// <reference path="../typings/index.d.ts" />

'use strict';
import chai = require('chai');
import Chords = require('./chords');

var assert = chai.assert;

describe('chords parser', () => {

    describe('simple note DoReMi', () => {

        let cases = [
            { input: "Do", expected: Chords.Note.Do },
            { input: "Re", expected: Chords.Note.Re },
            { input: "Mi", expected: Chords.Note.Mi },
            { input: "Fa", expected: Chords.Note.Fa },
            { input: "Sol", expected: Chords.Note.Sol },
            { input: "La", expected: Chords.Note.La },
            { input: "Si", expected: Chords.Note.Si }
        ];

        let parser = new Chords.ChordParser();
        parser.SetDoReMi();

        for (let test of cases) {
            it(`parse ${test.input}`, () => {
                assert.equal(parser.Parse(test.input), test.expected);
            })
        }
    });

    
    describe('simple note ABC', () => {

        let cases = [
            { input: "C", expected: Chords.Note.Do },
            { input: "D", expected: Chords.Note.Re },
            { input: "E", expected: Chords.Note.Mi },
            { input: "F", expected: Chords.Note.Fa },
            { input: "G", expected: Chords.Note.Sol },
            { input: "A", expected: Chords.Note.La },
            { input: "B", expected: Chords.Note.Si }
        ];

        let parser = new Chords.ChordParser();
        parser.SetABC();

        for (let test of cases) {
            it(`parse ${test.input}`, () => {
                assert.equal(parser.Parse(test.input), test.expected);
            })
        }
    });
});