const express =require( 'express');
const multer =require( 'multer');
const upload  =require( '../../controllers/fileController');
const fileModel=require('../../model/file')


const router = express.Router();

router.post('/upload',
    multer({ dest: 'temp/', limits: { fieldSize: 20 * 1024 * 1024 } }).single(
      'file'
    ),function (req, res){
    upload(req, res)}
  );
router.get('/files/:page',function(req,res){
    fileModel.paginate({},{page:req.params.page,limit:10}).then(response => {
        if(response){
            res.json({response})
        }
        else{
            res.json("Error!")
        }
      }).catch(console.log("error"))
    
})
router.get('/count',function(req,res){
  fileModel.find().exec(function (err, results) {
    const count = results.length
    res.send({count:count});
  })});

module.exports =router;