"use client";

import { useState } from "react";


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

setResult("🚀 AI正在分析，请稍等...");


try{


const res=await fetch("/api/ai",{

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



const data=await res.json();


setResult(
data.text ||
"生成失败"
);



}

catch(e){

setResult(
"请求失败，请检查网络"
);


}


setLoading(false);


}





function copyText(){

navigator.clipboard.writeText(result);

alert("复制成功");


}




return(

<main

style={{

padding:"40px",

maxWidth:"900px"

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
margin:"30px 0"
}}
>


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


</div>






{
mode==="topic" &&

<section>

<h2>
🔥 爆款选题生成
</h2>


<p>行业</p>

<input

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

/>


<p>目标用户</p>


<input

value={target}

onChange={
e=>setTarget(e.target.value)
}

/>



<p>平台</p>


<input

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

/>


</section>

}





{
(mode==="article" ||
mode==="rewrite")

&&

<section>

<h2>

{
mode==="article"
?
"✍️ 爆款图文生成"
:
"🎯 一键对标同行"
}


</h2>


<textarea

rows="10"

value={content}

onChange={
e=>setContent(e.target.value)
}


placeholder={
mode==="article"
?
"输入你的主题，例如：大学生护肤"
:
"粘贴同行爆款笔记"
}

/>


</section>


}






<button

onClick={generate}

style={{

marginTop:"25px",

fontSize:"16px"

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

background:"#f7f7f7",

padding:"25px",

borderRadius:"15px",

lineHeight:"1.8",

minHeight:"150px"

}}

>


{
loading

?

"AI正在思考..."

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

📋 复制全部内容

</button>


}



</main>


)

}
