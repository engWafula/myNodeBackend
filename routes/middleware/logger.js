function log(req,res,next){
    console.log("logg.....");
    next()
   }
   function auth(req,res,next){
    console.log("Authenticating.....");
    next()
   }
   module.exports=log
   