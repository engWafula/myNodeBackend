const Joi=require("joi")
const  mongoose=require("mongoose")
  


const customerSchema=new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:6,
        maxlength:20
    },
    phone:{type:String,
        required:true,
        minlength:6,
        maxlength:20
    },
    isGold:{
        type:Boolean,
        default:false
    }
})

const Customer=mongoose.model("Customer",customerSchema)

function validateCustomer(customer){
    const scheema= Joi.object({
        name:Joi.string().min(6).max(20).required(),
        phone:Joi.string().min(6).max(20).required(),
        isGold:Joi.boolean()
    })
    const result=scheema.validate(customer)
    return result
}
exports.Customer=Customer
exports.validate=validateCustomer