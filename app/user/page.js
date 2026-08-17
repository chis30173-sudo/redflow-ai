"use client"


import {useEffect,useState} from "react"



export default function UserPage(){


const [user,setUser]=useState(null)



useEffect(()=>{


const data=localStorage.getItem("user")


if(data){

setUser(JSON.parse(data))

}


},[])



function logout(){


localStorage.removeItem("user")


window.location.href="/"


}



if(!user){

return(

<div style={{
padding:"50px",
color:"#fff"
}}>

<h2>
请先登录
</h2>

</div>

)

}



return(


<div
style={{

minHeight:"100vh",

background:"#020617",

color:"#fff",

padding:"40px"

}}
>


<h1>
👤 用户中心
</h1>



<div
style={{

background:"#1e293b",

padding:"25px",

borderRadius:"20px",

marginTop:"30px"

}}
>


<h2>
账号信息
</h2>


<p>
📧 邮箱：
{user.email}
</p>



<p>
⭐ 等级：
{user.level || "free"}
</p>



<p>
🔥 剩余次数：
{user.count || 3}
次
</p>


</div>





<div
style={{

marginTop:"30px"

}}
>


<button

onClick={()=>{

window.location.href="/history"

}}

style={{

padding:"15px 25px",

borderRadius:"15px",

background:"#ec4899",

color:"#fff",

border:"none",

marginRight:"15px"

}}

>

📚 查看历史记录

</button>




<button

onClick={logout}

style={{

padding:"15px 25px",

borderRadius:"15px",

background:"#334155",

color:"#fff",

border:"none"

}}

>

退出登录

</button>



</div>



</div>


)


}
