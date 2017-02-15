/// <reference path="../typings/index.d.ts" />

'use strict'

import {assert} from 'chai'

import * as Chords from './chord'


describe('chord', () => {

    describe('tranpose', () => {
        
        it('do + 1', () => {
            let ch = new Chords.Chord({Note: Chords.Note.Do})
            ch.Transpose(1)
            assert.equal(Chords.Note.DoDiesis, ch.Note)
        })

        it('do# -2', () => {
            let ch = new Chords.Chord({Note: Chords.Note.DoDiesis})
            ch.Transpose(-2)
            assert.equal(Chords.Note.Si, ch.Note)
        })

        it('si +2', () => {
            let ch = new Chords.Chord({Note: Chords.Note.Si})
            ch.Transpose(+2)
            assert.equal(Chords.Note.DoDiesis, ch.Note)
        })

    })

})