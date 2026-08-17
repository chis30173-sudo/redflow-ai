"use client"

import {useState} from "react"


export default function Login(){


const [email,setEmail]=useState("")



function login(){


if(!email){

alert("请输入邮箱")

return

}



const user={

email:email,

level:"free",

count:5,

createdAt:new Date().toISOString()

}



localStorage.setItem(

"user",

JSON.stringify(user)

)



alert("登录成功")


// 返回首页

window.location.href="/"


}




return (

<div

style={{

minHeight:"100vh",

background:"#020617",

color:"#fff",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>


<div

style={{

background:"#1e293b",

padding:"40px",

borderRadius:"20px",

width:"400px",

boxShadow:"0 0 30px rgba(0,0,0,.3)"

}}

>


<h1

style={{

fontSize:"32px",

marginBottom:"10px"

}}

>

🔥 RedFlow AI

</h1>


<h2>

用户登录

</h2>


<p

style={{

color:"#94a3b8"

}}

>

免费体验AI爆款助手

</p>



<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="请输入邮箱"

style={{

width:"100%",

padding:"15px",

marginTop:"20px",

borderRadius:"10px",

fontSize:"16px",

border:"none"

}}

/>



<button

onClick={login}

style={{

width:"100%",

marginTop:"20px",

padding:"15px",

borderRadius:"30px",

background:"#ec4899",

color:"#fff",

border:"none",

fontSize:"18px",

cursor:"pointer"

}}

>

登录体验

</button>



</div>


</div>


)

}
