export async function POST(req) {

  try {

    const body = await req.json();

    const {
      mode,
      industry,
      target,
      platform,
      content
    } = body;


    let prompt = "";


    // 1. 爆款选题
    if (mode === "topic") {

      prompt = `
你是一名小红书爆款内容运营专家。

请根据下面信息生成10个爆款选题。

行业：
${industry}

目标用户：
${target}

平台：
${platform}


每个选题输出：

标题：
爆款原因：
内容方向：

要求：
符合小红书爆款逻辑，
有点击欲望，
适合普通创作者。
`;

    }



    // 2. 爆款图文生成
    else if (mode === "article") {


      prompt = `
你是一名小红书爆款图文作者。

根据以下主题生成一篇高互动笔记：

主题：
${content}


输出：

标题：

封面文案：

正文：

第1页：
第2页：
第3页：
第4页：
第5页：


热门标签：
`;

    }




    // 3. 对标同行
    else if (mode === "rewrite") {


      prompt = `
你是一名内容增长专家。

分析下面同行爆款内容：

${content}


请输出：

一、同行爆款原因分析

二、用户痛点分析

三、重新创作一个原创版本


输出：

新标题：

正文：

封面：

标签：
`;

    }



    else {

      prompt = `
请生成一篇优质内容。

${content}
`;

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
              content:prompt
            }

          ],

          temperature:0.8

        })

      }
    );



    const data = await response.json();



    if(!response.ok){

      return Response.json({

        error:data

      });

    }



    return Response.json({

      text:
      data.choices[0].message.content

    });



  }

  catch(error){


    return Response.json({

      error:error.message

    });


  }

}
