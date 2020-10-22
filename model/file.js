const mongoose=require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const fileSchema = new mongoose.Schema({
  ip: String,
  id:String,
  extension: String,
  name: String,
  url: String,
  downloaded:Boolean
});
fileSchema.plugin(mongoosePaginate);
const fileModel = mongoose.model('file', fileSchema);

module.exports = fileModel;