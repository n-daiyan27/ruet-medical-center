let logout= document.getElementById('logout');

logout.style.cursor = 'pointer';
logout.addEventListener('click', ()=>{

     var Backlen=history.length;   
     history.go(-Backlen);   
     window.location.href="../HomePage/index.html";
    console.log(Backlen);
})

let doctorHTML="";
let list=document.getElementById('list');
fetch('http://localhost:6204/doctorlist')
.then(res=>res.json())
.then(data=>{
    data.forEach(user => {
        doctorHTML=doctorHTML+`
        <div class="row delete mb-3">
            <div class="col-md-10 p-2">
            <span><b>ID: </b> ${user._id}</span>
            <br>
            <span><b>Name: </b>${user.name}</span>
            </div>
            <div class="col-md-2 bg-danger p-0"> 
            <button onclick="deletedoctor('${user._id}')" class="del-btn btn btn-danger">Remove</button>
            </div>
        </div>
        `
        list.innerHTML=doctorHTML;
 
    });
})


//delete doctor

function deletedoctor(id){
    fetch(`http://localhost:6204/deletedoctor/${id}`,{method:'DELETE'})
    .then(res=>res.json())
    .then(result=>{
        console.log('deleted successfully');
    })
    location.reload();
}


let staffHTML="";
let stafflist=document.getElementById('stafflist');
fetch('http://localhost:6204/stafflist')
.then(res=>res.json())
.then(data=>{
    data.forEach(user=>{
        console.log(data)
        staffHTML=staffHTML+`
        <div class="row delete mb-3">
            <div class="col-md-10 p-2">
              <span><b>ID: </b>${user._id}</span>
              <br>
              <span><b>Name: </b>${user.name}</span>
            </div>
            <div class="col-md-2 bg-danger p-0"> 
              <button onclick="deletestaff('${user._id}')" class="del-btn btn btn-danger">Remove</button>
            </div>
        </div>
        `
        stafflist.innerHTML=staffHTML;
    })
    console.log(data);
})

function deletestaff(staffid)
{
    console.log(staffid)
    fetch(`http://localhost:6204/deletestaff/${staffid}`,{method:'DELETE'})
    .then(res=>res.json())
    .then(result=>{
        console.log('deleted successfully');
    })
    location.reload();
}