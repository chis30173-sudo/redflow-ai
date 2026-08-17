export async function POST(request) {
  // ===== A6 免费次数限制 =====

const body = await request.json()

const user = body.user


if(user){

  const count = user.count ?? 3


  if(count <= 0){

    return Response.json({

      error:"今日免费次数已用完，升级会员解锁无限生成"

    })

  }

}
  

  try {


   const { mode, input } = body

    const apiKey = process.env.DEEPSEEK_API_KEY


    if(!apiKey){

      return Response.json({

        error:"缺少 DeepSeek API Key"

      })

    }



    let prompt = ""



    // =========================
    // 100条爆款
    // =========================

    if(mode === "batch"){


      prompt = `

你是一名小红书爆款操盘专家。


产品：

${input}


生成10条爆款方案。


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


要求：

适合小红书卖家
潮玩
娃衣
明星周边


不要输出解释。

`

    }





    // =========================
    // 爆款图文生成 A3新增
    // =========================

    else if(mode === "image"){


      prompt = `

你是一名小红书爆款图文策划专家。


产品：

${input}


生成一套6页小红书图文。


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


每个方案包含：

1. 封面标题

2. 第2页用户痛点

3. 第3页产品展示

4. 第4页使用场景

5. 第5页购买理由

6. 第6页评论互动


要求：

符合小红书爆款逻辑。


不要输出解释。

`

    }






    // =========================
    // 蓝海选品
    // =========================

    else if(mode === "blue"){


      prompt = `

你是一名电商蓝海选品专家。


产品：

${input}


分析：

市场需求

竞争程度

利润空间

用户画像

进入机会


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


不要输出解释。

`

    }






    // =========================
    // 爆款对标
    // =========================

    else if(mode === "analyze"){


      prompt = `


你是一名小红书商业分析专家。


分析：

${input}


输出：

市场热度

竞品打法

用户画像

内容机会

蓝海方向


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


不要输出解释。

`

    }






    // =========================
    // 个人IP
    // =========================

    else if(mode === "ip"){


      prompt = `


你是一名个人IP商业顾问。


方向：

${input}


设计：

账号定位

人设标签

内容栏目

30天计划

变现方式


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


不要输出解释。

`

    } 
      // =========================
    // 潮玩热点趋势 A3新增
    // =========================

    else if(mode === "trend"){


      prompt = `

你是一名潮玩市场趋势分析专家。


方向：

${input}


分析最新机会：


热门IP趋势

消费者兴趣

增长方向

适合商品

竞争程度

进入建议



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



不要输出解释。

`

    }





    // =========================
    // 明星周边分析 A3新增
    // =========================

    else if(mode === "star"){


      prompt = `

你是一名明星商业周边分析专家。


明星/方向：

${input}


分析：

粉丝画像

消费能力

适合开发商品

内容方向

商业机会

风险


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



不要输出解释。

`

    }






    // =========================
    // 默认模式
    // =========================

    else{


      prompt = `


你是一名小红书爆款内容专家。


产品：

${input}


生成爆款方案。


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



不要输出解释。


`

    }







    // =========================
    // 调用 DeepSeek
    // =========================


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

              "你是专业的小红书商业AI助手，只返回JSON格式"


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
