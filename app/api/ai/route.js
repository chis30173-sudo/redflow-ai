import OpenAI from "openai";
import { NextResponse } from "next/server";

const mock = {
  ideas: `1. 新手最容易踩的 5 个坑\n2. 目标用户最常问却没人讲清楚的问题\n3. 为什么同样做内容，有的人更容易获得咨询？\n4. 不像硬广的产品种草结构\n5. 7 天内容计划：从认知到转化`,
  generate: `标题候选：\n1. 别再只发成品图了｜真正容易带来咨询的内容结构\n2. 新手做内容，先把这 5 件事讲清楚\n3. 为什么你的内容有人看，却没人行动？\n\n正文：\n先说用户正在经历的具体问题，再给出你的判断，然后用案例、过程或数字证明，最后给一个低门槛的下一步动作。`,
  optimize: `优化建议：\n- 标题改成“问题 + 结果”型。\n- 前两句话直接点出用户痛点。\n- 每段只表达一个重点。\n- 加入真实案例、过程或数字。\n- CTA 使用收藏、评论或咨询等自然动作。`,
  advisor: `运营判断：未来 7 天建议按 40% 教程/避坑、40% 案例/结果、20% 观点/品牌分配。每篇记录曝光、收藏、评论和私信，连续两周后再判断有效内容类型。`,
  breakdown: `拆解结果：\n1. Hook：是否在开头快速命中目标用户。\n2. 痛点：是否具体到真实场景。\n3. 证据：是否有案例、数字或过程。\n4. 信息密度：是否方便快速阅读。\n5. CTA：是否自然承接下一步动作。`
};

function promptFor(type, payload = {}) {
  const base = "你是 RedFlow AI，一个中文内容运营助手。输出具体、可执行、原创的建议，不承诺流量结果，不复制第三方原文。";
  const prompts = {
    ideas: `${base}\n生成 5 个原创内容选题。行业：${payload.industry || "未填写"}。目标用户：${payload.audience || "未填写"}。每个选题给标题和一句话角度。`,
    generate: `${base}\n生成一篇原创内容草稿。行业：${payload.industry || "未填写"}。目标用户：${payload.audience || "未填写"}。主题：${payload.topic || "未填写"}。输出 3 个标题、正文、CTA 和标签建议。`,
    optimize: `${base}\n优化以下草稿，输出诊断、优化标题、优化正文和修改理由：\n${payload.text || ""}`,
    advisor: `${base}\n作为内容运营顾问回答问题。行业：${payload.industry || "未填写"}。目标用户：${payload.audience || "未填写"}。问题：${payload.question || ""}。输出判断、原因和未来 7 天行动建议。`,
    breakdown: `${base}\n只分析以下内容的方法和结构，不复刻原文。输出 Hook、结构、信任元素、转化动作和改进点：\n${payload.text || ""}`
  };
  return prompts[type] || base;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const type = body.type || "ideas";
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ mode: "mock", text: mock[type] || mock.ideas });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      instructions: "你是 RedFlow AI 的中文内容运营助手。",
      input: promptFor(type, body.payload || {})
    });

    return NextResponse.json({ mode: "live", text: response.output_text || "AI 暂未返回文本。" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI 请求失败，请检查配置后重试。" }, { status: 500 });
  }
}
