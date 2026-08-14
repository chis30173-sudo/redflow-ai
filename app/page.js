"use client";

import { useState } from "react";


export default function AiTopicPage(){

const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");

const [result,setResult]=useState("");
const [loading,setLoading]=useState(false);



async function generate(){


setLoading(true);

setResult("AI 正在生成爆款内容...");


const res = await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`

你是 RedFlow AI 内容增长专家。

请生成10个爆款内容选题。

行业：
${industry}

目标用户：
${target}

平台：
${platform}


每个选题包含：

🔥 标题

为什么爆

内容结构


`

})

});



const data = await res.json();


setResult(
data.text || "生成失败"
);


setLoading(false);


}



return (

<div className="page">


<h1>
🚀 RedFlow AI
</h1>


<p className="desc">
AI 内容增长助手
</p>



<div className="tools">


<div className="tool active">
🔥
<br/>
爆款选题
</div>


<div className="tool">
✍️
<br/>
小红书笔记
</div>


<div className="tool">
🎬
<br/>
短视频脚本
</div>


<div className="tool">
📈
<br/>
账号定位
</div>


</div>





<div className="card">


<h2>
🔥 生成爆款选题
</h2>



<input

placeholder="行业，例如：美妆、电商"

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

/>


<input

placeholder="目标用户，例如：18岁女性"

value={target}

onChange={
e=>setTarget(e.target.value)
}

/>


<input

placeholder="平台，例如：小红书"

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

/>



<button onClick={generate}>

{
loading?
"AI生成中..."
:
"🚀 开始生成"
}

</button>



</div>





{
result &&

<div className="result">


<h2>
AI结果
</h2>


<button
onClick={()=>{
navigator.clipboard.writeText(result)
alert("复制成功")
}}
>
复制内容
</button>


<pre>
{result}
</pre>


</div>


}




<style jsx>{`


.page{

min-height:100vh;

background:#f7f8fc;

padding:50px;

font-family:sans-serif;

}



h1{

font-size:42px;

}



.desc{

color:#666;

font-size:20px;

}



.tools{

display:flex;

gap:20px;

margin:30px 0;

}



.tool{

background:white;

padding:20px;

border-radius:20px;

width:120px;

text-align:center;

box-shadow:0 5px 20px #ddd;

cursor:pointer;

}



.active{

background:#111;

color:white;

}



.card,
.result{

background:white;

padding:30px;

border-radius:20px;

margin-top:30px;

max-width:900px;

}



input{

width:100%;

padding:15px;

margin:10px 0;

border-radius:10px;

border:1px solid #ddd;

font-size:16px;

}



button{

padding:12px 25px;

border:none;

border-radius:10px;

background:#111;

color:white;

cursor:pointer;

}



pre{

white-space:pre-wrap;

line-height:1.8;

margin-top:20px;

}



`}</style>



</div>


)


}
