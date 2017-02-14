/**
 * Created by anna.kulikova on 14/02/2017.
 */
var gulp = require('gulp');
var util = require('gulp-util');

//The base file with default properties
var settingsBase = require('./bower.base.json');

gulp.task("default", ['settings:compile']);

gulp.task("settings:compile", function() {

    var npmSettings = require('./package.json');

    //cycle through each potential property in base object
    for (var prop in settingsBase) {
        //if an override exists
        if (npmSettings.hasOwnProperty(prop)) {
            settingsBase[prop] = npmSettings[prop];
        }
    }
    //convert object to prettified JSON string and write it a file
    return newFile("bower.json", JSON.stringify(settingsBase, null, '\t'))
        .pipe(gulp.dest('./'));
});

//file stream writer
function newFile(name, contents) {
    //uses the node stream object
    var readableStream = require('stream').Readable({ objectMode: true });
    //reads in our contents string
    readableStream._read = function () {
        this.push(new util.File({ cwd: "", base: "", path: name, contents: new Buffer(contents) }));
        this.push(null);
    };
    return readableStream;
}

