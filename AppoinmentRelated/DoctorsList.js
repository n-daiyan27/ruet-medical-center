console.log('I am here');
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);
const doc_div = document.getElementById('doc-div');
const select_doc = document.getElementById('select_doc');
let doctorHTML = "";
let appointDoc = "";
let doctorname,mailid,roll;

const editPro= document.getElementById('editProfile');
const myPro=document.getElementById('myprofile');
fetch(`http://localhost:6204/studentlist/${email}`)
.then(res=>res.json())
.then(data=>{
    roll=data[0].roll;
})
editPro.style.cursor="pointer";
myPro.style.cursor="pointer";

editPro.addEventListener("click",()=>{
    location.href=`../StudentEditProfile/StudentEditProfile.html?email=${email}`;
});

myPro.addEventListener("click",()=>{
    location.href=`../StudentsLoginMenu/StudentsLoginMenu.html?email=${email}`;
});


fetch('http://localhost:6204/doctorlist')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(user => {
            console.log(user);
            doctorHTML = doctorHTML + `
        <div class="p-2 my-2 mt-4 mission-div px-4">
            <h4 class="fw-bold">${user.name}</h4>
            <p class="mb-0">${user.designation}</p>
            <p >Specialized in ${user.special}</p> 
            <button class="btn btn-primary px-4 button" onclick="selected('${user.email}')">Select</button>                
        </div>`
        });
        doc_div.innerHTML = doctorHTML;


    })

    function selected(doc_email) {
        console.log(doc_email);
    
        fetch(`http://localhost:6204/doctorlist/${doc_email}`)
            .then(res => res.json())
            .then(data => { 
                console.log(data);
                appointDoc="";
                doctorname=data[0].name;
                mailid=data[0].email;
                
                appointDoc = appointDoc +
                    ` 
                <div class="div-app">           
                <div class=" mt-3 "> 
                  <h4 class=" m-">${data[0].name}</h4>
                  <p class="">${data[0].practice}</p>
                </div>
              <br>
              <p><b>About Doctor: </b></p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ratione tempora quas repellendus porro, facilis velit qui ad! </p>
                <div>
                  <label for="date"><b>Select Date:</b></label>
                  <input class="form-control mt-1" name="date" id="stime" type="date" required/>
                </div>
                <br>
                <div>
                <label for="date"><b>Appointment time:</b></label>
                <br><br>
                <div class="button" id="shift1"  style="cursor: pointer" onclick="func1()"><b id="s1" >${data[0].shift1}</b></div>
                <div class="button" id="shift2" onclick="func2()" style="cursor: pointer"><b id="s2" >${data[0].shift2}</b></div>
                <br>
                <div class="button-1" onclick="makeAppointment()" style="cursor: pointer">Take an appointment</div>
                </div> 
              </div>
                `
                
                select_doc.innerHTML=appointDoc;
    
    
            })
    }


    function func1(){
        const s1=document.getElementById('s1');
        const shift1=document.getElementById('shift1');
        const shift2=document.getElementById('shift2');
        selectonetext=s1.innerText;
        selecttwotext=null;
        shift1.style.color="white";
        shift1.style.backgroundColor="#2b1664";
        shift2.style.backgroundColor="white";
        shift2.style.color="#2b1664";
        console.log(selectonetext,selecttwotext);
    }
    
    function func2() {  
        const s2=document.getElementById('s2');
        const shift1=document.getElementById('shift1');
        const shift2=document.getElementById('shift2');
        selecttwotext=s2.innerText;
        selectonetext=null;
        shift2.style.color="white";
        shift2.style.backgroundColor="#2b1664";
        shift1.style.backgroundColor="white";
        shift1.style.color="#2b1664";
        console.log(selectonetext,selecttwotext);
    }

    function makeAppointment(){
        console.log("I am clicked");
        let select;
        const stime=document.getElementById("stime").value;
        if(selectonetext===null){
            select=selecttwotext;
        }
        else{
            select=selectonetext;
        }
        console.log(select);
        ;
        fetch(`http://localhost:6204/addappointment/${email}&${roll}&${doctorname}&${mailid}&${stime}&${select}&false`,
        {method:'POST',})
        .then(res=>res.json())
        .then(result=>{
            console.log('inserted successfully');
            
        })
        location.reload();
    
    }