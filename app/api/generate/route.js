export async function POST(request) {

  try {

    const { mode, input } = await request.json()

    const apiKey = process.env.DEEPSEEK_API_KEY


    if (!apiKey) {
      return Response.json({
        error: "缺少 DeepSeek API Key"
      })
    }


    let prompt = ""


    // 蓝海商品发现
    if (mode === "blue") {

      prompt = `
你是一名小红书电商选品专家。

用户想分析：

${input}


请帮助寻找蓝海商业机会。

请按照以下结构输出：

# 蓝海机会分析

## 1. 推荐产品方向（10个）

## 2. 市场需求分析

## 3. 当前竞争情况

## 4. 用户画像

## 5. 利润空间分析

## 6. 小红书内容切入方式

## 7. 新卖家进入建议


要求：
像一个专业商业顾问。
`

    }



    // 爆款内容生成
    if (mode === "content") {

      prompt = `
你是一名小红书爆款内容运营专家。


产品：

${input}


请生成爆款内容方案。

输出：

# 爆款标题（20个）

# 种草内容方向

# 测评内容方向

# 故事内容方向

# 成交内容方向

# 热门标签建议

# 评论区互动话术


要求：
符合真实小红书用户语言。
不要像广告。
`

    }




    // 爆款拆解
    if (mode === "analyze") {

      prompt = `
你是一名小红书爆款分析师。


需要分析：

${input}


请输出：

# 爆款原因

## 标题分析

## 图片分析

## 用户心理分析

## 评论区传播原因

## 成交逻辑

## 可以复制优化的方法


要求：
给商业卖家参考。
`

    }




    // IP打造
    if (mode === "ip") {

      prompt = `
你是一名个人IP商业顾问。


用户情况：

${input}


请设计：

# IP定位

# 人设标签

# 账号名称方向

# 内容栏目规划

# 30天发布计划

# 粉丝增长策略

# 商业变现方式


要求：
适合小红书长期运营。
`

    }




    const response = await fetch(
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
你是 RedFlow AI。

你的专业领域：
小红书电商增长、
潮玩市场分析、
爆款内容策划、
个人IP打造。

你的目标：
帮助用户找到商业机会并增长。
`
            },


            {
              role:"user",
              content:prompt
            }

          ],

          temperature:0.8

        })

      }
    )


    const data = await response.json()


    return Response.json({

      result:
      data.choices?.[0]?.message?.content
      ||
      "生成失败"

    })


  } catch(error) {


    return Response.json({

      error:error.message

    })


  }

}
