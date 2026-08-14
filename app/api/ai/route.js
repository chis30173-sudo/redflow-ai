import OpenAI from "openai";
import { NextResponse } from "next/server";


const mock = {
  ideas: [
    {
      title: "18岁女生必看的第一套化妆品清单",
      reason: "精准击中新手用户需求，容易产生收藏和购买行为",
      direction: "新手化妆教程+产品推荐"
    }
  ]
};


export async function POST(request) {

  try {

    const body = await request.json();


    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com"
    });


    if (!process.env.DEEPSEEK_API_KEY) {

      return NextResponse.json({
        mode:"mock",
        data:mock.ideas
      });

    }


    const response = await client.chat.completions.create({

      model:"deepseek-chat",

      messages:[

        {
          role:"system",

          content:
`
你是 RedFlow AI，一名专业的新媒体增长专家。

你的任务：
帮助用户生成可以商业化的爆款内容方案。

请严格按照 JSON 返回。

格式：

[
{
"title":"",
"platform":"",
"target":"",
"keywords":"",
"cover":"",
"reason":"",
"direction":"",
"monetization":""
}
]

要求：

title:
生成吸引点击的标题。

platform:
说明适合的平台。

target:
说明目标用户。

keywords:
给出5个流量关键词。

cover:
生成封面文案。

reason:
解释为什么容易爆。

direction:
说明内容制作方向。

monetization:
说明如何变现。

不要输出任何解释文字。
只输出JSON。
`
        },

        {

          role:"user",

          content:

`
行业：
${body.industry || ""}

目标用户：
${body.target || ""}

平台：
${body.platform || ""}

请生成10个爆款内容方案。
`

        }

      ]

    });


    const text =
    response.choices[0].message.content;


    return NextResponse.json({

      mode:"live",

      text:text

    });



  } catch(error){


    console.log(error);


    return NextResponse.json({

      error:"AI生成失败"

    },{
      status:500
    });


  }

}
