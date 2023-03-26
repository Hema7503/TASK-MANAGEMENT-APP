const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors({
    origin: '*'
}))


mongoose.connect('mongodb+srv://kalyani:kalyani@cluster0.cjzw69u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=>console.log('DB Connected...')
)

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body ;
    try {
        const newData = new TaskSchema({todo});
        await newData.save();
        return res.json(await TaskSchema.find())
    } 
    catch(err) {
        console.log(err.message);  
    }
})

app.get('/gettask',async(req,res) => {
    try{
        return res.json(await TaskSchema.find()) ;
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res) => { 
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

// app.put('/update/:id',async(req,res) => { 
//     try{
//         await TaskSchema.findByIdAndUpdate(req.params.id);
//         // return res.json(await TaskSchema.find())
//     }
//     catch(err){
//         console.log(err)
//     }
// })

app.listen(50000,()=> console.log('Server running...'));