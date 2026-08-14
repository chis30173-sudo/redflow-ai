import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";



export async function POST(req){


try{


const body = await req.json();


const {

mode,

industry,

target,

platform,

content

}=body;



const prompt = `

你是一名顶级内容增长专家。

你的身份：

- 小红书爆款运营专家
- 电商增长顾问
- 内容营销策划师


请根据用户需求生成高质量内容。


用户信息：

内容类型：
${mode}


行业：
${industry}


目标用户：
${target}


发布平台：
${platform}


用户输入：
${content}



请严格按照下面结构输出：



================

🔥 爆款标题（10个）

要求：
- 有点击欲
- 有情绪
- 符合平台风格


================


🚀 开头3秒吸引点

要求：
让用户继续阅读。


================


📝 正文内容


要求：

包含：

1. 用户痛点

2. 解决方案

3. 产品/观点价值

4. 使用场景


================


💬 评论区互动设计

设计3个引导评论的问题。


================


🏷️ 推荐标签

生成10个相关标签。


================



注意：

不要写普通介绍。

要像真实爆款账号发布的内容。

语言自然，不像AI。

`;





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





const result = await response.json();



const text =

result.choices?.[0]?.message?.content ||

"生成失败";





// 保存数据库

await supabase

.from("generations")

.insert({

input:

JSON.stringify({

industry,

target,

platform,

content

}),


output:text,


type:mode


});







return NextResponse.json({

text

});





}

catch(error){


console.log(error);



return NextResponse.json({

error:error.message

},

{

status:500

}

);


}



}
