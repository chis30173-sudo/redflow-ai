"use client";

import { useState } from "react";


export default function Home(){


const [mode,setMode]=useState("topic");


const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");

const [product,setProduct]=useState("");
const [style,setStyle]=useState("");
const [identity,setIdentity]=useState("");


const [result,setResult]=useState("");

const [cards,setCards]=useState([]);



async function generate(){


setResult("🚀 AI正在生成...");
setCards([]);



const res = await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`

你是RedFlow AI内容增长专家。

当前功能：
${mode}


行业：
${industry}

目标用户：
${target}

平台：
${platform}

产品：
${product}

风格：
${style}

个人身份：
${identity}



请严格返回JSON数组：

[
 {
 "title":"",
 "reason":"",
 "direction":""
 }
]


生成5条内容。


`

})

});



const data = await res.json();



const text =
data.text ||
data.result ||
"";



try{


const json =
JSON.parse(text);


setCards(json);


setResult("");


}

catch{


setResult(text);


}


}



return (

<main
style={{
padding:"40px",
fontFamily:"Arial"
}}
>


<h1>
🚀 RedFlow AI
</h1>


<p>
AI爆款内容增长助手
</p>



<div
style={{
marginBottom:"30px"
}}
>


<button onClick={()=>setMode("topic")}>
🔥爆款选题
</button>


<button onClick={()=>setMode("xiaohongshu")}>
✍️小红书笔记
</button>


<button onClick={()=>setMode("video")}>
🎬短视频脚本
</button>


<button onClick={()=>setMode("account")}>
📈账号定位
</button>


</div>




{
mode==="topic" &&

<>

<h2>
🔥 爆款选题生成
</h2>


<p>行业</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

placeholder="例如：美妆、电商"

/>



<p>目标用户</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={target}

onChange={
e=>setTarget(e.target.value)
}

placeholder="例如：18-30岁女性"

/>



<p>平台</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

placeholder="小红书"

/>


</>

}




{
mode==="xiaohongshu" &&

<>

<h2>
✍️ 小红书笔记生成
</h2>


<p>产品</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={product}

onChange={
e=>setProduct(e.target.value)
}

placeholder="例如：护肤品"

/>


<p>用户</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={target}

onChange={
e=>setTarget(e.target.value)
}

placeholder="年轻女性"

/>


</>

}




{
mode==="video" &&

<>

<h2>
🎬 短视频脚本生成
</h2>


<p>产品</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={product}

onChange={
e=>setProduct(e.target.value)
}

placeholder="输入产品"

/>



<p>视频风格</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={style}

onChange={
e=>setStyle(e.target.value)
}

placeholder="剧情/搞笑/专业"

/>


</>

}




{
mode==="account" &&

<>

<h2>
📈 账号定位生成
</h2>


<p>个人身份</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={identity}

onChange={
e=>setIdentity(e.target.value)
}

placeholder="创业者/学生/宝妈"

/>


<p>领域</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

placeholder="AI/美妆/电商"

/>


<p>目标粉丝</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={target}

onChange={
e=>setTarget(e.target.value)
}

placeholder="创业人群"

/>


</>

}





<br/>


<button

onClick={generate}

style={{
padding:"12px 25px",
fontSize:"16px"
}}

>

🚀 开始生成

</button>




<div
style={{
marginTop:"40px"
}}
>


<h2>
📌 AI生成结果
</h2>




{

cards.length>0 ?


cards.map((item,index)=>(


<div

key={index}

style={{

background:"#f7f7f7",

padding:"20px",

borderRadius:"15px",

marginBottom:"20px"

}}

>


<h3>
🔥 爆款选题 #{index+1}
</h3>


<p>
<b>标题：</b>
{item.title}
</p>


<p>
<b>爆款原因：</b>
{item.reason}
</p>


<p>
<b>内容方向：</b>
{item.direction}
</p>



<button

onClick={()=>{

navigator.clipboard.writeText(

`
${item.title}

${item.reason}

${item.direction}

`

);

alert("复制成功");

}}

>

📋复制

</button>


</div>


))


:

(

<div>

{result || "等待生成内容..."}

</div>

)


}



</div>



</main>

);


}
