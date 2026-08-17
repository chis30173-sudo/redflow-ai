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
    let prompt = ""
let productCategory = ""
    // ===== A8.5 产品自动分类 =====

let categoryPrompt = `

你是一名电商商品分类专家。

用户输入商品：

${input}

请判断：

1. 商品类别
2. 目标用户
3. 消费场景
4. 营销方向

返回JSON：

{
"category":"",
"user":"",
"scene":"",
"marketing":""
}

不要输出解释。

`

    const apiKey = process.env.DEEPSEEK_API_KEY


    if(!apiKey){

      return Response.json({

        error:"缺少 DeepSeek API Key"

      })

    }
    // ===== A8.5 产品自动分类 =====

const categoryResponse = await fetch(
"https://api.deepseek.com/chat/completions",
{
method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${apiKey}`
},

body:JSON.stringify({

model:"deepseek-chat",

messages:[

{
role:"system",

content:
"你是专业电商商品分类AI，只返回JSON"

},

{

role:"user",

content: categoryPrompt

}

],

temperature:0.3

})

}
)


const categoryData = await categoryResponse.json()


const categoryText =
categoryData.choices?.[0]?.message?.content || ""


productCategory = categoryText
.replace(/```json/g,"")
.replace(/```/g,"")
.trim()






    // =========================
    // 100条爆款
    // =========================

    if(mode === "batch"){


      prompt = `

你是一名小红书爆款操盘专家。


产品：

${input}


商品分类信息：

${productCategory}


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

根据输入的产品自动判断行业。

分析目标用户、购买动机、消费场景。

如果是服装：
关注穿搭、风格、显瘦、场景。

如果是美妆：
关注效果、成分、使用体验。

如果是食品：
关注口味、健康、复购。

如果是潮玩：
关注收藏价值、IP、情绪价值。

如果是其他产品：
根据产品特点自由分析。

不要强行改变产品类别。

不要输出解释。


不要输出解释。

`

    }





    // =========================
    // 爆款图文生成 A3新增
    // =========================

  else if(mode === "image"){


prompt = `

你是一名小红书AI视觉爆款设计专家。


产品：

${input}


商品分类信息：

${productCategory}



请生成一套6页小红书图文方案。


返回JSON格式：

{
"plans":[
{

"title":"封面爆款标题",

"content":"6页小红书视觉图文方案",

"pages":[

{
"page":1,
"title":"",
"content":"",
"image_prompt":""
},

{
"page":2,
"title":"",
"content":"",
"image_prompt":""
},

{
"page":3,
"title":"",
"content":"",
"image_prompt":""
},

{
"page":4,
"title":"",
"content":"",
"image_prompt":""
},

{
"page":5,
"title":"",
"content":"",
"image_prompt":""
},

{
"page":6,
"title":"",
"content":"",
"image_prompt":""
}

],


"tags":[
"#小红书",
"#爆款",
"#电商"
],


"score":{

"blue":80,

"hot":90,

"profit":85

}

}

]

}



要求：


每一页包含：

1. 页面标题

2. 文案内容

3. AI图片生成Prompt


图片Prompt要求：

- 摄影风格
- 光线
- 场景
- 构图
- 产品展示方式


适合：

小红书种草

电商销售

潮玩产品

娃衣

明星周边


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


商品分类信息：

${productCategory}


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


商品分类信息：

${productCategory}

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
商品分类信息：

${productCategory}


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
商品分类信息：

${productCategory}


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
商品分类信息：

${productCategory}



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


商品分类信息：

${productCategory}


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

`
你是一名拥有5年以上经验的小红书商业操盘手。

你曾帮助服装、美妆、潮玩、食品、生活用品等品牌进行内容增长。

你的思考方式：

不是生成普通营销文案，
而是模拟真实消费者和真实运营人员。

要求：

1. 所有内容必须符合真人表达习惯。

2. 禁止：
- AI腔
- 空洞商业术语
- 夸张虚假宣传
- 模板化表达

3. 输出必须包含真实场景：

例如：
- 用户什么时候使用产品
- 为什么产生购买冲动
- 购买前的犹豫
- 使用后的真实感受
- 朋友看到后的反馈

4. 文案风格：

像真实小红书博主分享。

允许：
- 口语
- 情绪
- 小故事
- 个人体验

避免：
"这款产品具有巨大市场潜力"
"满足消费者多元需求"

这种AI表达。

5. 分析产品时必须先理解产品类别。

不能：
把服装变成娃衣
把食品变成保健品
把普通商品强行套入潮玩。

产品名称必须保持原意。

禁止修改用户输入的商品类别。

例如：
鱼骨胸衣 = 女性内衣/塑形服装。

不能生成：
娃衣、BJD服饰、玩偶服。

除非用户明确输入。
6. 只输出JSON，不输出解释。
`


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
