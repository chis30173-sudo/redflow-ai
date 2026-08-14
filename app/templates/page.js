"use client";

import { useState } from "react";
import Link from "next/link";
export default function Templates(){

const templates=[
{
name:"🔥 美妆爆款模板",
industry:"美妆",
target:"18-35岁女性"
},

{
name:"🛒 电商带货模板",
industry:"电商",
target:"购物用户"
},

{
name:"👤 个人IP模板",
industry:"个人品牌",
target:"粉丝用户"
},

{
name:"👶 母婴爆款模板",
industry:"母婴",
target:"宝妈"
}

];


return(

<main style={{
padding:"40px"
}}>

<h1>
🔥 爆款模板库
</h1>


<p>
选择模板快速生成爆款内容
</p>


{
templates.map((item,index)=>(

<div
key={index}
style={{
border:"1px solid #ddd",
padding:"20px",
margin:"15px 0",
borderRadius:"12px"
}}
>

<h2>
{item.name}
</h2>

<p>
行业：{item.industry}
</p>

<p>
目标用户：{item.target}
</p>


<button>
使用模板
</button>


</div>


))
}


</main>

)

}
