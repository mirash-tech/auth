import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection 
        connection.on('connected', () =>{
            console.log('Mongoose connected successfully');
        })
        connection.on('error',(err)=>{
            console.log('Mongoose disconnected'+err);
            process.exit();
        })
    }catch (error){
            console.log('Something went wrong in connecting to DB');
            console.log(error);
    }
    
}