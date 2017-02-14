var mongoose=require('mongoose');
var assignTokens=new mongoose.Schema({
	Token:{
		type:String,
		required:true
	}

});
mongoose.model('assignTokens', assignTokens);