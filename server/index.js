const express = require("express")
const {collection,tvdata} = require("./mongo")
//const tvdata = require("./mongo")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors())
const dotenv = require('dotenv').config()


const ObjectId = require('mongodb').ObjectId; // Import ObjectId from MongoDB package


app.post('/AddMovie', async(req, res) => {
    const{letter,name,year,production,category,poster,description,wstatus,myrank} = req.body

    const data = {
        letter:letter,
        name:name,
        year:year,
        production:production,
        category:category,
        poster:poster,
        description:description,
        wstatus:wstatus,
        myrank:myrank
    }

    try{
        const check = await collection.findOne({name:name})

        if(check){
            res.json("exist")
        }else{
            await collection.insertMany([data])
            res.json("noteexist")
        }
    }catch(e){
        res.json("notexist")
    }

});

app.get('/AddMovie', async(req, res) => {
    const{letter,name,year,production,category,poster,description,wstatus,myrank} = req.body

    try{
        const data = await collection.find()
        res.json(data)
    }catch(error){
        console.log(error)
        res.status(8000).json({error:'Internal Server Error'})
    }

});


app.put('/AddPage/:id', async(req,res) => {
    const id  = req.params.id;
    const updatedData = req.body;
    console.log(id)
    console.log(updatedData)
    try {
        const check = await collection.findOne({ _id: id });
        console.log(check)

        if (check) {
            await collection.updateOne(
                { _id: id},
                {
                    $set : {
                        poster:updatedData.poster,
                        description:updatedData.description,
                        wstatus:updatedData.wstatus,
                        myrank:updatedData.myrank
                    }
                }
            );
        
          res.json('success');
        } else {
          res.json('failed');
        }
      } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
      }

})

app.post('/AddTvSeries', async(req, res) => {

    const{letter,name,year,production,category,poster,description,wstatus,myrank} = req.body

    const data = {
        letter:letter,
        name:name,
        year:year,
        production:production,
        category:category,
        poster:poster,
        description:description,
        wstatus:wstatus,
        myrank:myrank
    }

    try{
        const check = await tvdata.findOne({name:name})

        if(check){
            res.json("exist")
        }else{
            await tvdata.insertMany([data]);
            res.json("noteexist")   
        }
    }catch(e){
        res.json("notexist")
    }

});

app.get('/AddTvSeries', async(req,res) => {
    const{letter,name,year,production,category,poster,description,wstatus,myrank} = req.body

    try{
        const data = await tvdata.find()
        res.json(data)
    }catch(error){
        console.log(error)
        res.status(8000).json({error:"Internal Server Error"})
    }
})

// const dataSchema = new mongoose.Schema({
//     letter:String,
//     name:String,
//     year:String,
//     production:String,
//     category:String,
//     poster:String,
//     description:String,
//     wstatus:String,
//     myrank:String
// });

// const DataModel = mongoose.model('Data', dataSchema )

// app.get('/AddMovie', async(req, res) => {
//     try{
//         const data = await DataModel.find();
//         res.json(data)
//     }catch(error){
//         console.log(error);
//         res.json(8000).json({error:'Internal Server Error'});
//     }
// });

app.listen(8000, () => console.log("Server Up and running"));