export async function POST(request) {

  const body = await request.json()

  const product = body.product


  const result = {

    title:
    `🔥 ${product} 爆款标题：今年最火的${product}，年轻人都在收藏`,

    content:
    `${product}最近热度持续上涨。

适合作为潮流消费品推广，打造爆款内容。`,

    tags:
    "#潮玩 #爆款 #小红书 #热门推荐"

  }


  return Response.json(result)

}
