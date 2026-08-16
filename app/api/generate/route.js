export async function POST(request) {

  try {

    const body = await request.json()

    const mode = body.mode
    const input = body.input


    const apiKey = process.env.DEEPSEEK_API_KEY


    if (!apiKey) {

      return Response.json({
        error:"没有找到 DEEPSEEK_API_KEY"
      })

    }


    let prompt = ""


    if(mode==="blue"){

      prompt = `
你是一名小红书电商选品专家。

请分析这个方向：

${input}

帮我寻找蓝海商品机会。

输出：

1. 推荐商品10个
2. 市场需求分析
3. 竞争程度
4. 利润空间
5. 目标用户
6. 小红书内容方向
7. 为什么现在适合进入

要求：
像专业投资分析报告。
`

    }



    if(mode==="content"){

      prompt = `
你是一名小红书爆款内容专家。

产品：

${input}


请生成10篇爆款图文方案。

每篇包含：

标题：
开头3秒钩子：
正文：
购买理由：
评论区引导：
热门标签：


要求：
符合真实小红书用户语言。
`

    }



    if(mode==="analyze"){

      prompt = `
你是一名小红书爆款分析专家。

请分析下面内容：

${input}


输出：

1. 为什么爆火
2. 标题策略
3. 图片策略
4. 用户心理
5. 成交逻辑
6. 如何复制优化

`

    }



    if(mode==="ip"){

      prompt = `
你是一名个人IP打造专家。


用户信息：

${input}


请设计：

1. IP定位
2. 人设标签
3. 内容方向
4. 30天发布计划
5. 爆款栏目设计
6. 商业变现方式

`

    }



    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

          "Authorization":
          `Bearer ${apiKey}`

        },


        body:JSON.stringify({

          model:"deepseek-chat",

          messages:[

            {
              role:"system",
              content:
              "你是小红书商业增长专家，帮助用户发现机会、创造内容和打造个人品牌。"
            },


            {
              role:"user",
              content:prompt
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



    return Response.json({

      result:
      data.choices[0].message.content

    })


  } catch(error){

    return Response.json({

      error:error.message

    })

  }

}
