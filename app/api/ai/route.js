import { NextResponse } from "next/server";


export async function POST(request) {

  try {


    const body = await request.json();


    const apiKey = process.env.DEEPSEEK_API_KEY;


    if (!apiKey) {

      return NextResponse.json({

        error:"API KEY不存在"

      });

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
你是RedFlow AI内容增长专家。

必须返回JSON格式。

不要输出任何解释文字。

格式必须如下：

[
 {
  "title":"标题",
  "reason":"爆款原因",
  "direction":"内容方向"
 }
]

生成5个内容。

`

            },


            {

              role:"user",

              content:body.prompt

            }


          ]

        })

      }
    );



    const data = await response.json();


    const text =
      data.choices?.[0]?.message?.content || "";



    return NextResponse.json({

      text:text

    });



  } catch(error){


    return NextResponse.json({

      error:error.message

    });


  }

}
