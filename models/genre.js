const Joi=require("joi")
const  mongoose=require("mongoose")


const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false,
        minlength:6,
        maxlength:20
    },
    // price:{
    //     type:Number,
    //     required:true,
    //     min:2,
    //     max:1000
    // }
})
const Genre=mongoose.model("Genre",genreSchema)

function validateGenre(genre){
    const scheema= Joi.object({
        name:Joi.string().min(6).max(20).required()
        // price:Joi.number().min(2).max(1000).required()
    })
    const result=scheema.validate(genre)
    return result
}

exports.Genre=Genre
exports.validate=validateGenre
exports.genreSchema=genreSchema