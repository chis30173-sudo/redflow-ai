"use client";

import { useState } from "react";

export default function AiTopicPage() {

  const [industry,setIndustry] = useState("");
  const [target,setTarget] = useState("");
  const [platform,setPlatform] = useState("");

  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);


  async function generate(){

    setLoading(true);
    setResult("AI 正在分析爆款方向...");


    const res = await fetch("/api/ai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({

        prompt:`

你是 RedFlow AI 爆款内容专家。

请根据以下信息生成10个内容选题：

行业：
${industry}

目标用户：
${target}

平台：
${platform}


每个选题必须包含：

1. 标题
2. 爆款原因
3. 内容方向

要求：
符合真实平台用户兴趣。
`

      })
    });


    const data = await res.json();

    setResult(
      data.text || "生成失败，请重试"
    );

    setLoading(false);

  }



  function copy(){

    navigator.clipboard.writeText(result);

    alert("已复制");

  }



return (

<div style={{
minHeight:"100vh",
background:"#f7f8fc",
padding:"50px"
}}>


<div style={{
maxWidth:"900px",
margin:"auto"
}}>


<h1 style={{
fontSize:"42px",
fontWeight:"800"
}}>
🚀 RedFlow AI
</h1>


<p style={{
color:"#666",
fontSize:"18px"
}}>
AI 爆款内容选题生成助手
</p>



<div style={{
background:"white",
padding:"30px",
borderRadius:"20px",
marginTop:"30px",
boxShadow:"0 10px 30px #ddd"
}}>


<h2>
生成你的爆款选题
</h2>


<input
style={inputStyle}
placeholder="行业，例如：美妆、电商、教育"
value={industry}
onChange={
e=>setIndustry(e.target.value)
}
/>


<input
style={inputStyle}
placeholder="目标用户，例如：18岁女性"
value={target}
onChange={
e=>setTarget(e.target.value)
}
/>


<input
style={inputStyle}
placeholder="平台，例如：小红书、抖音"
value={platform}
onChange={
e=>setPlatform(e.target.value)
}
/>



<button
style={{
width:"100%",
padding:"15px",
borderRadius:"12px",
border:"none",
background:"#111",
color:"white",
fontSize:"18px",
cursor:"pointer"
}}

onClick={generate}

>

{
loading?
"AI生成中..."
:
"🚀 生成爆款选题"
}


</button>


</div>




{
result &&

<div style={{
background:"white",
marginTop:"30px",
padding:"30px",
borderRadius:"20px"
}}>


<div style={{
display:"flex",
justifyContent:"space-between"
}}>

<h2>
AI结果
</h2>


<button
onClick={copy}
>
复制
</button>


</div>


<pre style={{
whiteSpace:"pre-wrap",
lineHeight:"1.8"
}}>
{result}
</pre>


</div>

}



</div>

</div>

)

}


const inputStyle={

width:"100%",
padding:"14px",
marginBottom:"15px",
borderRadius:"10px",
border:"1px solid #ddd",
fontSize:"16px"

};
