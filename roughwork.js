const  express=require("express")
const  mongoose=require("mongoose")

const app=express()
const  logger=require("./routes/middleware/logger")
const helmet =require("helmet")
const  morgan=require("morgan")
const config=require("config")
const  debug=require("debug")("app:startup")
const courses=require("./routes/courses")
const home=require("./routes/home")
const genres=require("./routes/genres")
const { boolean } = require("joi")
console.log(`Application name :${config.get("name")}`);
console.log(`Mail server  :${config.get("mail.host")}`);
// console.log(`Mail password :${config.get("mail.password")}`);



mongoose.connect("mongodb://localhost/movies")
.then(()=>console.log("connected to mongo db.."))
.catch(err=>console.log(err))




const movies=async()=>{
    try {
        const movie=new Movie({
            category:"web",
            name:"wafulaAllan",
            author:"Mosh1",
            tags:["action","horror"],
            isPublished:true,
            price:3
        })
        
        const doc=await movie.save()    
        console.log(doc);
    } catch (ex) {
        console.log(ex)
    }
}
movies()

const getmovies=async()=>{
    // const movies=await Movie.find({author:"WAFULA"})
    //starts with Mosh=/^Mosh/ or ends with Mosh=/Mosh$/ or Contains WAFULA=/.*WAFULA.*/i regular exppressions
const movies=await Movie.find({author:/.*WAFULA.*/i})
    // const movies=await Movie.find()
    // .or([{author:"WAFULA"},{isPublished:true}])
    .limit(5).sort({name:1}).select({author:1,tags:1}).count()

    console.log(movies);
}
// const upDateMovie=async(id)=>{
//     const movie=await Movie.findById(id)
//     if(!movie)  return
//     movie.set({
//         isPublished:false,
//         author:"ISAAC WAFULA ALLAN",
//         name:"Vikings"
//          })
//        const result = await movie.save()
//        console.log(result);
// }
// upDateMovie("6169938199b569ce09868bb9")
//update  fields  directly
// const upDateMovie=async(id)=>{
//     const result =await Movie.findByIdAndUpdate(id,{
//         $set:{
//             isPublished:false,
//                     author:"Wafula Steven",
//                     name:"Vikings Lecacy",
//                     isPublished:false
//         }
//     },{new:true})
//        console.log(result);
// }
// upDateMovie("6169938199b569ce09868bb9")
//delete
const DeleteMovie=async(id)=>{
    // const result =await Movie.deleteOne({_id:id})
    const result1=await Movie.findByIdAndRemove(id)
       console.log(result1);
}
// DeleteMovie()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)
app.use(express.static("public"))
app.use(helmet())

app.use("/",home)
app.use("/api/courses",courses)
app.use("/api/genres",genres)

if(app.get("env")==="development"){
    app.use(morgan("tiny"))
    console.log("morgan enabled");
}



const port =process.env.PORT|| 3000
app.listen(port,()=>console.log(`Listening at port ${port}...`))