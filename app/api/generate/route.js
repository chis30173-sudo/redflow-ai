export async function POST(request) {
  try {
    const { product } = await request.json();

    if (!product) {
      return Response.json({
        error: "请输入商品"
      });
    }


    const prompt = `
你是一名专业电商爆款内容专家。

请根据商品：
${product}

生成：

1. 小红书爆款标题（3个）
2. 爆款文案
3. TikTok短视频脚本
4. 商品卖点
5. 推荐标签

要求：
年轻化、有营销力、适合社交媒体传播。
`;


    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":
          `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body:JSON.stringify({
          model:"gpt-4o-mini",
          messages:[
            {
              role:"user",
              content:prompt
            }
          ]
        })
      }
    );


    const data = await response.json();


    return Response.json({
      result:
      data.choices[0].message.content
    });


  } catch(error){

    return Response.json({
      error:error.message
    });

  }
}
