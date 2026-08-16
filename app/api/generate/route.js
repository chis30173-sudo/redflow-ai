export async function POST(request) {


  try {


    const { mode, input } = await request.json()


    const apiKey = process.env.DEEPSEEK_API_KEY



    if(!apiKey){

      return Response.json({

        error:"缺少 DeepSeek API Key"

      })

    }



    let prompt = ""



    // =========================
    // 100条爆款生成
    // =========================

    if(mode === "batch"){


      prompt = `

你是一名小红书爆款操盘专家。


用户产品：

${input}


生成100条爆款内容方案。


每条包含：

1. 爆款标题

2. 内容方向

3. 用户痛点

4. 商品卖点

5. 热门标签

6. 蓝海指数

7. 利润指数


目标：

小红书卖家
潮玩商家
娃衣商家
明星周边商家


必须返回JSON格式。

格式：

{
"title":"",
"content":"",
"tags":"",
"score":{
"blue":0,
"hot":0,
"profit":0
}
}


不要输出解释文字。

`

    }



    // =========================
    // 爆款对标分析
    // =========================

    else if(mode === "analyze"){


      prompt = `

你是一名小红书商业分析专家。


分析产品：

${input}


输出：

市场热度

竞争程度

用户画像

爆款内容方向

同类账号打法

可复制机会

蓝海建议


必须返回JSON格式：

{
"title":"",
"content":"",
"tags":"",
"score":{
"blue":0,
"hot":0,
"profit":0
}
}


不要输出解释。

`

    }





    // =========================
    // 个人IP打造
    // =========================

    else if(mode === "ip"){


      prompt = `

你是一名个人IP商业顾问。


用户方向：

${input}


设计：

IP定位

人设标签

内容栏目

30天计划

爆款选题

商业变现方式


必须返回JSON格式：

{
"title":"",
"content":"",
"tags":"",
"score":{
"blue":0,
"hot":0,
"profit":0
}
}


不要输出解释。

`

    }





    // =========================
    // 蓝海选品
    // =========================

    else if(mode === "blue"){


      prompt = `

你是一名电商蓝海选品专家。


分析：

${input}


输出：

市场需求

用户需求

竞争情况

利润空间

推荐玩法

蓝海评分


必须返回JSON格式：

{
"title":"",
"content":"",
"tags":"",
"score":{
"blue":0,
"hot":0,
"profit":0
}
}


不要输出解释。

`

    }





    // =========================
    // 默认
    // =========================

    else{


      prompt = `

你是一名小红书爆款内容专家。


产品：

${input}


生成：

爆款标题

小红书文案

商品卖点

热门标签

蓝海评分

利润评分


必须返回JSON格式：

{
"title":"",
"content":"",
"tags":"",
"score":{
"blue":0,
"hot":0,
"profit":0
}
}


不要输出解释。

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

              "你是专业的小红书商业AI助手，只返回JSON数据"

            },


            {

              role:"user",

              content:prompt

            }


          ],


          temperature:0.8,


          response_format:{

            type:"json_object"

          }


        })


      }


    )





    const data = await response.json()



    const aiContent =

      data.choices?.[0]?.message?.content





    let result



    try{


      result = JSON.parse(aiContent)


    }


    catch{


      result={


        title:"AI生成结果",


        content:aiContent || "生成失败",


        tags:"#小红书 #爆款",


        score:{


          blue:80,


          hot:85,


          profit:75


        }


      }


    }





    return Response.json({

      result

    })





  }

  catch(error){


    return Response.json({

      error:error.message

    })


  }


}
