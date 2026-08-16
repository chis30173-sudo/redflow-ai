export async function POST(request){

  try{

    const body = await request.json()

    const product = body.product


    const apiKey = process.env.OPENAI_API_KEY


    if(!apiKey){

      return Response.json({
        error:"没有找到 OPENAI_API_KEY"
      })

    }


    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${apiKey}`
        },


        body:JSON.stringify({

          model:"gpt-4.1-mini",

          messages:[

            {
              role:"system",
              content:"你是专业电商营销专家"
            },

            {
              role:"user",
              content:`生成商品${product}的小红书爆款内容`
            }

          ]

        })

      }
    )


    const data = await response.json()


    console.log(data)


    if(!data.choices){

      return Response.json({

        error:data

      })

    }


    return Response.json({

      result:data.choices[0].message.content

    })


  }catch(error){


    return Response.json({

      error:error.message

    })


  }


}
