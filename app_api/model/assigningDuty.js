var mongoose=require('mongoose');

var assignDuties=new mongoose.Schema({
	supervisorName:{
		type:String,
		required:true
	},
	guardName:{
		type:String,
		required:true
	},
	supervisorImageUrl:{
		type:String,
		required:true
	},
	guardImageUrl:{
		type:String,
		required:true
	},
	time:
	 {
	  type: String,
	  required:true
	 }
	 ,
	 location:{
	 	type:String,
	 	required:true
	 },
	 lat:{
	 	type:String,
	 	required:true
	 },
	 lng:{
	 	type:String,
	 	required:true
	 }

});

mongoose.model('AssignDutie', assignDuties);