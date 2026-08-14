import { NextResponse } from "next/server";


export async function POST(request) {

  try {

    const body = await request.json();


    const apiKey = process.env.DEEPSEEK_API_KEY;


    if (!apiKey) {

      return NextResponse.json({
        error:"没有找到 DeepSeek Key"
      });

    }



    const prompt = `

你是 RedFlow AI，一名专业的小红书内容增长专家。

请根据：

行业：
${body.industry}

目标用户：
${body.target}

平台：
${body.platform}


生成10个爆款内容选题。

每个选题包含：

标题
爆款原因
内容方向
封面文案
关键词
变现方式


只输出中文内容。

`;



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
              role:"user",
              content:prompt
            }

          ],

          temperature:0.8

        })

      }
    );



    const data = await response.json();



    console.log(data);



    if(!data.choices){

      return NextResponse.json({

        error:"DeepSeek返回错误",

        detail:data

      });

    }



    return NextResponse.json({

      text:data.choices[0].message.content

    });



  }catch(error){


    console.log(error);


    return NextResponse.json({

      error:"AI生成失败",

      detail:error.message

    },{
      status:500
    });


  }

}
