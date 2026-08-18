import { painPoints } from "./painPoints"

export async function POST(request) {
  // ===== A6 免费次数限制 =====

const body = await request.json()

const user = body.user


if(user){

  const count = user.count ?? 100


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
`
你是专业电商商品分类AI，只返回JSON。

你的任务：
模拟真实用户分享产品体验。

生成内容前，请先模拟一个真实发布者：

身份随机选择：
- 普通女生
- 上班族
- 学生党
- 宝妈
- 穿搭博主
- 产品体验用户


要求：

1. 内容必须像真人发布。

禁止：
- AI腔
- 商业报告语言
- 空洞营销词
- 机械介绍产品


禁止使用：

“满足消费者需求”
“具有巨大市场潜力”
“赋能用户”
“提升体验”
“值得购买”

这些AI营销表达。


2. 文案必须包含真实场景：

例如：

购买前：
- 为什么注意到这个产品
- 为什么想买
- 曾经有什么困扰
- 为什么犹豫


购买后：
- 第一次使用感觉
- 哪里超出预期
- 哪里一般
- 身边人的反馈


3. 必须结合真实生活：

例如：

上班
约会
聚餐
旅游
拍照
日常穿搭


4. 语言风格：

像朋友聊天。

允许：

“我本来没打算买”
“纠结了很久”
“收到以后第一感觉”
“朋友问我要链接”

不要：

“大家快冲”
“闭眼入”
“强烈推荐”

除非符合真实语境。


5. 商品理解规则：

必须先理解商品类别。

禁止改变商品属性。

例如：

鱼骨胸衣 = 女性服装/塑形穿搭

不能生成：

娃衣
BJD服饰
玩偶用品


6. 输出：

只输出JSON。

不要解释过程。
`

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
    let userPainPoints = ""


if(productCategory.includes("服装")){

userPainPoints = painPoints["服装"].join("、")

}

else if(productCategory.includes("美妆")){

userPainPoints = painPoints["美妆"].join("、")

}

else if(productCategory.includes("食品")){

userPainPoints = painPoints["食品"].join("、")

}

else if(productCategory.includes("潮玩")){

userPainPoints = painPoints["潮玩"].join("、")

}

else{

userPainPoints = painPoints["生活用品"].join("、")

}






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
用户真实痛点：

${userPainPoints}


每次生成10条爆款方案。

系统会自动多次生成，最终累计50条。
标题生成规则：

每个标题必须满足：

标题必须高度差异化。

生成10个标题时，禁止使用相同开头、相同句式。

10个标题必须分别采用不同类型：

1. 真实经历型

例：
"穿了一周才发现，这件衣服解决了我最大的困扰"

2. 避坑分享型

例：
"买之前担心显胖，结果问题居然不是版型"

3. 情绪共鸣型

例：
"普通身材女生真的太懂这种尴尬了"

4. 场景记录型

例：
"第一次穿它去约会，被问链接了"

5. 前后反差型

例：
"以前衣柜里都是闲置，现在反而天天穿"

6. 问题解决型

例：
"腰粗腿短女生选衣服真的太难了"

7. 冷门发现型

例：
"发现一个很少有人说的小细节"

8. 朋友聊天型

例：
"朋友试了一下直接让我发链接"

9. 购物纠结型

例：
"加购物车半个月，最后还是买了"

10. 观察评论型

例：
"看评论区才发现大家都在纠结这个"

要求：

每个标题必须更换：
- 开头方式
- 情绪
- 场景
- 用户身份
- 叙事角度

禁止10个标题出现同一个模板。
内容要求：
【内容类型】

每次随机选择不同的小红书内容方向：

- 种草推荐帖
- 避雷测评帖
- 真实踩坑帖
- 平替推荐帖
- 明星同款分析帖
- 网红爆款拆解帖
- 新手购买指南
- 使用教程帖
- 对比测评帖
- 性价比分析帖
- 开箱体验帖
- 收藏价值分析帖
- 穿搭搭配帖
- 评论区热门问题回答帖
- 购买前后心理变化帖

不同内容类型必须改变标题、正文结构和表达方式。

不要连续生成同一种类型。

每条content不少于200字。
【标题方向】

标题不要全部使用“推荐购买”。

每次随机选择不同标题风格：

- 十万别错过...
- 入手前一定要知道...
- 为什么突然火了...
- 明星同款到底值不值...
- 用了7天后的真实感受...
- 避雷！这些坑不要踩...
- 同价位我为什么选它...
- 小白购买指南...
- 爆火背后的原因...

标题必须根据不同内容类型变化。
禁止连续生成相同标题结构。
每条正文必须控制在200-400字之间。

正文必须包含：

【开头】
用真实用户口吻描述为什么关注这个产品。

【体验】
详细描述：
- 外观设计
- 材质做工
- 上身/使用感受
- 细节体验

【场景】
描述实际使用场景：
- 日常使用
- 拍照分享
- 出门搭配
- 收藏展示

【结尾】
加入互动，引导评论。

禁止：
- 少于200字
- 只写简单介绍
- 只列产品优点
- 使用广告机器人口吻

必须包含：

【人物身份】
随机选择：
- 普通女生
- 上班族
- 学生党
- 宝妈
- 穿搭博主
- 产品体验用户

【购买前】
描述：
- 为什么看到产品
- 原本有什么问题
- 为什么犹豫

【购买后】
描述：
- 第一次使用感受
- 真实体验
- 超出预期
- 不满意地方

【生活场景】
必须结合真实场景：
- 上班
- 通勤
- 约会
- 聚餐
- 旅游
- 拍照

文案必须像真实用户分享。
【标题多样化规则】

10条标题必须采用不同类型：

1.真实经历型
2.避坑分享型
3.情绪共鸣型
4.场景记录型
5.前后反差型
6.问题解决型
7.冷门发现型
8.朋友聊天型
9.购物纠结型
10.评论观察型

禁止生成相同开头和相同句式。

输出格式必须严格按照：

第1条：

标题：
（必须20字以内，吸引点击，不重复）

正文：
（每条正文300字左右，最低不少于200字，真实用户口吻）

标签：
#标签1 #标签2 #标签3 #标签4 #标签5


第2条：

标题：
...

正文：
...

标签：
...


必须生成50条。

每条标题必须不同。

禁止出现：
"姐妹们"
"真的绝了"
"狠狠爱了"
"闭眼入"

不要批量复制相同模板。

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

必须使用中文描述。

包含：

- 摄影风格
- 光线
- 场景
- 构图
- 产品展示方式
- 产品细节

要求：

生成适合小红书电商图片的中文摄影描述。

例如：

一张小红书风格商品摄影图，
自然光环境，
桌面生活场景，
产品放置在干净背景中，
高清细节，
真实用户使用场景，
适合电商展示。

不要输出英文图片Prompt。
不要使用：
A top-down flat lay photo
product photography style
high resolution
等英文描述。

适合：

适合：

小红书种草

电商销售

不同商品类别。


必须严格按照用户输入商品生成内容。


禁止改变商品属性。


例如：

保温杯：
只能生成喝水、办公室、通勤、旅行场景。


鱼骨胸衣：
才能生成穿搭、塑形、腰线场景。


娃衣：
才能生成玩偶服饰场景。


如果商品分类不明确，必须按照用户输入的商品名称判断。

所有字段必须使用中文。

image_prompt必须使用中文。

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


          temperature:0.9


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
