import { supabase } from "../../../lib/supabase";


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



    if (mode === "topic") {


      prompt = `
你是一名小红书爆款内容运营专家。

根据下面信息生成10个爆款选题。


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
有点击欲望。
`;



    }



    else if (mode === "article") {



      prompt = `
你是一名小红书爆款图文作者。


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



    else if (mode === "rewrite") {



      prompt = `
你是一名内容增长专家。


分析下面同行内容：

${content}



输出：

同行爆款原因：

用户痛点：

原创版本：

新标题：

正文：

封面：

标签：
`;



    }



    else {



      prompt = `
生成优质内容：

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





    const aiText =
    data.choices[0].message.content;





    // 保存到 Supabase

    const { error } =
    await supabase
    .from("generations")
    .insert({

      type:mode,

      input:
      content || industry,


      output:
      aiText

    });




    if(error){

      console.log(
        "Supabase error:",
        error
      );

    }





    return Response.json({

      text:aiText

    });





  }


  catch(error){


    return Response.json({

      error:error.message

    });


  }


}
