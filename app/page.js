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


// 爆款模板库

const templates=[

{
name:"💄 美妆种草模板",
text:"请生成一个小红书美妆种草笔记，包含吸引人的标题、痛点开头、产品卖点、使用体验和购买引导。"
},

{
name:"🔥 产品测评模板",
text:"请生成一个真实产品测评内容，需要包含优点、缺点、适合人群、避坑建议。"
},

{
name:"⚠️ 避坑分享模板",
text:"请生成一个小红书避坑类爆款内容，用真实经历分享，引发用户评论互动。"
},

{
name:"🛒 电商卖货模板",
text:"请生成一个高转化销售文案，突出用户痛点、产品价值、购买理由。"
},

{
name:"🎬 短视频脚本模板",
text:"请生成一个30秒短视频脚本，包括前三秒吸引点、内容展开、行动号召。"
},

{
name:"📚 知识分享模板",
text:"请生成一个知识类爆款文章，包含标题、核心观点、案例和互动问题。"
}


];





async function generate(){

setLoading(true);

setResult("🚀 AI正在生成，请稍等...");


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


setResult(

data.text ||

"生成失败"

);



loadHistory();


}

catch(error){

setResult(

"请求失败"

);

}


setLoading(false);

}




async function loadHistory(){


const {

data

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




<h2>
🔥 爆款模板库
</h2>


<div

style={{

display:"grid",

gap:"10px"

}}

>


{

templates.map((item,index)=>(


<button

key={index}

onClick={()=>{

setContent(item.text);

setMode("article");

}}

style={{

padding:"12px",

textAlign:"left"

}}

>

{item.name}

</button>


))


}


</div>






<hr

style={{

margin:"30px 0"

}}

/>





<div>


<button

onClick={()=>setMode("topic")}

>

🔥 爆款选题

</button>



<button

style={{

marginLeft:"10px"

}}

onClick={()=>setMode("article")}

>

✍️ 爆款图文

</button>



<button

style={{

marginLeft:"10px"

}}

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


<p>
行业
</p>


<input

value={industry}

onChange={

e=>setIndustry(e.target.value)

}

/>



<p>
目标用户
</p>


<input

value={target}

onChange={

e=>setTarget(e.target.value)

}

/>



<p>
平台
</p>


<input

value={platform}

onChange={

e=>setPlatform(e.target.value)

}

/>



</section>


}





{

(mode==="article" ||

mode==="rewrite")

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

rows="10"

value={content}

onChange={

e=>setContent(e.target.value)

}

placeholder="输入内容或选择上面的模板"

/>



</section>


}






<button

onClick={generate}

style={{

marginTop:"20px",

fontSize:"16px"

}}

>

🚀 开始生成

</button>







<h2

style={{

marginTop:"40px"

}}

>

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

🕒

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

style={{

marginLeft:"10px"

}}

onClick={()=>deleteItem(item.id)}

>

🗑删除

</button>



</div>


))


}





</main>

)


}
