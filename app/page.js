"use client";

import { useState } from "react";


export default function AiTopicPage() {

  const [industry, setIndustry] = useState("");
  const [target, setTarget] = useState("");
  const [platform, setPlatform] = useState("");

  const [result, setResult] = useState("");


  async function generate() {

    setResult("AI 正在生成，请稍等...");


    try {

      const res = await fetch("/api/ai", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          industry: industry,

          target: target,

          platform: platform,

        }),

      });


      const data = await res.json();


      console.log(data);


      setResult(

        data.text ||

        JSON.stringify(data, null, 2) ||

        "生成失败"

      );


    } catch(error) {

      console.log(error);

      setResult("请求失败，请检查网络");

    }

  }



  return (

    <main
      style={{
        padding:"40px",
        maxWidth:"900px"
      }}
    >


      <h1>
        🔥 爆款选题生成
      </h1>



      <div>

        <p>
          行业
        </p>


        <input

          value={industry}

          onChange={(e)=>setIndustry(e.target.value)}

          placeholder="例如：美妆、电商、教育"

          style={{
            width:"100%",
            padding:"12px"
          }}

        />

      </div>




      <div>

        <p>
          目标用户
        </p>


        <input

          value={target}

          onChange={(e)=>setTarget(e.target.value)}

          placeholder="例如：18-30岁女性"

          style={{
            width:"100%",
            padding:"12px"
          }}

        />

      </div>




      <div>

        <p>
          平台
        </p>


        <input

          value={platform}

          onChange={(e)=>setPlatform(e.target.value)}

          placeholder="小红书 / 抖音 / TikTok"

          style={{
            width:"100%",
            padding:"12px"
          }}

        />

      </div>




      <button

        onClick={generate}

        style={{

          marginTop:"20px",

          padding:"12px 25px",

          cursor:"pointer"

        }}

      >

        🚀 开始生成

      </button>





      <h2 style={{marginTop:"40px"}}>

        📌 AI生成结果

      </h2>




      <pre

        style={{

          whiteSpace:"pre-wrap",

          background:"#f7f7f7",

          padding:"20px",

          borderRadius:"10px",

          lineHeight:"1.8"

        }}

      >

        {result}

      </pre>



    </main>

  );

}
