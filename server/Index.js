const express=require("express")
const cors= require('cors')
const mongoose=require('mongoose')//

const app=express()
app.use(cors())//data backend il ethan vendiii
app.use(express.json()) 
const port= process.env.port || 8080
  


//schema
const schemaData = mongoose.Schema({
    name: String,
    email:String,
    mobile:Number,
    company:String
},{
    timestamps :true
})

//MODEL
const useModel =mongoose.model("studentcol",schemaData)// "studentcal" is db collection automatically create collection in db


//READ DATA FROM MONGO DB ||  URL=("http://localhost:8080/")
app.get("/",async(req,res)=>{
    const data = await useModel.find({})
    res.json({success:true,data:data})  // its json format so use data:dat
})



/*CREATE / UPLOAD DATA TO THE MONGO DB  || URL=("http://localhost/create")

eg:{name,
email,
mobile}
*/
app.post("/create",async(req,res)=>{

    console.log(req.body,"hello0")
    const data=new useModel(req.body)
    await data.save()
    res.send({success:true,message:"data uploaded success",data})
})




/*UPDATE METHODE || URL=("http://localhost:8080/update") update cheyyan id use cheythu update cheyyanm.
 eg:{
    id:"64d656401407476f7490ef11",
    name:"",
    mobile:""
 }
*/
// app.put("/update",async(req,res)=>{
// console.log(req.body,"req body")
// const {id,...rest}=req.body
// console.log(rest)
//   const data= await useModel.updateOne({_id:id},rest)
//   console.log(data,'ddaataa')
//   res.send({success:true,message:"data updated successfully",data})
// })


app.put("/update", async (req, res) => {
    try {
      const { id, ...rest } = req.body;
      const data = await useModel.updateOne({ _id: id }, rest);
      
      if (data.nModified === 1) {
        res.send({ success: true, message: "data updated successfully", data });
      } else {
        res.send({ success: false, message: "No matching document found for update" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "An error occurred during update" });
    }
  });
  
  
  
  
  
  



//DELETE METHODE   id parameter ayi route il pass cheyyanam ,
//  eg: URL=("//localhost:8800/delete/64d5e7fd9d47b7a8566b1314") 
app.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    console.log(id,"params id")
    const data= await useModel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted succesfully",data:data})
})



//MONGOOSE CONNECTION SETTING
mongoose.connect('mongodb://127.0.0.1:27017/studentdb') //studentdb is db name . it will automatically create in db 
.then(()=>{console.log("mongo connected")})
.catch((err)=>console.log(err,"mongo db connection error"))
//

//SERVER CONNECTING TO THE PORT
app.listen(port,()=>console.log("server is running"))