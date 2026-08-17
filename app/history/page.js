"use client"

import {useEffect,useState} from "react"



export default function History(){


const [records,setRecords]=useState([])



// 加载历史

useEffect(()=>{


const data=localStorage.getItem("history")


if(data){

setRecords(JSON.parse(data))

}


},[])





// 删除单条

function remove(index){


const list=[...records]


list.splice(index,1)


setRecords(list)


localStorage.setItem(

"history",

JSON.stringify(list)

)


}





// 清空

function clearAll(){


localStorage.removeItem("history")


setRecords([])


}






return (


<div


style={{


minHeight:"100vh",

background:"#020617",

color:"#fff",

padding:"40px"


}}



>


<h1>

📚 我的历史记录

</h1>





<button


onClick={()=>window.location.href="/"}



style={{


marginRight:"15px"

}}



>


返回首页

</button>





<button


onClick={clearAll}



>


清空记录

</button>








{


records.length===0 ?



<p

style={{

marginTop:"40px",

color:"#94a3b8"

}}

>

暂无生成记录

</p>



:



records.map((item,index)=>(



<div


key={index}


style={{


marginTop:"25px",

background:"#1e293b",

padding:"25px",

borderRadius:"20px"


}}



>


<h2>


🔥 {item.mode}

</h2>





<p>


产品：

{item.input}


</p>





<p


style={{


color:"#94a3b8"

}}



>


时间：

{item.time}


</p>







<pre


style={{


whiteSpace:"pre-wrap",

background:"#0f172a",

padding:"15px",

borderRadius:"10px"


}}



>


{JSON.stringify(

item.result,

null,

2

)}



</pre>





<button


onClick={()=>remove(index)}



>


删除

</button>





</div>



))



}





</div>



)


}
