console.log('I am connected');
function loginCheck()
{
    console.log("i am inside of the func");
    const mail=document.getElementById("email").value;
    const pass=document.getElementById("password").value;
    console.log(mail,pass);
    let email, passw;
    
    fetch(`http://localhost:6204/stafflist/${mail}`)
    .then(res=>res.json())
    .then((data)=>{       
       email=data[0].email;
       passw=data[0].pass;
       console.log(email,passw);
       if(mail===email&&passw===pass)
       {
        location.href=`../StaffLoginMenu/StaffLoginMenu.html?email=${mail}`;
        console.log('Successfully Logined');
       }
       else{
        const error=document.getElementById('loginerror');
        const para=document.createElement('p');                
        para.innerHTML=`Sorry, Try again with right credentials!`;
        error.appendChild(para);
        setTimeout(()=> { 
            error.style.display = 'none';
        }, 3000);
}
    })
}