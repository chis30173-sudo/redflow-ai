"use client";

import { useState } from "react";

export default function Home() {

  const [mode, setMode] = useState("topic");

  const [industry,setIndustry] = useState("");
  const [target,setTarget] = useState("");
  const [platform,setPlatform] = useState("");

  const [result,setResult] = useState("");


  async function generate(){

    setResult("AI 正在生成...");


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


请根据以上信息生成内容。


如果是topic：
生成10个爆款选题。

如果是xiaohongshu：
生成小红书标题、正文、标签。

如果是video：
生成短视频脚本，包括开头3秒、正文、结尾。

如果是account：
生成账号定位、简介、内容方向。


要求：
详细、有商业价值。

`

      })
    });


    const data = await res.json();


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
marginTop:"30px"
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



<hr/>


<h2>

{
mode==="topic" 
?"生成爆款选题"
:
mode==="xiaohongshu"
?"生成小红书笔记"
:
mode==="video"
?"生成短视频脚本"
:
"生成账号定位"
}

</h2>



<p>
行业
</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

/>



<p>
目标用户
</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={target}

onChange={
e=>setTarget(e.target.value)
}

/>



<p>
平台
</p>

<input

style={{
width:"400px",
padding:"10px"
}}

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

/>



<br/><br/>


<button
onClick={generate}
style={{
padding:"10px 20px"
}}
>

🚀 开始生成

</button>



<pre

style={{
marginTop:"30px",
whiteSpace:"pre-wrap",
background:"#f5f5f5",
padding:"20px"
}}

>

{result}

</pre>



</main>

  );

}
