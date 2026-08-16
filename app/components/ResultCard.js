export default function ResultCard({result}){


if(!result){
  return null
}


return (

<div
style={{
marginTop:"30px",
background:"#1e293b",
padding:"25px",
borderRadius:"20px",
color:"#fff"
}}
>


<h2>
🔥 AI爆款方案
</h2>


<hr/>


{
result.plans ?

result.plans.map((item,index)=>(


<div
key={index}
style={{
marginTop:"25px",
padding:"20px",
background:"#334155",
borderRadius:"15px"
}}
>


<h3>
🔥 {index+1}. {item.title}
</h3>


<p>

<b>📝 文案：</b>

</p>

<p
style={{
whiteSpace:"pre-wrap",
lineHeight:"1.8"
}}
>

{item.content}

</p>



<p>

<b>🏷 标签：</b>

{item.tags}

</p>




{
item.score &&

<div>

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


</div>


))

:

<div>
{JSON.stringify(result)}
</div>


}



</div>

)


}
