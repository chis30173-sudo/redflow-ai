"use client";

import { useState } from "react";

export default function AiTopicPage() {
  const [industry, setIndustry] = useState("");
  const [target, setTarget] = useState("");
  const [platform, setPlatform] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
  setResult("AI 正在生成...");

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `
你是一个内容增长专家。

请根据以下信息生成10个爆款内容选题：

行业：${industry}
目标用户：${target}
平台：${platform}

要求：
1. 给出标题
2. 给出爆款原因
3. 给出内容方向
`,
    }),
  });

  const data = await res.json();

  setResult(data.text || "生成失败");
}


  return (
    <main style={{padding:"40px"}}>
      <h1>AI 选题</h1>

      <div>
        <p>行业</p>
        <input
          value={industry}
          onChange={(e)=>setIndustry(e.target.value)}
          placeholder="例如：美妆、电商、教育"
        />
      </div>


      <div>
        <p>目标用户</p>
        <input
          value={target}
          onChange={(e)=>setTarget(e.target.value)}
          placeholder="例如：18-30岁女性"
        />
      </div>


      <div>
        <p>平台</p>
        <input
          value={platform}
          onChange={(e)=>setPlatform(e.target.value)}
          placeholder="小红书 / 抖音 / TikTok"
        />
      </div>


      <button onClick={generate}>
        生成选题
      </button>


      <pre style={{
        marginTop:"30px",
        whiteSpace:"pre-wrap"
      }}>
        {result}
      </pre>

    </main>
  );
}
