console.log('I am here');
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
// console.log(email);

const stuList= document.getElementById("stuList");
const myPro=document.getElementById('myprofile');
const date=document.getElementById('date');
const shift=document.getElementById('shift');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today);

date.value=today;
myPro.style.cursor="pointer";

date.addEventListener('change',(event)=>{
    console.log(event.target.value);
    const result= stuArray1.filter(i=>i.date===event.target.value);
    console.log(result);
    if(result.length===0){
        let stuHTML='';
        stuList.innerHTML = stuHTML;
    }
    
    let stuHTML="";
    result.forEach(element=>{
        console.log(element);
        
        fetch(`http://localhost:6204/studentlist/${element.studentmail}`)
            .then(res => res.json())
            .then(student_data => {                     
                
                stuHTML = stuHTML + 
                `
                <div class="d-flex flex-column mb-1">

                    <div class="p-2 my-2 mt-4 mission-div px-4">                          
                        <p><b>Name: </b>${student_data[0].fname}  ${student_data[0].lname}</p>
                        <p class="mt-0"><b>Roll: </b>${student_data[0].roll}</p>  
                        <p><b>Appointed at: </b>${element.apptime}</p>
                        <button class="btn btn-success button-select" onclick="select('${element.studentmail}')">Select</button>               
                    </div>                  
                </div>                
                `;
                stuList.innerHTML = stuHTML;
                
            
        });
    })
    
})

myPro.addEventListener("click",()=>{
    location.href=`../DoctorsLoginMenu/DoctorsLoginMenu.html?email=${email}`;
});
let stuArray,stuArray1;
fetch(`http://localhost:6204/appointmentlist/${email}`)
    .then(res => res.json())
    .then(data => {   
         
        stuArray=data;
        stuArray1=data; 
        console.log(stuArray);  
        let stuHTML="";
        const result= stuArray.filter(i=>i.date===today);   
        result.forEach(user => {
            
        fetch(`http://localhost:6204/studentlist/${user.studentmail}`)
            .then(res => res.json())
            .then(student_data => {
                                     
                
                stuHTML = stuHTML + 
                `
                <div class="d-flex flex-column mb-1">

                    <div class="p-2 my-2 mt-4 mission-div px-4">                          
                        <p><b>Name: </b>${student_data[0].fname}  ${student_data[0].lname}</p>
                        <p class="mt-0"><b>Roll: </b>${student_data[0].roll}</p>  
                        <p><b>Appointed at: </b>${user.apptime}</p>
                        <button class="btn btn-success button-select" onclick="select('${user.studentmail}')">Select</button>               
                    </div>                  
                </div>                
                `;
                stuList.innerHTML = stuHTML;
                
            
        });
            
            
        
    })

    })

const select1=document.getElementById('select1');
    function select(stumail){
        console.log('i am clicked');
        let studentHTML="";        
        fetch(`http://localhost:6204/studentlist/${stumail}`)
            .then(res => res.json())
            .then(student_data => {
                console.log(student_data);
                studentHTML=studentHTML+
                `
                <div class="div-app p-4 align-item-center">
                    <div class="mt-3 div-app-head"> 
                    <h4>${student_data[0].fname} ${student_data[0].lname}</h4>
                    <p>${student_data[0].roll}</p>
                    </div>                
                    <br>
                    <h5><b>About: </b></h5>
                    <div class="row">
                        <div class="col-md-8">
                            <option>Department:  ${student_data[0].dept}</option>
                            <option>Mobile no: ${student_data[0].mobile}</option>
                            <option>Email:  ${student_data[0].email}</option>
                        </div> 
                        <div class="col-md-4">
                            <option>Blood Group:  ${student_data[0].blood}</option>
                            <option>Gender: ${student_data[0].gender}</option>
                            <option>Date of Birth: ${student_data[0].birthday}</option>
                        </div>
                    </div>
                    <br>
                    <div class="text-center" >
                                        
                            <button class="p-2 my-2 mt-4 me-5 booklet-prescription-div prescribe" onclick="booklet()"><b>Booklet</b></button>                 
                            <button class="p-2  my-2 mt-4 booklet-prescription-div  prescribe" onclick="prescribe('${stumail}')"><b>Prescribe</b></button>                             
                    </div>

                </div>
                `;
                select1.innerHTML=studentHTML;
            })
            
    }

    function prescribe(stumail){
        window.open(`../Prescription/prescription.html?stumail=${stumail}&docmail=${email}`,"_self")
    }

    function searchroll(){
        const roll=document.getElementById('roll').value;
        const date=document.getElementById('date').value;
        console.log(roll,date);
       const result=stuArray.filter(element=>{
        return element.date===date&&element.studentroll===roll;
       })
       if(result.length===0)
       {
        stuHTML='';
        stuList.innerHTML = stuHTML;

       }
       else{
       let stuHTML="";
        fetch(`http://localhost:6204/studentlist/${result[0].studentmail}`)
            .then(res => res.json())
            .then(student_data => {                     
                
                stuHTML = stuHTML + 
                `
                <div class="d-flex flex-column mb-1">

                    <div class="p-2 my-2 mt-4 mission-div px-4">                          
                        <p><b>Name: </b>${student_data[0].fname}  ${student_data[0].lname}</p>
                        <p class="mt-0"><b>Roll: </b>${student_data[0].roll}</p>  
                        <p><b>Appointed at: </b>${result[0].apptime}</p>
                        <button class="btn btn-success button-select" onclick="select('${result[0].studentmail}')">Select</button>               
                    </div>                  
                </div>                
                `;
                stuList.innerHTML = stuHTML;
                
            
        });
    }
     console.log(result);
        
    }

    