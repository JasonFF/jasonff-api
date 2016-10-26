var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;

function MarkdownReader(options) {
  this.from = options.from;
  this.to = options.to;
  this.rule  = /\.md$/;
}

MarkdownReader.prototype.apply = function() {
  var that = this;
  fs.readdir(that.from,function(error,files){
    if (error) {
      console.error(error)
    }
    var mddata = new Array();
    var notebook = new Array();

    for (var i = 0; i < files.length; i++) {
      if (that.rule.test(files[i])) {
        if (!that._getArticle(files[i])) {
          return false
        }
        mddata.push(that._getArticle(files[i],i))
      }
    }
    fs.writeFileSync(path.join(that.to,'data.json'),JSON.stringify(mddata))
    fs.writeFileSync(path.join(that.to,'notebook.json'),JSON.stringify(that._getNotebook(mddata)))
  })
}

MarkdownReader.prototype._getArticle = function(files,index) {
  var that = this;
  var fileInfo;
  var _path = path.join(that.from,files);
  var fileText = fs.readFileSync(path.join(that.from,files)).toString()
  var configText = fileText.substring(0, fileText.indexOf('}')+1)
  var markdownText = fileText.substring(fileText.indexOf('}')+1)
  var fileInfo = fs.statSync(_path)

  try {
    var config = JSON.parse(configText)
  } catch (e) {
    console.error(e);
  }

  if (!config) {
    console.error(files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！")
    console.log("请在 "+files+" 开头添加JSON格式的信息！参照栗子！请注意JSON的语法！请不要在JSON中写对象！！")
    console.log("你看看你写的什么 " + configText)
    return false
  }

  var markdownHTML = markdown.toHTML(markdownText);
  config.html = markdownHTML;
  config.aid = index;
  config.fi = fileInfo;

  return config
}

MarkdownReader.prototype._getNotebook = function(config) {
  var result = new Array();
  var nid = 0;
  for (var i = 0; i < config.length; i++) {
    for (var m = 0; m < result.length; m++) {
      var ifMatch = false;
      if (result[m].notebook==config[i].notebook) {
        result[m].data.push(config[i]);
        ifMatch = true;
        break
      }
    }
    if (!ifMatch) {
      result.push({
        nid: nid,
        notebook: config[i].notebook,
        data: [config[i]]
      })
      nid++
    }
  }
  return result;
}

module.exports = MarkdownReader;
