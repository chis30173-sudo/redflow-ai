export async function POST(req) {

  try {


    const body = await req.json();


    const {
      type,
      prompt,
      topic,
      industry,
      target,
      platform
    } = body;



    let finalPrompt = "";



    // ==========================
    // 模式1：爆款选题
    // ==========================

    if(type === "topic"){

      finalPrompt = `

你是一名小红书爆款内容策划专家。

请根据以下信息生成10个爆款内容选题：

行业：
${industry}

目标用户：
${target}

平台：
${platform}


每个选题包含：

1. 爆款标题
2. 为什么容易爆
3. 内容方向
4. 推荐标签


要求：
符合小红书用户习惯。
标题要有点击欲望。
不要生成普通标题。


`;

    }



    // ==========================
    // 模式2：爆款图文
    // ==========================


    else if(type === "copywriting"){


      finalPrompt = `


你是一名小红书爆款图文运营专家。


请根据下面信息生成一篇爆款笔记：


主题：

${topic}


行业：

${industry}


目标用户：

${target}


发布平台：

${platform}



请输出：


🔥 爆款标题

要求：
制造好奇、痛点、冲突。


✍️ 图文正文

要求：
包含：

开头3秒吸引用户

正文内容

用户痛点

解决方案

行动引导


🎯 爆款原因


🏷️ 推荐标签


💰 适合变现方式



语言：
像真实小红书博主发布。


`;

    }




    // 默认模式

    else{

      finalPrompt = prompt;

    }





    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":
          `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },


        body:JSON.stringify({

          model:"deepseek-chat",

          messages:[

            {
              role:"user",
              content:finalPrompt
            }

          ],


          temperature:0.8

        })

      }
    );




    const data = await response.json();



    if(!data.choices){

      return Response.json({

        error:"DeepSeek返回错误",

        detail:data

      });

    }




    return Response.json({

      text:
      data.choices[0].message.content

    });




  } catch(error){


    return Response.json({

      error:error.message

    });


  }


}
