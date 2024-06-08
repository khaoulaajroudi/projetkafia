const mongoose=require('mongoose')
const schema=mongoose.Schema

const contactschema= new schema ({

    fullname:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    criter:[]
    
})
const contact=mongoose.model('listofstudents',contactschema)
module.exports=contact