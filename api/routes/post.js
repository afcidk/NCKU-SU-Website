const { Router } = require('express');
const router =  Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extends:false});
const formidable = require('formidable');
const articleOp = require('../../model/query/article.js');

router.post('/upload', urlencodedParser ,(req,res)=>{
  
  const form = new formidable.IncomingForm();

  form.parse(req,(err,fields,files)=>{
    if(err) throw err;
    var uploadedFile = files.uploadingFile;
    var tmpPath = uploadedFile.path;
    var targetPath = '../../upload/' + uploadedFile.name;

    fs.rename(tmpPath, targetPath, function(err) {
      if (err) throw err;
      fs.unlink(tmpPath, function() {
        console.log('File Uploaded to ' + targetPath);
      });
    });
    res.end();
  });
});

router.post('/saveArticle',urlencodedParser, (req,res) => {

  // TODO: fix wrong usage
  const poster = req.body.poster; 
  const time = req.body.time;
  const type = req.body.type;
  const content = req.body.content;
  

  // send data to database
  articleOp.add("studentId", "this_is_title", content, "vital?", ["array", "of", "tags"]);
   
  res.send("kkk");
});

module.exports = router ;
