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
🔥 AI分析结果
</h2>


<hr/>


<h3>
{result.title}
</h3>


<div
style={{
whiteSpace:"pre-wrap",
lineHeight:"1.8"
}}
>

{result.content}

</div>


<p>
{result.tags}
</p>


<button

onClick={()=>{

navigator.clipboard.writeText(
JSON.stringify(result,null,2)
)

}}

style={{
marginTop:"20px",
padding:"10px 25px",
borderRadius:"20px"
}}

>

📋复制结果

</button>


</div>

)

}
