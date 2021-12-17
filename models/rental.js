const Joi=require("joi")
const  mongoose=require("mongoose")
  


const rentalSchema=new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type:String,
                minlength:6,
                maxlength:20,
                required:true

            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{type:String,
                required:true,
                minlength:6,
                maxlength:20
            },
        }),
        required:true
      },
      movie:{
         type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength:6,
                maxlength:50
              },
              dailyRentalRate: {
                type: Number,
                min: 0,
                max:1000000000
              },
      
         }),
         required:true
      },
   dateOut:{
    required:true,
    default:Date.now,
    type:Date
   },
   dateReturned:{
       type:Date
   },
   rentalFee:{
       type:Number,
       min:0,
       max:10000000
   }

})

const Rental=mongoose.model("Rental",rentalSchema)

function validateRental(rental){
    const schema= Joi.object({
        customerId:Joi.string().required(),
        movieId:Joi.required(),
     
    })
    const result=schema.validate(rental)
    return result
}
exports.Rental=Rental
exports.validate=validateRental