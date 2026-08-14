"use client";

import { useState } from "react";


export default function Home(){

  const [mode,setMode]=useState("topic");

  const [industry,setIndustry]=useState("");
  const [target,setTarget]=useState("");
  const [platform,setPlatform]=useState("");

  const [content,setContent]=useState("");

  const [result,setResult]=useState("");


  async function generate(){


    setResult("AI正在分析生成...");


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
      data.text || 
      "生成失败，请检查API"
    );


  }




  return (

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
        onClick={()=>setMode("article")}
        style={{marginLeft:"10px"}}
        >
        ✍️ 爆款图文
        </button>



        <button
        onClick={()=>setMode("rewrite")}
        style={{marginLeft:"10px"}}
        >
        🎯 对标同行
        </button>


      </div>




{
mode==="topic" &&

<div>


<h2>
🔥 爆款选题生成
</h2>


<p>行业</p>

<input

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

placeholder="例如：美妆、电商、教育"

/>



<p>目标用户</p>

<input

value={target}

onChange={
e=>setTarget(e.target.value)
}

placeholder="例如：18-30岁女生"

/>



<p>平台</p>

<input

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

placeholder="小红书 / 抖音"

/>


</div>

}





{
mode==="article" &&

<div>


<h2>
✍️ 爆款图文生成
</h2>


<p>
输入主题
</p>


<textarea

rows="6"

value={content}

onChange={
e=>setContent(e.target.value)
}

placeholder="例如：大学生平价护肤推荐"

/>



</div>

}





{
mode==="rewrite" &&

<div>


<h2>
🎯 一键对标同行
</h2>


<p>
复制同行爆款内容
</p>


<textarea

rows="10"

value={content}

onChange={
e=>setContent(e.target.value)
}

placeholder="粘贴同行小红书爆款笔记"

/>



</div>

}





<br/>


<button
onClick={generate}
style={{
marginTop:"20px"
}}
>

🚀 开始生成

</button>




<h2
style={{
marginTop:"40px"
}}
>

📌 AI生成结果

</h2>



<div
style={{

whiteSpace:"pre-wrap",

background:"#f7f7f7",

padding:"20px",

borderRadius:"10px"

}}
>


{result}


</div>



    </main>

  );

}
