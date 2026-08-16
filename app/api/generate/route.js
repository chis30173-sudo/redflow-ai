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



请生成100条爆款内容方案。



每条包含：


1. 爆款标题

2. 内容方向

3. 用户痛点

4. 商品卖点

5. 热门标签

6. 蓝海指数(0-100)

7. 利润指数(0-100)



目标用户：

小红书卖家

潮玩商家

娃衣商家

明星周边商家



要求：

寻找低竞争、高需求市场。

输出适合直接制作小红书内容的方案。

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



请输出：


1. 当前市场热度


2. 竞争程度


3. 用户画像


4. 爆款内容方向


5. 同类账号打法


6. 可复制机会


7. 蓝海建议



目标：

帮助卖家快速找到赚钱机会。



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



请设计：


1. IP定位


2. 人设标签


3. 内容栏目


4. 30天发布计划


5. 爆款选题


6. 商业变现方式



目标：

打造可以长期赚钱的小红书个人IP。



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


1. 市场需求


2. 用户需求


3. 竞争情况


4. 利润空间


5. 推荐玩法


6. 蓝海评分



适合：

潮玩

娃衣

明星周边

小红书电商



`

    }





    // =========================
    // 默认单条生成
    // =========================

    else{


      prompt = `


你是一名小红书爆款内容专家。



产品：

${input}



生成：


1. 爆款标题


2. 小红书文案


3. 商品卖点


4. 热门标签


5. 蓝海评分


6. 利润评分



适合：

潮玩

娃衣

明星周边市场。



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

              content:"你是专业的小红书商业AI助手"

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



    const result =

      data.choices?.[0]?.message?.content ||

      "生成失败"




    return Response.json({

      result

    })





  } catch(error){


    return Response.json({

      error:error.message

    })


  }


}
