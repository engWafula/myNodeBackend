const  express=require("express")
const router=express.Router()
const Joi=require("joi")

const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"}
]

router.get("/",(req,res)=>{
    res.send(courses)
})
router.post("/",(req,res)=>{

const {error}=validateCourse(req.body)

// console.log(result)
    if(error)
       return  res.status(400).send(error.details[0].message)
    
    
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course)
    res.send(course)
})
router.get("/:id",(req,res)=>{
    
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)
  return   res.status(404).send("That course doesnot exist")
    res.send(course)
})
router.put("/:id",(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)
   return  res.status(404).send("That course doesnot exist")
    const {error,value}=validateCourse(req.body)
    if(error)
       return  res.status(400).send(error.details[0].message)
        
    
    course.name=req.body.name
    res.send(course)
})
router.delete("/:id",(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)
   return res.status(404).send("That course doesnot exist")
  const index=courses.indexOf(course)
  courses.splice(index,1)
  res.send(course)
})

function validateCourse(course){
    const scheema= Joi.object({
        name:Joi.string().min(4).required()
    })
    const result=scheema.validate(course)
    return result
}
module.exports=router