"use strict";
var ChordParser = (function () {
    function ChordParser() {
        this.Major = "+";
        this.SetDoReMi();
    }
    ChordParser.prototype.SetABC = function () {
        this.Minor = "m";
        this.Notes = [
            { expr: /^C/i, note: 0 /* Do */ },
            { expr: /^D/i, note: 2 /* Re */ },
            { expr: /^E/i, note: 4 /* Mi */ },
            { expr: /^F/i, note: 5 /* Fa */ },
            { expr: /^G/i, note: 7 /* Sol */ },
            { expr: /^A/i, note: 9 /* La */ },
            { expr: /^B/i, note: 11 /* Si */ },
        ];
        return this;
    };
    ChordParser.prototype.SetDoReMi = function () {
        this.Minor = "-";
        this.Notes = [
            { expr: /^do/i, note: 0 /* Do */ },
            { expr: /^re/i, note: 2 /* Re */ },
            { expr: /^mi/i, note: 4 /* Mi */ },
            { expr: /^fa/i, note: 5 /* Fa */ },
            { expr: /^sol/i, note: 7 /* Sol */ },
            { expr: /^la/i, note: 9 /* La */ },
            { expr: /^si/i, note: 11 /* Si */ },
        ];
        return this;
    };
    ChordParser.prototype.Parse = function (str) {
        for (var _i = 0, _a = this.Notes; _i < _a.length; _i++) {
            var c = _a[_i];
            if (str.match(c.expr))
                return c.note;
        }
        return undefined;
    };
    return ChordParser;
}());
exports.ChordParser = ChordParser;
