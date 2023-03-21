function logincheck()
{
    const hand=document.getElementById("handle").value;
    const pass=document.getElementById("password").value;
    let name, passw;
    fetch("http://localhost:6204/logininfo")
    .then(res=>res.json())
    .then((data)=>{
       
       name=data[0].UserName;
       passw=data[0].Password;
       console.log(name,passw);
       if(hand===name&&passw===pass)
       {
        location.href="../AdminMenu/AdminMenu.html";
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