import React, { useEffect, useState } from 'react'
import './login.css'


import axios from 'axios';

export default function Login() {
const [disabled,setdisabled]=useState(true);
const [number,setnumber]=useState('');
const [colour,setcolour]=useState('#f3be9a')


const [backenddata,setdata]=useState(null);

const [one,setone]=useState(0);
const [two,settwo]=useState(0);
const [three,setthree]=useState(0);
const [four,setfour]=useState(0);
const[col,setcol]=useState('#c3f1c4');

let no=(one && two && three && four);

// console.log(no);
useEffect(() => {
    if(number.length==10)
    {
        setcolour('#fc6603');
        setdisabled(false);
    }
    else{
    
     setdisabled(true);
    setcolour('#f3be9a');
    }

    if(!no)
    {
setcol('#c3f1c4')
    }
    else{
setcol('#4caf50');
    }

}, [number])

useEffect(() => {
   

    if(!no)
    {
setcol('#c3f1c4')
    }
    else{
setcol('#4caf50');
    }

}, [no])


const handlesubmit=async(e)=>{

    e.preventDefault();
    const data={
        phone_number:number
    }
try
 {
    // console.log(data);
    const response=await axios.post('https://api.paymeindia.in/api/v2/authentication/phone_no_verify/',data);
    setdata(response.data);
    
} catch (error) {
    
}

}

const handlechange=(e)=>{

const phone=e.currentTarget.value;



let anycharacter=1;
for(let i=0;i<=9;i++)
{
    if(phone[phone.length-1]-'0'==i)
         anycharacter=0;
}

if(anycharacter) return ;

if(phone.length==1)
{
    if(phone[0]>='0' && phone[0]<='5') return;

}

let s="",ok=1;
for(let i=0;i<phone.length;i++)
{
    if(phone[i]=='0' && ok) continue;
    
    s+=phone[i];
    ok=0;
}

let y="";
for(let i=0;i<(s.length>10?10:s.length) ;i++) y+=s[i];
setnumber(y);




}

  return (
    <>
    <a class="site_logo" href="https://www.paymeindia.in/"><img alt="logo" fetchpriority="high" width="131" height="38" decoding="async" data-nimg="1"  src="https://web.paymeindia.in/logo.svg" /></a>
    <div id='x'>
    

  {!backenddata? (  <>
 <h3 >Welcome to World of <span style={{"color": "#fc6603","font-weight": "700"}}>Financial Happiness</span></h3>
 
 <form onSubmit={handlesubmit}>

 <div class="input-wrapper">

 <input  type="text" id='number2' placeholder='Enter your mobile number'  data-testid="inputtest"  onChange={handlechange}  value={number} />
 </div>


 
 <button  type ='submit' data-testid="input-continue" class="btn"   disabled={disabled} style={{'background-color':colour}} >Continue</button>
</form >
</>    
):(
    <>
 <div class="container" data-testid='otp'>
    <h1>OTP Verification</h1>
    <p>Please enter the 4-digit verification code we sent to your phone number.</p>
    <div class="otp-input">
      <input type="text" maxlength="1" onChange={(e)=>{setone(1-one)}} />
      <input type="text" maxlength="1" onChange={(e)=>{settwo(1-two)}}  />
      <input type="text" maxlength="1" onChange={(e)=>{setthree(1-three)}}  />
      <input type="text" maxlength="1" onChange={(e)=>{setfour(1-four)}}  />
    </div>
    <button disabled={!no} style={{'background-color':col}} >Verify</button>
  </div>

    </>
)
}
    </div>

    </>
  )
}
