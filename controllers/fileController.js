const File =require( '../model/file');
const aws =require( 'aws-sdk');
const fs =require( 'fs');
const path =require( 'path');
const uuid=require('uuid');
  function upload(req, res){
      console.log(req.file.originalname)
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION
    });
    const s3 = new aws.S3();
    const id=uuid.v4();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `filebin/${id}-${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); 
        const locationUrl = data.Location;
        const ip=req.ip;
        const extension=path.extname(req.file.originalname)
    
        let newFile = new File({ip:ip,id:id,extension:extension,name:req.file.originalname , url: locationUrl,downloaded:false });
        newFile
          .save()
          .then(File => {
            res.json({ message: 'File created successfully', File });
          })
          .catch(err => {
            console.log('Error occured while trying to save to DB');
          });
      }
    });
  }
module.exports=upload;