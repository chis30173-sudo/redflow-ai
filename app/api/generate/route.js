export async function POST(request) {

  const body = await request.json()

  const product = body.product


  const apiKey = process.env.OPENAI_API_KEY


  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },

      body: JSON.stringify({

        model: "gpt-4.1-mini",

        messages: [

          {
            role: "system",
            content:
            "你是一个专业的小红书运营、电商营销专家，擅长生成爆款内容。"
          },

          {
            role: "user",
            content:
`
请帮我生成商品 ${product} 的营销内容。

返回JSON格式：

{
"title":"",
"content":"",
"tiktok":"",
"selling_points":"",
"tags":""
}

要求：
1. 小红书爆款风格
2. 年轻化语言
3. 包含购买欲
4. 适合商业推广
`
          }

        ]

      })

    }
  )


  const data = await response.json()


  const result =
  data.choices[0].message.content


  return Response.json({

    result

  })

}
