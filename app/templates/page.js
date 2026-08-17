"use client"

import Link from "next/link"


export default function Templates(){


const templates=[


{
name:"🔥 小红书爆款种草",
type:"内容模板",
input:"帮我生成小红书爆款种草文案"
},


{
name:"👗 娃衣穿搭爆款",
type:"潮玩电商",
input:"娃衣穿搭产品，生成爆款方案"
},


{
name:"🧸 潮玩盲盒",
type:"潮玩",
input:"潮玩盲盒产品，分析市场机会"
},


{
name:"⭐ 明星周边开发",
type:"粉丝经济",
input:"明星周边产品商业分析"
},


{
name:"🛒 电商新品测试",
type:"电商",
input:"新品电商项目分析"
},


{
name:"📱 个人IP打造",
type:"个人品牌",
input:"设计个人IP成长方案"
}



]




return(

<div

style={{

minHeight:"100vh",

background:"#020617",

padding:"40px",

color:"#fff"

}}

>


<h1>

🔥 RedFlow AI 模板中心

</h1>


<p>

选择模板，一键生成爆款方案

</p>



<div

style={{

marginTop:"30px",

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",

gap:"20px"

}}

>


{

templates.map((item,index)=>(


<div

key={index}

style={{

background:"#1e293b",

padding:"25px",

borderRadius:"20px"

}}

>


<h2>

{item.name}

</h2>


<p>

分类：

{item.type}

</p>


<Link

href={`/?input=${encodeURIComponent(item.input)}`}

>


<button

style={{

marginTop:"20px",

padding:"12px 20px",

borderRadius:"10px",

border:"none",

cursor:"pointer"

}}

>

立即使用

</button>


</Link>


</div>


))


}


</div>



<br/>


<Link href="/">

返回首页

</Link>



</div>


)


}
