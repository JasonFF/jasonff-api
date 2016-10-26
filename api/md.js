var MarkdownReader = require('./markdowns/MarkdownReader.js');
var path = require('path');
var mdr = new MarkdownReader({from: path.resolve('api','markdowns'),to: path.resolve('dist') })
mdr.apply()
