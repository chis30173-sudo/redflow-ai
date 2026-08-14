"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Home(){


const [mode,setMode]=useState("topic");


const [industry,setIndustry]=useState("");
const [target,setTarget]=useState("");
const [platform,setPlatform]=useState("");


const [content,setContent]=useState("");


const [result,setResult]=useState("");

const [loading,setLoading]=useState(false);


const [history,setHistory]=useState([]);



// 获取历史记录

async function getHistory(){


const {data,error}=await supabase

.from("generations")

.select("*")

.order("created_at",{ascending:false})

.limit(10);



if(!error){

setHistory(data || []);

}


}





useEffect(()=>{


getHistory();


},[]);





async function generate(){


setLoading(true);


setResult("🚀 AI正在分析，请稍等...");



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



const aiText=data.text || "生成失败";



setResult(aiText);



// 保存到 Supabase


await supabase

.from("generations")

.insert({


type:mode,


input:

mode==="topic"

?

industry

:

content,


output:aiText


});



// 更新历史

getHistory();



}


catch(e){


setResult(

"请求失败，请检查网络"

);


}



setLoading(false);


}





function copyText(text){


navigator.clipboard.writeText(text);


alert("复制成功");


}





async function deleteHistory(id){


await supabase

.from("generations")

.delete()

.eq("id",id);



getHistory();


}





return(


<main

style={{

padding:"40px",

maxWidth:"900px"

}}

>


<h1>

🚀 RedFlow AI

</h1>


<p>

AI爆款内容增长助手

</p>
<section>

<div
style={{
margin:"30px 0"
}}
>


<button

onClick={()=>setMode("topic")}

>

🔥 爆款选题

</button>



<button

style={{marginLeft:"10px"}}

onClick={()=>setMode("article")}

>

✍️ 爆款图文

</button>




<button

style={{marginLeft:"10px"}}

onClick={()=>setMode("rewrite")}

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

onChange={(e)=>setIndustry(e.target.value)}

/>




<p>目标用户</p>


<input

value={target}

onChange={(e)=>setTarget(e.target.value)}

/>



<p>平台</p>


<input

value={platform}

onChange={(e)=>setPlatform(e.target.value)}

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

"🎯 一键对标同行"

}


</h2>



<textarea

rows="10"

value={content}

onChange={(e)=>setContent(e.target.value)}


placeholder={

mode==="article"

?

"输入主题，例如：大学生护肤"

:

"粘贴同行爆款笔记"

}

/>


</section>


}






<button

onClick={generate}

style={{

marginTop:"25px",

fontSize:"16px"

}}

>

🚀 开始生成

</button>





<h2

style={{

marginTop:"50px"

}}

>

📌 AI生成结果

</h2>




<div

style={{

background:"#f7f7f7",

padding:"25px",

borderRadius:"15px",

lineHeight:"1.8",

minHeight:"150px"

}}

>


{

loading

?

"AI正在思考..."

:

result

}


</div>




{

result &&

<button

onClick={()=>copyText(result)}

style={{

marginTop:"15px"

}}

>

📋 复制全部内容

</button>

}





<hr

style={{

margin:"50px 0"

}}

/>





<h2>

📚 历史生成记录

</h2>





{

history.length===0

?

<p>

暂无记录

</p>


:

history.map((item)=>(



<div

key={item.id}

style={{

background:"#fafafa",

padding:"20px",

marginBottom:"20px",

borderRadius:"12px"

}}

>


<p>

类型：

{item.type}

</p>



<p>

输入：

{item.input}

</p>




<pre

style={{

whiteSpace:"pre-wrap",

lineHeight:"1.6"

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

style={{

marginLeft:"10px"

}}

onClick={()=>deleteHistory(item.id)}

>

🗑删除

</button>




</div>


))


}



</main>


);


}
