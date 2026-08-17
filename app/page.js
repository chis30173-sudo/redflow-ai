"use client"

import { useState, useEffect } from "react"

import FeatureCard from "./components/FeatureCard"
import ResultCard from "./components/ResultCard"



export default function Home(){


const [mode,setMode]=useState("batch")

const [input,setInput]=useState("")

const [result,setResult]=useState(null)

const [loading,setLoading]=useState(false)

const [user,setUser]=useState(null)



// =====================
// 读取用户
// =====================

useEffect(()=>{


const data=localStorage.getItem("user")


if(data){

setUser(JSON.parse(data))

}


},[])




// =====================
// 退出
// =====================

function logout(){


localStorage.removeItem("user")

setUser(null)


}






const features=[


{
id:"batch",
title:"🔥 100条爆款",
desc:"批量生成爆款内容方案"
},


{
id:"blue",
title:"🌊 蓝海选品",
desc:"寻找低竞争高利润产品"
},


{
id:"analyze",
title:"📊 爆款对标",
desc:"分析竞品打法"
},


{
id:"ip",
title:"👤 个人IP打造",
desc:"规划账号成长路线"
},


{
id:"image",
title:"🖼️ 爆款图文",
desc:"生成小红书图文方案"
},


{
id:"trend",
title:"📈 潮玩趋势",
desc:"发现市场机会"
}


]







async function generate(){



// ===== 登录检查 =====

if(!user){


alert("请先登录体验")


window.location.href="/login"


return


}





// ===== 次数检查 =====

if(user.count<=0){


alert("免费体验次数已用完")


return


}




// ===== 输入检查 =====

if(!input){


alert("请输入产品或方向")


return


}




// ===== 扣次数 =====


const newUser={

...user,

count:user.count-1

}



setUser(newUser)



localStorage.setItem(

"user",

JSON.stringify(newUser)

)





setLoading(true)

setResult(null)




try{


const res=await fetch("/api/generate",{


method:"POST",


headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


mode,

input


})



})





const data=await res.json()


setResult(data.result)


// ======================
// 保存历史记录
// ======================

const oldHistory = JSON.parse(

localStorage.getItem("history") || "[]"

)



const newRecord = {


mode: mode,


input: input,


result: data.result,


time: new Date().toLocaleString()



}



oldHistory.unshift(newRecord)



// 最多保存50条

localStorage.setItem(

"history",

JSON.stringify(oldHistory.slice(0,50))

)



}



catch(error){



setResult({


title:"生成失败",


content:error.message,


tags:"",


score:{}



})



}




setLoading(false)



}









return (



<div


style={{


minHeight:"100vh",

background:"#020617",

padding:"40px",

color:"#fff",

position:"relative"


}}



>
{/* 用户入口 */}

<div
style={{
display:"flex",
justifyContent:"flex-end",
gap:"15px",
marginBottom:"20px"
}}
>


{
user ? (

<>

<button

onClick={()=>{

window.location.href="/user"

}}

style={{

padding:"10px 18px",

borderRadius:"12px",

background:"#ec4899",

color:"#fff",

border:"none",

cursor:"pointer"

}}

>

👤 用户中心

</button>



<button

onClick={()=>{

window.location.href="/history"

}}

style={{

padding:"10px 18px",

borderRadius:"12px",

background:"#334155",

color:"#fff",

border:"none",

cursor:"pointer"

}}

>

📚 历史记录

</button>

</>


):(


<button

onClick={()=>{

window.location.href="/login"

}}

style={{

padding:"10px 18px",

borderRadius:"12px",

background:"#ec4899",

color:"#fff",

border:"none",

cursor:"pointer"

}}

>

登录

</button>


)

}


</div>





{/* 用户区域 */}


<div


style={{


position:"absolute",

right:"40px",

top:"30px"


}}



>


{


user ?



<div>


👤 {user.email}


<br/>


免费次数：

{user.count}/5



<br/>



<button


onClick={logout}



style={{


marginTop:"10px"


}}


>


退出


</button>


</div>



:



<button


onClick={()=>window.location.href="/login"}


>


🔐 登录


</button>



}



</div>








<h1


style={{


textAlign:"center",

fontSize:"36px"


}}



>


🔥 RedFlow AI


</h1>





<p


style={{


textAlign:"center",

color:"#94a3b8"


}}


>


小红书AI增长助手 · 潮玩商业分析


</p>








<div


style={{


display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:"20px",

marginTop:"40px"


}}



>


{


features.map(item=>(



<div


key={item.id}


onClick={()=>setMode(item.id)}



style={{


cursor:"pointer"


}}



>


<FeatureCard


title={item.title}


desc={item.desc}


/>



</div>



))


}



</div>








<div


style={{


marginTop:"40px",

background:"#1e293b",

padding:"25px",

borderRadius:"20px"


}}



>



<h2>


当前模式：

{mode}


</h2>





<textarea



value={input}



onChange={(e)=>setInput(e.target.value)}



placeholder="例如：拉布布、娃衣、明星周边"



style={{


width:"100%",


height:"120px",


padding:"15px",


borderRadius:"12px",


fontSize:"18px"


}}



/>





<button



onClick={generate}



style={{


marginTop:"20px",


padding:"15px 40px",


borderRadius:"30px",


background:"#ec4899",


color:"#fff",


border:"none",


fontSize:"18px",


cursor:"pointer"


}}



>


{


loading ?


"AI分析中..."


:


"🔥 开始生成"



}



</button>



</div>









{


result &&


<ResultCard result={result}/>



}





</div>



)



}
