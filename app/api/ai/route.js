import { NextResponse } from "next/server";

const mock = {
  ideas: "这里是测试内容：\n1. 新手最容易踩的5个坑\n2. 目标用户常见问题\n3. 行业趋势分析",
  generate: "这是生成内容测试。",
  optimize: "这是优化建议测试。",
  advisor: "这是运营建议测试。",
  breakdown: "这是拆解结果测试。"
};


function promptFor(type, payload = {}) {
  const base = "你是 RedFlow AI，一个中文内容运营助手。";

  const prompts = {
    ideas: `${base}
请生成5个原创内容选题。
行业：${payload.industry || "不限"}
要求：适合短视频、小红书、公众号。`,

    generate: `${base}
请根据这个主题生成完整内容：
${payload.topic || "AI工具推荐"}`,

    optimize: `${base}
请优化以下内容：
${payload.content || ""}`,

    advisor: `${base}
请给出运营建议：
${JSON.stringify(payload)}`,

    breakdown: `${base}
请拆解这个账号或内容：
${JSON.stringify(payload)}`
  };

  return prompts[type] || prompts.ideas;
}


export async function POST(request) {

  try {

    const body = await request.json();

    const type = body.type || "ideas";


    console.log(
      "KEY EXISTS:",
      !!process.env.DEEPSEEK_API_KEY
    );


    if (!process.env.DEEPSEEK_API_KEY) {

      return NextResponse.json({
        mode: "mock",
        text: mock[type] || mock.ideas
      });

    }


    console.log("CALLING DEEPSEEK");


    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },


        body: JSON.stringify({

          model: "deepseek-chat",

          messages: [

            {
              role: "system",
              content:
                "你是 RedFlow AI 中文内容运营助手。"
            },

            {
              role: "user",
              content:
                promptFor(
                  type,
                  body.payload || {}
                )
            }

          ],

          temperature: 0.7

        })

      }
    );


    const data = await response.json();


    console.log(
      "DEEPSEEK RESULT:",
      JSON.stringify(data)
    );


    if (!response.ok) {

      return NextResponse.json({

        mode: "error",

        error: data

      }, {
        status: 500
      });

    }


    return NextResponse.json({

      mode: "live",

      text:
        data.choices?.[0]?.message?.content ||
        "DeepSeek 没有返回内容"

    });


  } catch (error) {


    console.log(
      "SERVER ERROR:",
      error
    );


    return NextResponse.json({

      mode: "error",

      error:
        error.message

    }, {
      status:500
    });


  }

}
