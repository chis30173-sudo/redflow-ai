"use client";

import { useState } from "react";


export default function TextGeneratePage(){

const [topic,setTopic]=useState("");
const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");

const [result,setResult]=useState("");



async function generate(){


setResult("AI正在生成爆款图文...");


const res = await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

type:"copywriting",

topic,

industry,

target,

platform

})


});


const data=await res.json();


setResult(
data.text ||
JSON.stringify(data,null,2)
);


}



return (

<main style={{
padding:"40px",
maxWidth:"900px"
}}>


<h1>
✍️ 爆款图文生成
</h1>


<p>
AI帮你生成小红书爆款笔记
</p>



<p>主题</p>

<input

value={topic}

onChange={(e)=>setTopic(e.target.value)}

placeholder="例如：学生党护肤避坑"

style={{
width:"100%",
padding:"12px"
}}

/>



<p>行业</p>

<input

value={industry}

onChange={(e)=>setIndustry(e.target.value)}

placeholder="例如：美妆、电商、教育"

style={{
width:"100%",
padding:"12px"
}}

/>



<p>目标用户</p>

<input

value={target}

onChange={(e)=>setTarget(e.target.value)}

placeholder="例如：18岁女生"

style={{
width:"100%",
padding:"12px"
}}

/>



<p>平台</p>

<input

value={platform}

onChange={(e)=>setPlatform(e.target.value)}

placeholder="小红书"

style={{
width:"100%",
padding:"12px"
}}

/>



<button

onClick={generate}

style={{
marginTop:"20px",
padding:"12px 25px"
}}

>

🚀生成爆款图文

</button>




<h2 style={{
marginTop:"40px"
}}>
📌 AI生成结果
</h2>



<pre

style={{

whiteSpace:"pre-wrap",

background:"#f5f5f5",

padding:"20px"

}}

>

{result}

</pre>



</main>

)

}
