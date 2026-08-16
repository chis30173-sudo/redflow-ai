"use client"

import { useState } from "react"
import FeatureCard from "./components/FeatureCard"
import ResultCard from "./components/ResultCard"


export default function Home(){

  const [mode,setMode]=useState("blue")
  const [input,setInput]=useState("")
  const [result,setResult]=useState("")
  const [loading,setLoading]=useState(false)



  const features=[

    {
      id:"blue",
      title:"🔥 蓝海商品发现",
      desc:"寻找值得进入的新机会"
    },

    {
      id:"content",
      title:"✍️ 爆款内容工厂",
      desc:"快速生成小红书内容"
    },

    {
      id:"analyze",
      title:"📊 爆款拆解",
      desc:"分析热门产品逻辑"
    },

    {
      id:"ip",
      title:"🚀 个人IP打造",
      desc:"规划账号成长路线"
    }

  ]



  async function generate(){

    if(!input){
      alert("请输入内容")
      return
    }


    setLoading(true)
    setResult("")


    try{


      const res=await fetch(
        "/api/generate",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            mode,
            input

          })

        }
      )


      const data=await res.json()


      setResult(
        data.result || data.error
      )


    }catch(e){

      setResult(e.message)

    }


    setLoading(false)

  }




  return(

    <main

      style={{

        minHeight:"100vh",

        background:"#0f172a",

        color:"#fff",

        padding:"40px"

      }}

    >


      <div

        style={{

          maxWidth:"1000px",

          margin:"auto"

        }}

      >


        <h1

          style={{

            textAlign:"center",

            fontSize:"45px"

          }}

        >

          🚀 RedFlow AI

        </h1>


        <p

          style={{

            textAlign:"center",

            fontSize:"22px"

          }}

        >

          小红书潮玩电商增长智能助手

        </p>




        <div

          style={{

            display:"grid",

            gridTemplateColumns:"repeat(2,1fr)",

            gap:"20px",

            marginTop:"40px"

          }}

        >

        {

          features.map(item=>(

            <FeatureCard

              key={item.id}

              title={item.title}

              desc={item.desc}

              active={mode===item.id}

              onClick={()=>setMode(item.id)}

            />

          ))

        }


        </div>





        <div

          style={{

            marginTop:"40px",

            background:"#1e293b",

            padding:"30px",

            borderRadius:"20px"

          }}

        >


          <textarea

            value={input}

            onChange={
              e=>setInput(e.target.value)
            }


            placeholder="例如：潮玩娃衣、Labubu周边、小红书账号定位"


            style={{

              width:"100%",

              height:"130px",

              padding:"15px",

              borderRadius:"12px",

              fontSize:"18px"

            }}

          />



          <button

            onClick={generate}


            style={{

              marginTop:"20px",

              padding:"15px 40px",

              borderRadius:"30px",

              background:"#ec4899",

              color:"#fff",

              border:"none",

              cursor:"pointer",

              fontSize:"18px"

            }}

          >

          {
            loading
            ?
            "AI分析中..."
            :
            "🔥 开始生成"
          }


          </button>


        </div>



        <ResultCard result={result}/>


      </div>


    </main>

  )

}
