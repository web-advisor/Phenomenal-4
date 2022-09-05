const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
	{

		name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        }
	},
	{ timestamps: true },
);

mongoose.model('users', Users);
module.exports = mongoose.model('users');
