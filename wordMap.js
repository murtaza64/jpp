"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
function parseWords(path) {
    if (path === void 0) { path = "public/words/masu.txt"; }
    var map = new Map();
    var data = (0, fs_1.readFileSync)(path, { encoding: "utf-8" });
    data.split("ーーー")
        .map(function (s) { return s.trim().split("\n"); })
        .filter(function (s) { return s.length > 1; })
        .forEach(function (item) {
        var word = item[0].replace(/[\r\n]/gm, '');
        var moras = item[1].split("・");
        var peak = item[2].split(/\s+/).findIndex(function (v) { return v[v.length - 1] == "^"; });
        var pitches = item[2].split(/\s+/).map(function (v) {
            if (v[v.length - 1] == "^")
                return parseFloat(v.slice(0, -1));
            else 
                return parseFloat(v);
        });
        pitches.pop();
        if (moras.length != pitches.length) {
            throw new Error("error parsing words: pitches length not equal to moras length for " + word);
        }
        var english = item[3];
        var category = item[4];
        var furiganaMap = item.slice(5).map(function (row) {
            var split = row.split("・", 2);
            var t;
            if (split.length == 2) {
                t = [split[0], split[1]];
            }
            else {
                throw new Error("error parsing words: furigana map format for " + word);
            }
            return t;
        });
        map.set(word, {
            moras: moras,
            pitches: pitches,
            english: english,
            peak: peak,
            category: category,
            furiganaMap: furiganaMap
        });
    });
    return map;
}
exports["default"] = parseWords;
