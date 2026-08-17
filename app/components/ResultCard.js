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


<hr/>




{

plans.map((item,index)=>(


<div

key={index}

style={{

marginTop:"25px",

background:"#334155",

padding:"25px",

borderRadius:"20px"

}}

>


<h2>

🔥 {index+1}. {item.title}

</h2>





<h3>

📝 文案：

</h3>


<p

style={{

lineHeight:"1.8",

whiteSpace:"pre-wrap"

}}

>

{item.content}

</p>





<h3>

🏷 标签：

</h3>


<div>

{

item.tags?.map((tag,i)=>(


<span

key={i}

style={{

display:"inline-block",

background:"#ec4899",

padding:"6px 12px",

borderRadius:"20px",

margin:"5px"

}}

>

{tag}

</span>


))

}

</div>






{

item.score &&


<div

style={{

marginTop:"20px",

background:"#0f172a",

padding:"20px",

borderRadius:"15px"

}}

>


<h3>

📊 数据评分

</h3>


<p>

🌊 蓝海指数：

{item.score.blue}

</p>


<p>

🔥 热度指数：

{item.score.hot}

</p>


<p>

💰 利润指数：

{item.score.profit}

</p>


</div>


}






<button

onClick={()=>{

navigator.clipboard.writeText(

`

${item.title}


${item.content}


标签：

${item.tags?.join(" ")}

`

)

}}

style={{

marginTop:"20px",

padding:"10px 25px",

borderRadius:"20px",

cursor:"pointer"

}}

>

📋 复制方案

</button>



</div>


))


}



</div>


)


}
