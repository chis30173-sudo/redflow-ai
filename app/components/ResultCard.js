"use client"

export default function ResultCard({result}){


if(!result){

return null

}


const plans = result.plans || []



return (

<div

style={{

marginTop:"30px",

background:"#1e293b",

padding:"30px",

borderRadius:"20px",

color:"#fff"

}}

>


<h2>

🔥 AI爆款方案

</h2>



{

plans.map((plan,index)=>(


<div

key={index}

style={{

marginTop:"25px",

background:"#334155",

padding:"25px",

borderRadius:"15px"

}}

>



<h2>

🔥 {index+1}. {plan.title}

</h2>





{/* 普通内容 */}

{

plan.content &&

<div>

📝 文案：

<p>

{plan.content}

</p>

</div>

}





{/* A8.1 六页图文 */}

{

plan.pages &&


<div>


<h3>

📸 六页小红书图文方案

</h3>



{


plan.pages.map((page)=>(
 


<div

key={page.page}

style={{

marginTop:"20px",

background:"#0f172a",

padding:"20px",

borderRadius:"12px"

}}

>



<h3>

第 {page.page} 页

</h3>


<p>

📌 标题：

{page.title}

</p>



<p>

📝 文案：

{page.content}

</p>



<p>

🎨 图片Prompt：

{page.image_prompt}

</p>



</div>



))


}



</div>

}





{/* 标签 */}

{

plan.tags &&


<div

style={{

marginTop:"20px"

}}

>


🏷 标签：


{


plan.tags.map((tag,i)=>(


<span

key={i}

style={{

background:"#ec4899",

padding:"8px 12px",

borderRadius:"20px",

margin:"5px",

display:"inline-block"

}}

>

{tag}

</span>


))


}



</div>


}





{/* 评分 */}


{

plan.score &&


<div

style={{

marginTop:"20px",

background:"#020617",

padding:"15px",

borderRadius:"10px"

}}

>


📊 数据评分


<p>

🌊 蓝海指数：

{plan.score.blue}

</p>


<p>

🔥 热度指数：

{plan.score.hot}

</p>


<p>

💰 利润指数：

{plan.score.profit}

</p>



</div>


}





</div>



))


}



</div>


)


}
