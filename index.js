const express=require('express');
const bodyparser=require('body-parser');
const app = express();
const port= 6204;
const cors= require('cors');
const ObjectId=require('mongodb').ObjectId;

app.use(bodyparser.urlencoded({extended: true}))

app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://medi:ruet@firstofmany.vtjwymi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const collection = client.db("RUETMedical").collection("admin");
app.get('/logininfo',(req,res)=>{
  client.connect(err => {
    
    collection.find({})
    .toArray((err,result)=>{
      res.send(result);
    })
    
  });
})


//add doctor information
client.connect(err => {
    const doc_collection = client.db("DoctorList").collection("doctorlist");
    
    app.post('/adddoctor',(req,res)=>{
        const doctordata=req.body;
        doc_collection.insertOne(doctordata)
        .then(res   =>{
           console.log("Data inserted Successfully");
           //location.reload();
        })
        res.send("Data sent");       
    
    })

    app.get('/doctorlist', (req, res) =>{
        doc_collection.find({})
        .toArray((err,result)=>{
            res.send(result);
        })
    })

    app.get('/doctorlist/:email',(req, res) => {
        const mail = req.params.email;
        //console.log(mail);
        doc_collection.find({email:mail})
        .toArray((err,data)=>{
            res.send(data);
            console.log(data);
        })
      })

    app.delete('/deletedoctor/:id', (req, res) =>{
        console.log(req.params.id);
        doc_collection.deleteOne({_id:ObjectId(req.params.id)})
        .then((result)=>{
        console.log(result);
    })
    })
  });

//add staff information
client.connect(err => {
    const staff_collection = client.db("StaffList").collection("stafflist");
    app.post('/addstaff',(req,res)=>{
        const staffdata=req.body;
        staff_collection.insertOne(staffdata)
        .then(res=>{
        console.log("Data inserted successfully")
        })
        res.send("Data sent");
    })
    app.get('/stafflist',(req,res)=>{
        staff_collection.find({})
        .toArray((err,result)=>{
            res.send(result)
        })
    })
    
    app.get('/stafflist/:email',(req, res) => {
      const mail = req.params.email;
      //console.log(mail);
      staff_collection.find({email:mail})
      .toArray((err,data)=>{
          res.send(data);
          console.log(data);
      })
    })

    app.delete('/deletestaff/:id', (req, res) =>{
        console.log(req.params.id);
        staff_collection.deleteOne({_id:ObjectId(req.params.id)})
        .then((result)=>{
        console.log(result);
    })
        
    })

  });


  //student     collection
  client.connect(err => {
    const student_collection = client.db("StudentList").collection("studentlist");
    app.post('/addstudent',(req,res)=>{
        const studentdata=req.body;
        console.log(studentdata);
        if(studentdata.password===studentdata.repassword)
        {
            student_collection.insertOne(studentdata)
            .then(res=>{
            console.log("Data inserted successfully");
            //location.reload();
            })
            res.send("Data sent");
        }
        else
        {
            res.send("Data not sent");
        }
        
        
    })

    app.get('/studentlist', (req, res) => {
        student_collection.find({})
        .toArray((err,result)=>{
            res.send(result)
        })
    })
    app.get('/studentlist/:email',(req, res) => {
        const mail = req.params.email;
        //console.log(mail);
        student_collection.find({email:mail})
        .toArray((err,data)=>{
            res.send(data);
            console.log(data);
        })
      })
      app.get('/studentlist/:roll',(req, res) => {
        const roll = req.params.roll;
        console.log(mail);
        student_collection.find({roll:roll})
        .toArray((err,data)=>{
            res.send(data);
            console.log(data);
        })
      })

  })  

///appointment related functions

  client.connect(err => {
    const app_collection = client.db("AppointmentList").collection("appointmentlist");
    app.post('/addappointment/:obj',(req,res)=>{
        const appointdata=req.params.obj;
        console.log(appointdata);
        const arr=appointdata.split("&");
        app_collection.insertOne({
            studentmail: arr[0],
            studentroll: arr[1],
            doctorname:arr[2],
            doctoremail:arr[3],
            date:arr[4],
            apptime:arr[5],
            status:arr[6]
        })
        .then(res=>{
        console.log("Data inserted successfully")
        })
        res.send("Data sent");
    })

    app.get('/appointmentlist/:docmail', (req, res) => {
      const doctormail=req.params.docmail;
      console.log(doctormail);
      app_collection.find({doctoremail:doctormail})
      .toArray((err,result)=>{
        res.send(result);
      })
     })

     app.get('/appointmentlist/:roll', (req, res) => {
      const doctormail=req.params.roll;
      console.log(doctormail);
      app_collection.find({})
      .toArray((err,result)=>{
        res.send(result);
      })
     })

  });

  



  


  //add prescription

  client.connect(err => {
    const press_collection = client.db("Prescription").collection("prescription");
    app.post('/addprescription/:obj',(req,res)=>{
      const presinfo=req.body;
      const data=req.params.obj;
      const arr=data.split('&');
      
      presinfo.studentmail=arr[0];
      presinfo.doctormail=arr[1];
      press_collection.insertOne(presinfo)
      .then(res=>{
        console.log("Data inserted successfully")
        })
        res.send("Data sent");
      

    })
    app.get('/prescriptionlist', (req, res) => {
      
      press_collection.find({})
      .toArray((err,result)=>{
        res.send(result);
      })
     })
  })


app.listen(port, () => {
  console.log(`app listening on port ${port}....`)
})

