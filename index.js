const  express=require("express")
const  mongoose=require("mongoose")

const app=express()
const  logger=require("./routes/middleware/logger")
const helmet =require("helmet")
const  morgan=require("morgan")
const config=require("config")
const  debug=require("debug")("app:startup")
const movies=require("./routes/movies")
const home=require("./routes/home")
const genres=require("./routes/genres")
const customers=require("./routes/customers")
const courses=require("./routes/courses")
const rentals= require("./routes/rentals")
console.log(`Application name :${config.get("name")}`);
console.log(`Mail server  :${config.get("mail.host")}`);
// console.log(`Mail password :${config.get("mail.password")}`);
const  Fawn=require("fawn");


mongoose.connect("mongodb://localhost/Genres")
.then(()=>console.log("connected to mongo db.."))
.catch(err=>console.log(err))
 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)
app.use(express.static("public"))
app.use(helmet())

app.use("/",home)
app.use("/api/courses",courses)
app.use("/api/genres",genres)
app.use("/api/customers",customers)
app.use("/api/movies",movies)
app.use("/api/rentals",rentals)
if(app.get("env")==="development"){
    app.use(morgan("tiny"))
    console.log("morgan enabled");
}



const port =process.env.PORT|| 3000
app.listen(port,()=>console.log(`Listening at port ${port}...`))

