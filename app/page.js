"use client";

import { useState } from "react";

const navItems = [
  ["工作台", "dashboard"],
  ["AI 选题", "ideas"],
  ["笔记拆解", "breakdown"],
  ["笔记生成器", "generate"],
  ["笔记优化", "optimize"],
  ["内容日历", "calendar"],
  ["AI 运营顾问", "advisor"],
  ["历史项目", "history"],
  ["套餐与计费", "pricing"]
];

const toolMeta = {
  ideas: ["AI 选题", "输入行业与目标用户，生成原创内容方向。"],
  breakdown: ["笔记拆解", "粘贴内容，分析 Hook、结构、信任元素和转化动作。"],
  generate: ["笔记生成器", "从一个主题生成标题、正文、CTA 和标签建议。"],
  optimize: ["笔记优化", "把已有草稿改得更清晰、更具体、更容易阅读。"],
  advisor: ["AI 运营顾问", "围绕内容策略、发布节奏和复盘获得建议。"]
};

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const [industry, setIndustry] = useState("美甲");
  const [audience, setAudience] = useState("20-35 岁女性");
  const [topic, setTopic] = useState("新客第一次做美甲最容易踩的坑");
  const [text, setText] = useState("很多人第一次做美甲不知道怎么选款式，今天给大家分享几个建议。");
  const [question, setQuestion] = useState("我应该怎么安排未来 7 天的内容？");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  async function runAI(type, payload) {
    setLoading(true);
    setResult("");
    setMode("");
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "请求失败");
      setResult(data.text);
      setMode(data.mode || "");
    } catch (error) {
      setResult(`错误：${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function renderTool(type) {
    const [title, desc] = toolMeta[type];
    return (
      <section className="tool-page">
        <div className="page-title">
          <span className="eyebrow">AI TOOL</span>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <div className="tool-grid">
          <div className="panel">
            {(type === "ideas" || type === "generate" || type === "advisor") && (
              <>
                <label>行业 / 产品<input value={industry} onChange={(e) => setIndustry(e.target.value)} /></label>
                <label>目标用户<input value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
              </>
            )}
            {type === "generate" && <label>内容主题<textarea rows="5" value={topic} onChange={(e) => setTopic(e.target.value)} /></label>}
            {(type === "breakdown" || type === "optimize") && <label>{type === "breakdown" ? "粘贴要拆解的内容" : "粘贴你的草稿"}<textarea rows="11" value={text} onChange={(e) => setText(e.target.value)} /></label>}
            {type === "advisor" && <label>你想问什么？<textarea rows="7" value={question} onChange={(e) => setQuestion(e.target.value)} /></label>}
            <button className="primary" disabled={loading} onClick={() => {
              if (type === "ideas") runAI(type, { industry, audience });
              if (type === "generate") runAI(type, { industry, audience, topic });
              if (type === "breakdown") runAI(type, { text });
              if (type === "optimize") runAI(type, { text });
              if (type === "advisor") runAI(type, { industry, audience, question });
            }}>{loading ? "AI 正在生成…" : "开始生成"}</button>
          </div>
          <div className="panel result-panel">
            <div className="result-head"><h3>AI 输出</h3>{mode && <span className={`badge ${mode}`}>{mode === "live" ? "LIVE AI" : "MOCK"}</span>}</div>
            {result ? <pre>{result}</pre> : <div className="placeholder">生成结果会显示在这里。</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div>
          <div className="brand"><div className="logo">R</div><div><strong>RedFlow AI</strong><span>内容增长工作台</span></div></div>
          <nav>{navItems.map(([label, key]) => <button key={key} className={active === key ? "nav active" : "nav"} onClick={() => { setActive(key); setResult(""); setMode(""); }}>{label}</button>)}</nav>
        </div>
        <div className="account"><div className="avatar">C</div><div><strong>Creator</strong><span>Free · 18/100</span></div></div>
      </aside>
      <section className="content">
        <header className="topbar"><div><span className="eyebrow">RED FLOW / V2</span><h1>{navItems.find((x) => x[1] === active)?.[0]}</h1></div><span className="status">● AI Ready</span></header>

        {active === "dashboard" && (
          <>
            <section className="hero">
              <div><span className="pill">AI CONTENT COPILOT</span><h2>少一点空想，<br />多一点可发布内容。</h2><p>从选题、写作、优化到复盘，把重复工作交给 AI，把判断留给你。</p><button className="primary large" onClick={() => setActive("ideas")}>生成今日选题 →</button></div>
              <div className="score-card"><span>内容系统健康度</span><strong>82</strong><div className="meter"><i /></div><small>选题稳定 · 发布节奏待提升</small></div>
            </section>
            <section className="stats">
              <div><span>本周计划</span><strong>7</strong><small>篇内容</small></div>
              <div><span>已生成</span><strong>24</strong><small>本月</small></div>
              <div><span>待优化</span><strong>3</strong><small>篇草稿</small></div>
              <div><span>AI 用量</span><strong>18%</strong><small>Free Plan</small></div>
            </section>
            <section className="dash-grid">
              <div className="panel"><span className="eyebrow">QUICK START</span><h3>今天最值得做的 3 件事</h3>{["生成 5 个新选题", "优化昨天的草稿", "安排未来 7 天发布计划"].map((x, i) => <div className="task" key={x}><b>0{i + 1}</b><span>{x}</span><em>{i === 0 ? "现在开始" : "待处理"}</em></div>)}</div>
              <div className="panel"><span className="eyebrow">INSIGHT</span><h3>AI 运营提示</h3><p className="insight">你现在的内容更偏“展示结果”，下一轮建议加入更多“问题解释 + 过程 + 判断”，这样更容易建立信任，而不是只做作品陈列。</p></div>
            </section>
          </>
        )}

        {["ideas", "breakdown", "generate", "optimize", "advisor"].includes(active) && renderTool(active)}

        {active === "calendar" && <section className="tool-page"><div className="page-title"><span className="eyebrow">CONTENT CALENDAR</span><h2>未来 7 天内容日历</h2><p>先把节奏稳定下来，再用数据优化主题比例。</p></div><div className="calendar-grid">{["教程", "清单", "案例", "观点", "推荐", "幕后", "复盘"].map((tag, i) => <div className="cal-card" key={tag}><span>周{"一二三四五六日"[i]}</span><b>{tag}</b><h3>{["新手避坑指南", "5 个高频问题", "真实案例拆解", "一个行业误区", "本周灵感推荐", "幕后工作流", "一周数据复盘"][i]}</h3><small>{i < 3 ? "草稿已规划" : "待生成"}</small></div>)}</div></section>}

        {active === "history" && <section className="simple"><span className="pill">V2</span><h2>历史项目</h2><p>接入数据库后，这里会自动保存用户生成过的选题、草稿、优化记录和运营建议。</p></section>}

        {active === "pricing" && <section className="tool-page"><div className="page-title"><span className="eyebrow">PRICING</span><h2>套餐与计费</h2><p>当前是产品设计占位，尚未接真实支付。</p></div><div className="pricing">{[["Free", "¥0", "100 次 AI / 月"], ["Pro", "¥59", "1,500 次 AI / 月"], ["Studio", "¥159", "5,000 次 AI / 月"]].map((plan, i) => <div className={i === 1 ? "price featured" : "price"} key={plan[0]}><span>{plan[0]}</span><h3>{plan[1]}<small>/月</small></h3><p>{plan[2]}</p><button className={i === 1 ? "primary" : "secondary"}>{i === 0 ? "当前套餐" : "选择套餐"}</button></div>)}</div></section>}
      </section>
    </main>
  );
}
