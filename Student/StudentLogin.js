console.log("i am in")

function logincheck()
{
    const mail=document.getElementById("email").value;
    const pass=document.getElementById("password").value;
    let name, passw;
    fetch(`http://localhost:6204/studentlist/${mail}`)
    .then(res=>res.json())
    .then((data)=>{       
       name=data[0].email;
       passw=data[0].password;
       console.log(name,passw);
       if(mail===name&&passw===pass)
       {
        location.href=`../StudentsLoginMenu/StudentsLoginMenu.html?email=${mail}`;
        console.log('Successfully Logined');
       }
       else
       {
        const error=document.getElementById('loginerror');
            const para=document.createElement('p');
            para.innerHTML=`Sorry, Try again with right credentials!`;
            error.appendChild(para);
       }
    })
}