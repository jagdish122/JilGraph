"use strict";

function JilParser() {
    this.jobStartTags = [
        "insert_job",
        "insert_machine",
        "delete_job",
    ];
}

JilParser.prototype.loadJil = function(jilText) {
    var jilTextWithoutComments = removeComments(jilText);
}

JilParser.prototype.removeComments = function(jilText) {
    var commentRegexp = new RegExp("/[*]([^*]|[\r\n]|([*]+([^*/]|[\r\n])))*[*]+/", "g");
    return jilText.replace(commentRegexp, "").trim();
}

JilParser.prototype.parse = function(jilText) {
    jilText = this.removeComments(jilText);
    
    var reg = new RegExp(/^\s*\w+:.*$/gm);
    
    var currentJob = null;
    var result = [];
    var match;
    while((match = reg.exec(jilText)) !== null) {
        var line = match[0].trim(); // Escape quotes
        var propName = line.match(/\w+:/)[0].replace(":", "");
        var propValue = line.replace(/\w+:\s*/, "").trim();
        
        if ($.inArray(propName, this.jobStartTags) >= 0) {
            currentJob = {name: propValue};
            result.push(currentJob);
        }
        
        currentJob[propName] = propValue;
    }
    return result;
}

JilParser.prototype.quote = function(str) {
    return '"' + str + '"';
}

JilParser.prototype.insertBrackets = function(jilText) {
    var resultText = "";
    
    return resultText.trim();
}
