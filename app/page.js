"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


export default function Home(){

const [mode,setMode]=useState("topic");

const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");

const [content,setContent]=useState("");

const [result,setResult]=useState("");

const [history,setHistory]=useState([]);

const [loading,setLoading]=useState(false);



async function generate(){

setLoading(true);

setResult("🚀 AI正在生成...");


try{

const res=await fetch("/api/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

mode,

industry,

target,

platform,

content

})

});


const data=await res.json();


setResult(data.text || "生成失败");


// 刷新历史

loadHistory();


}

catch(error){

setResult("请求失败");

}


setLoading(false);

}




async function loadHistory(){

const {

data,
error

}=await supabase

.from("generations")

.select("*")

.order(

"created_at",

{
ascending:false
}

)

.limit(20);



if(data){

setHistory(data);

}


}




async function deleteItem(id){


await supabase

.from("generations")

.delete()

.eq(
"id",
id
);


loadHistory();


}




function copyText(text){


navigator.clipboard.writeText(text);


alert(
"复制成功"
);


}




useEffect(()=>{

loadHistory();

},[]);





return (

<main

style={{

padding:"40px",

maxWidth:"1000px"

}}

>


<h1>
🚀 RedFlow AI
</h1>


<p>
AI爆款内容增长助手
</p>



<div>


<button
onClick={()=>setMode("topic")}
>

🔥 爆款选题

</button>



<button

onClick={()=>setMode("article")}

style={{marginLeft:"10px"}}

>

✍️ 爆款图文

</button>



<button

onClick={()=>setMode("rewrite")}

style={{marginLeft:"10px"}}

>

🎯 对标同行

</button>


</div>





{
mode==="topic"

&&

<section>

<h2>
🔥 爆款选题生成
</h2>


<p>行业</p>

<input

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

/>



<p>目标用户</p>

<input

value={target}

onChange={
e=>setTarget(e.target.value)
}

/>




<p>平台</p>

<input

value={platform}

onChange={
e=>setPlatform(e.target.value)
}

/>


</section>


}




{

(mode==="article" || mode==="rewrite")

&&

<section>


<h2>

{

mode==="article"

?

"✍️ 爆款图文生成"

:

"🎯 对标同行"

}

</h2>



<textarea

rows="8"

value={content}

onChange={
e=>setContent(e.target.value)
}


/>



</section>


}




<button

onClick={generate}

style={{

marginTop:"20px"

}}

>

🚀 开始生成

</button>





<h2>

📌 AI生成结果

</h2>



<div

style={{

background:"#f5f5f5",

padding:"20px",

borderRadius:"12px",

whiteSpace:"pre-wrap"

}}

>

{

loading

?

"AI思考中..."

:

result

}


</div>






<h2

style={{

marginTop:"50px"

}}

>

📚 我的历史生成

</h2>





{

history.map(item=>(


<div

key={item.id}

style={{

border:"1px solid #ddd",

padding:"20px",

marginBottom:"15px",

borderRadius:"12px"

}}

>


<p>

时间：

{

new Date(

item.created_at

)

.toLocaleString()

}

</p>


<p>

输入：

{item.input}

</p>



<pre

style={{

whiteSpace:"pre-wrap"

}}

>

{item.output}

</pre>




<button

onClick={()=>copyText(item.output)}

>

📋复制

</button>



<button

onClick={()=>deleteItem(item.id)}

style={{

marginLeft:"10px"

}}

>

🗑删除

</button>



</div>


))


}





</main>

)

}
