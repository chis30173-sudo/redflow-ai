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



    // =====================
    // 100条爆款生成
    // =====================

    if(mode === "batch"){


      prompt = `

你是一名小红书爆款商业操盘专家。

产品：

${input}


请生成爆款内容方案。


返回JSON格式：

{
"plans":[
{
"title":"",
"content":"",
"tags":[],
"score":{
"blue":80,
"hot":80,
"profit":80
}
}
]
}


要求：

生成10条高质量方案。

每条包含：

1. 爆款标题
2. 小红书文案
3. 用户痛点
4. 商品卖点
5. 热门标签
6. 蓝海评分
7. 热度评分
8. 利润评分


目标：

小红书卖家
潮玩商家
娃衣商家
明星周边商家


不要输出解释。

`

    }





    // =====================
    // 爆款分析
    // =====================

    else if(mode === "analyze"){


      prompt = `

你是一名小红书市场分析专家。


产品：

${input}


返回JSON：

{
"plans":[
{
"title":"",
"content":"",
"tags":[],
"score":{
"blue":80,
"hot":80,
"profit":80
}
}
]
}


分析：

市场热度

竞争程度

用户画像

爆款打法

竞品机会

蓝海方向


不要输出解释。

`

    }





    // =====================
    // 个人IP
    // =====================

    else if(mode === "ip"){


      prompt = `

你是一名个人IP商业顾问。


方向：

${input}


返回JSON：

{
"plans":[
{
"title":"",
"content":"",
"tags":[],
"score":{
"blue":80,
"hot":80,
"profit":80
}
}
]
}


规划：

IP定位

人设标签

内容栏目

30天计划

爆款选题

商业变现


不要输出解释。

`

    }






    // =====================
    // 蓝海选品
    // =====================

    else if(mode === "blue"){


      prompt = `

你是一名电商蓝海选品专家。


产品：

${input}


返回JSON：

{
"plans":[
{
"title":"",
"content":"",
"tags":[],
"score":{
"blue":80,
"hot":80,
"profit":80
}
}
]
}


分析：

市场需求

用户需求

竞争程度

利润空间

推荐玩法

蓝海机会


不要输出解释。

`

    }






    // =====================
    // 默认
    // =====================

    else{


      prompt = `

你是一名小红书爆款内容专家。


产品：

${input}


返回JSON：

{
"plans":[
{
"title":"",
"content":"",
"tags":[],
"score":{
"blue":80,
"hot":80,
"profit":80
}
}
]
}


生成：

爆款标题

小红书文案

商品卖点

标签

评分


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

              content:"你是专业小红书商业AI助手，只返回JSON"

            },


            {

              role:"user",

              content:prompt

            }


          ],


          temperature:0.7


        })


      }

    )





    const data = await response.json()



    const aiContent =

    data.choices?.[0]?.message?.content || ""





    let result





    // =====================
    // JSON解析
    // =====================


    try{


      const clean = aiContent

      .replace(/```json/g,"")

      .replace(/```/g,"")

      .trim()



      result = JSON.parse(clean)



    }


    catch(error){



      result = {


        plans:[

          {

            title:"AI生成结果",

            content:aiContent,

            tags:[

              "#小红书",

              "#爆款"

            ],


            score:{


              blue:80,

              hot:80,

              profit:80


            }

          }

        ]

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
