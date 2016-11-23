
var path = require('path');
var request = require('request');
var fs = require('fs');

var download = function(uri, dir,filename){
    console.log(dir)
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

module.exports = download;

var basePath=path.dirname(__filename);
var targetPath = basePath;
var filePath2 = 'http://upload-images.jianshu.io/upload_images/2033728-b092de0a7b762c39.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240';
download(filePath2,targetPath,"abc.jpg");
console.log("下载成功");
