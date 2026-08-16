"use client";

import { useState } from "react";

export default function Home() {

  const [product,setProduct] = useState("");

  const templates=[
    {
      icon:"🔥",
      name:"美妆爆款模板",
      desc:"生成小红书种草、短视频脚本",
      users:"18-35岁女性"
    },
    {
      icon:"🧸",
      name:"潮玩明星联名模板",
      desc:"玩偶、IP周边、收藏品爆款营销",
      users:"年轻潮玩用户"
    },
    {
      icon:"🛒",
      name:"电商带货模板",
      desc:"商品标题、卖点、销售话术",
      users:"购物用户"
    },
    {
      icon:"⭐",
      name:"个人IP模板",
      desc:"打造个人品牌爆款内容",
      users:"粉丝用户"
    }
  ];


return (

<main
style={{
fontFamily:"Arial",
padding:"40px",
maxWidth:"1100px",
margin:"auto"
}}
>


<section
style={{
textAlign:"center",
padding:"60px 20px"
}}
>

<h1
style={{
fontSize:"48px"
}}
>
🔥 RedFlow AI
</h1>


<h2>
AI爆款内容生成平台
</h2>


<p
style={{
fontSize:"20px",
color:"#666"
}}
>
30秒生成小红书、抖音、电商爆款内容
</p>


<div
style={{
marginTop:"30px"
}}
>

<input

value={product}

onChange={(e)=>setProduct(e.target.value)}

placeholder="输入你的产品，例如：明星联名玩偶"

style={{
width:"350px",
padding:"15px",
borderRadius:"10px",
border:"1px solid #ddd"
}}

/>


<button

style={{
marginLeft:"10px",
padding:"15px 25px",
borderRadius:"10px",
background:"#111",
color:"#fff",
cursor:"pointer"
}}

>

免费生成

</button>


</div>


</section>





<section>

<h2>
🔥 热门爆款模板
</h2>


<div

style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}

>


{
templates.map((item,index)=>(

<div

key={index}

style={{

border:"1px solid #eee",

borderRadius:"16px",

padding:"25px",

boxShadow:"0 5px 20px #eee"

}}

>


<h2>

{item.icon} {item.name}

</h2>


<p>
{item.desc}
</p>


<p>
目标用户：
{item.users}
</p>


<button

style={{
padding:"10px 20px",
borderRadius:"8px",
border:"none",
background:"#ff5a5f",
color:"white"
}}

>

立即体验

</button>


</div>

))

}


</div>


</section>





<section

style={{
marginTop:"70px"
}}

>


<h2>
为什么选择 RedFlow AI
</h2>


<ul

style={{
fontSize:"18px",
lineHeight:"2"
}}

>

<li>✅ AI自动生成爆款文案</li>

<li>✅ 行业模板快速复制</li>

<li>✅ 支持电商、潮玩、个人IP</li>

<li>✅ 持续更新热门市场趋势</li>


</ul>


</section>



<section

style={{
marginTop:"60px",
background:"#111",
color:"white",
padding:"40px",
borderRadius:"20px",
textAlign:"center"
}}

>


<h2>
开始打造你的爆款内容
</h2>


<p>
免费体验，无需等待
</p>


<button

style={{
padding:"15px 40px",
borderRadius:"10px",
background:"#fff",
color:"#111",
border:"none"
}}

>

立即开始

</button>


</section>



</main>


)

}
