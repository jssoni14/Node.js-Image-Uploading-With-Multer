const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


//Set Storage engine
const storage = multer.diskStorage({
  destination :'./public/uploads/',
  filename: function(req,file,cb){
    cb(null, file.fieldname + '-'+ Date.now() + 
    path.extname(file.originalname));
  }
});
//Init upload

const upload = multer({
  storage: storage
}).single('myImage');

//Init app
const app =express();

//ejs
app.set('view engine','ejs');
//Public folder
app.use(express.static('./public'));

app.get('/views', (req,res) => res.render('index'));
const port = 3000;

app.post('public/uploads',(req,res)=>{
  upload(req, res, (err) =>{
    if(err) {
      res.render('views/index',{
        msg: err
      });
    }else{
      console.log(req.file);
      res.send('test');
    }
  });
});

app.listen(port, ()=> console.log(`Server started on port ${port}`));