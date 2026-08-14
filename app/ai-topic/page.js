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
    setResult("AI 正在生成爆款内容...");


    const res = await fetch("/api/ai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({

        prompt:`

你是 RedFlow AI 内容增长专家。

请根据以下信息生成10个爆款内容选题：

行业：
${industry}

目标用户：
${target}

平台：
${platform}


每个选题包含：

🔥 标题

为什么爆

内容方向

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

    <main style={{
      padding:"50px",
      background:"#f7f8fc",
      minHeight:"100vh"
    }}>


      <h1>
        🚀 RedFlow AI
      </h1>


      <p>
        AI 爆款内容增长助手
      </p>



      <div style={{
        display:"flex",
        gap:"20px",
        margin:"30px 0"
      }}>


        <button>
          🔥 爆款选题
        </button>


        <button>
          ✍️ 小红书笔记
        </button>


        <button>
          🎬 短视频脚本
        </button>


        <button>
          📈 账号定位
        </button>


      </div>



      <div style={{
        background:"white",
        padding:"30px",
        borderRadius:"20px"
      }}>


      <h2>
        生成爆款选题
      </h2>


      <input
      style={inputStyle}
      placeholder="行业，例如：美妆"
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
      placeholder="平台，例如：小红书"
      value={platform}
      onChange={
        e=>setPlatform(e.target.value)
      }
      />


      <button
      onClick={generate}
      >

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

        <div style={{
          marginTop:"30px",
          background:"white",
          padding:"30px",
          borderRadius:"20px"
        }}>


        <h2>
          AI结果
        </h2>


        <button
        onClick={()=>{
          navigator.clipboard.writeText(result)
        }}
        >
        复制内容
        </button>


        <pre style={{
          whiteSpace:"pre-wrap"
        }}>
        {result}
        </pre>


        </div>

      }



    </main>

  );

}



const inputStyle={

width:"100%",
padding:"15px",
margin:"10px 0",
borderRadius:"10px",
border:"1px solid #ddd"

};
