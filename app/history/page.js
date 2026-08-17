"use client"

import {useEffect,useState} from "react"



export default function History(){


const [records,setRecords]=useState([])



// 加载历史

useEffect(()=>{


const data=localStorage.getItem("history")


if(data){

setRecords(JSON.parse(data))

}


},[])





// 删除单条

function remove(index){


const list=[...records]


list.splice(index,1)


setRecords(list)


localStorage.setItem(

"history",

JSON.stringify(list)

)


}





// 清空

function clearAll(){


localStorage.removeItem("history")


setRecords([])


}

return (

<div
style={{
minHeight:"100vh",
background:"#020617",
padding:"40px",
color:"#fff"
}}
>

<h1>
📚 RedFlow AI 历史记录
</h1>


<div
style={{
marginTop:"20px",
display:"flex",
gap:"15px"
}}
>


<button
onClick={()=>window.location.href="/"}
style={{
padding:"12px 20px",
borderRadius:"10px",
border:"none",
cursor:"pointer"
}}
>
返回首页
</button>



<button
onClick={clearAll}
style={{
padding:"12px 20px",
borderRadius:"10px",
border:"none",
background:"#ef4444",
color:"#fff",
cursor:"pointer"
}}
>
清空历史
</button>


</div>



{
records.length===0 ?


(
<div
style={{
marginTop:"40px",
background:"#1e293b",
padding:"30px",
borderRadius:"20px"
}}
>

暂无生成记录

</div>
)


:


(
<div
style={{
marginTop:"30px",
display:"grid",
gap:"20px"
}}
>


{
records.map((item,index)=>(


<div
key={index}
style={{
background:"#1e293b",
padding:"25px",
borderRadius:"20px"
}}
>


<h2>
🔥 {item.input}
</h2>


<p>
模式：
{item.mode}
</p>


<p>
时间：
{item.time}
</p>



<button

onClick={()=>{

alert(
JSON.stringify(
item.result,
null,
2
)
)

}}

style={{
marginTop:"15px",
padding:"10px 18px",
borderRadius:"10px",
border:"none",
cursor:"pointer"
}}

>

查看生成结果

</button>


</div>


))

}


</div>

)

}



</div>

)

}




