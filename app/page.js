"use client"

import { useState } from "react"

export default function Home(){

const [mode,setMode]=useState("product")
const [input,setInput]=useState("")
const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)


async function generate(){

if(!input){
alert("请输入内容")
return
}

setLoading(true)
setResult("")


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

setResult(data.result || data.error)


}catch(e){

setResult(e.message)

}


setLoading(false)

}



return (

<main
style={{
minHeight:"100vh",
background:"#0f172a",
color:"white",
padding:"40px"
}}
>


<div
style={{
maxWidth:"900px",
margin:"auto",
textAlign:"center"
}}
>


<h1
style={{
fontSize:"48px"
}}
>
🚀 RedFlow AI
</h1>


<p
style={{
fontSize:"22px"
}}
>
小红书商业增长AI助手
</p>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"20px",
marginTop:"40px"
}}
>


<button onClick={()=>setMode("blue")}>
🔥 蓝海商品发现
</button>


<button onClick={()=>setMode("content")}>
✍️ 爆款内容工厂
</button>


<button onClick={()=>setMode("analyze")}>
📊 爆款笔记拆解
</button>


<button onClick={()=>setMode("ip")}>
🚀 个人IP打造
</button>


</div>



<div
style={{
marginTop:"40px",
background:"#1e293b",
padding:"30px",
borderRadius:"20px"
}}
>


<textarea

placeholder="输入你的产品、行业、账号情况..."

value={input}

onChange={(e)=>setInput(e.target.value)}

style={{

width:"90%",
height:"120px",
padding:"15px",
fontSize:"18px"

}}

/>


<br/>


<button

onClick={generate}

style={{

marginTop:"20px",
padding:"15px 40px",
background:"#ff3366",
color:"white",
borderRadius:"30px"

}}

>

{
loading
?
"AI分析中..."
:
"🔥开始生成"
}

</button>


</div>




{
result &&

<div
style={{
marginTop:"40px",
background:"#1e293b",
padding:"30px",
borderRadius:"20px",
textAlign:"left",
whiteSpace:"pre-wrap"
}}
>

{result}

</div>

}



</div>

</main>

)

}
