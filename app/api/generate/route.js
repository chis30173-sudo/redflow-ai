export async function POST(request) {

  try {

    const body = await request.json()

    const product = body.product


    const apiKey = process.env.DEEPSEEK_API_KEY


    if (!apiKey) {

      return Response.json({
        error: "没有找到 DEEPSEEK_API_KEY"
      })

    }



    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Authorization": `Bearer ${apiKey}`

        },


        body: JSON.stringify({

          model: "deepseek-chat",


          messages: [

            {

              role: "system",

              content:
              "你是一个专业的小红书运营专家、电商营销专家，擅长生成爆款商品内容。"

            },


            {

              role: "user",

              content:

`
请帮我生成商品：${product}

的小红书爆款营销内容。

请返回JSON格式：

{
"title":"",
"content":"",
"tiktok":"",
"selling_points":"",
"tags":""
}


要求：

1. 标题具有爆款吸引力
2. 符合年轻用户语言
3. 增强购买欲
4. 适合电商推广
5. 生成TikTok短视频脚本
`

            }

          ]

        })

      }


    )


    const data = await response.json()



    if(data.error){

      return Response.json({

        error:data.error

      })

    }



    const result =

    data.choices[0].message.content



    return Response.json({

      result

    })



  } catch(error){


    return Response.json({

      error:error.message

    })


  }


}
