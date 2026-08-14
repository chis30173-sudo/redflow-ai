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



async function generate(){

setResult("🚀 AI 正在分析并生成内容...");


const res = await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`

你是 RedFlow AI，
一个专业的新媒体内容增长专家。


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



请根据功能输出：



如果功能是 topic：

生成10个爆款内容选题。

每个包含：

1. 标题
2. 爆款原因
3. 内容方向



如果功能是 xiaohongshu：

生成：

1. 小红书爆款标题
2. 正文
3. 5个热门标签
4. 评论区互动方式



如果功能是 video：

生成：

1. 前3秒黄金开场
2. 视频剧情
3. 口播稿
4. 结尾转化



如果功能是 account：

生成：

1. 账号名称
2. 账号简介
3. 内容定位
4. 30天发布计划



要求：

符合真实商业场景，
不要泛泛而谈。


`

})

});


const data=await res.json();


setResult(
data.text ||
data.result ||
"生成失败"
);


}



return (

<main style={{
padding:"40px",
fontFamily:"Arial"
}}>


<h1>
🚀 RedFlow AI
</h1>


<p>
AI 爆款内容增长助手
</p>


<div style={{
marginTop:"20px"
}}>


<button onClick={()=>setMode("topic")}>
🔥 爆款选题
</button>


<button onClick={()=>setMode("xiaohongshu")}>
✍️ 小红书笔记
</button>


<button onClick={()=>setMode("video")}>
🎬 短视频脚本
</button>


<button onClick={()=>setMode("account")}>
📈 账号定位
</button>


</div>
{mode==="topic" && (

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

placeholder="例如：美妆、电商、教育"
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

placeholder="小红书 / 抖音 / TikTok"

/>

</>

)}





{mode==="xiaohongshu" && (

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

placeholder="例如：年轻女性"

/>


<p>卖点</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

placeholder="例如：补水、美白"

/>


</>

)}





{mode==="video" && (

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

placeholder="剧情 / 搞笑 / 专业"

/>


</>

)}





{mode==="account" && (

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

placeholder="例如：宝妈、创业者、学生"

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

placeholder="例如：AI、电商、美妆"

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

placeholder="例如：创业人群"

/>


</>

)}





<br/><br/>


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
marginTop:"30px"
}}
>

<h2>
📌 AI生成结果
</h2>


<div
style={{
background:"#f7f7f7",
padding:"20px",
borderRadius:"12px",
whiteSpace:"pre-wrap",
lineHeight:"1.8"
}}
>

{result || "等待生成内容..."}


</div>


<button

onClick={()=>{

navigator.clipboard.writeText(result)

alert("复制成功")

}}

style={{

marginTop:"15px",

padding:"10px 20px"

}}

>

📋 复制内容

</button>


</div>



</main>


);

}
