console.log('I am here');
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('docmail');
const stumail=urlParams.get('stumail');
const pres=document.getElementById('pres');
const presform=document.getElementById('pres-from');
presHTML="";

presHTML=presHTML+
`       
            <div class="row"> 
                <div class="col-md-6">
                    <input type="text" class="form-control border-bottom" name="medicine" placeholder="Medicine Name">
                </div>
                <div class="col-md-6">
                    <input type="number" class="form-control border-bottom" name="dosage"  placeholder="To continue in Days(i.e. 15) ">
                </div>
            </div>

            <div class="mt-3"> 
                    <input type="text" class="form-control border-bottom" name="doseperday" placeholder="e.g. 1+0+1">
            </div>       
            <hr>

`
pres.innerHTML=presHTML;

function addmore()
{
    presHTML=presHTML+
`       
       
            <div class="row mt-3"> 
                <div class="col-md-6">
                    <input type="text" class="form-control border-bottom" name="medicine" placeholder="Medicine Name">
                </div>
                <div class="col-md-6">
                    <input type="number" class="form-control border-bottom" name="dosage"  placeholder="To continue in Days(i.e. 15) ">
                </div>
            </div>

            <div class="mt-3"> 
                    <input type="text" class="form-control border-bottom" name="doseperday" placeholder="e.g. 1+0+1">
                </div>
                               
            </div>      
            <hr>                  

`
pres.innerHTML=presHTML;

}

function prescription(){
    presform.action=`http://localhost:6204/addprescription/${stumail}&${email}`;
    presform.method=`POST`;
    presform.target='_blank';
}