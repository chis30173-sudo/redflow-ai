"use client";

import { useState } from "react";
import Link from "next/link";


export default function Home(){

const [mode,setMode]=useState("topic");

const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");

const [content,setContent]=useState("");

const [result,setResult]=useState("");

const [loading,setLoading]=useState(false);



async function generate(){

setLoading(true);

setResult("🚀 AI正在生成爆款内容...");


try{


const res = await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

mode,

industry,

target,

platform,

content

})

});


const data = await res.json();


setResult(
data.text || "生成失败"
);


}

catch(error){

setResult(
"请求失败，请稍后重试"
);

}


setLoading(false);


}



function copyText(){

navigator.clipboard.writeText(result);

alert("复制成功");


}



return (

<main

style={{

padding:"40px",

maxWidth:"1000px",

margin:"auto",

fontFamily:"Arial"

}}

>


<h1

style={{

fontSize:"42px"

}}

>

🚀 RedFlow AI

</h1>


<h2>

AI爆款内容增长助手

</h2>


<p>

3秒生成小红书爆款标题、正文、评论区和标签

</p>



<Link href="/templates">


<button

style={{

marginTop:"20px",

padding:"12px 25px",

fontSize:"18px",

background:"#ff2442",

color:"white",

borderRadius:"10px",

border:"none"

}}

>

🔥 爆款模板库

</button>


</Link>





<hr

style={{

margin:"40px 0"

}}

/>





<h2>

选择生成模式

</h2>


<button

onClick={()=>setMode("topic")}

>

🔥 爆款选题

</button>



<button

style={{marginLeft:"10px"}}

onClick={()=>setMode("article")}

>

✍️ 爆款图文

</button>



<button

style={{marginLeft:"10px"}}

onClick={()=>setMode("rewrite")}

>

🎯 对标同行

</button>






{

mode==="topic"

&&

<div>


<h3>

行业

</h3>


<input

value={industry}

onChange={e=>setIndustry(e.target.value)}

placeholder="例如：美妆、电商、健身"

/>



<h3>

目标用户

</h3>


<input

value={target}

onChange={e=>setTarget(e.target.value)}

placeholder="例如：18-35岁女性"

/>




<h3>

平台

</h3>


<input

value={platform}

onChange={e=>setPlatform(e.target.value)}

placeholder="例如：小红书"

/>


</div>


}





{

(mode==="article" || mode==="rewrite")

&&


<textarea

rows="8"

style={{

width:"100%",

marginTop:"20px"

}}

value={content}

onChange={e=>setContent(e.target.value)}

placeholder="输入你的主题或者同行爆款笔记"

/>


}





<button

onClick={generate}

style={{

marginTop:"30px",

padding:"15px 30px",

fontSize:"18px"

}}

>

🚀 开始生成

</button>







<h2

style={{

marginTop:"50px"

}}

>

📌 AI生成结果

</h2>



<div

style={{

background:"#f5f5f5",

padding:"25px",

borderRadius:"15px",

whiteSpace:"pre-wrap",

lineHeight:"1.8"

}}

>


{

loading

?

"AI思考中..."

:

result

}


</div>





{

result &&

<button

onClick={copyText}

style={{

marginTop:"15px"

}}

>

📋复制内容

</button>

}



</main>


)


}
