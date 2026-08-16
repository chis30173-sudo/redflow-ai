"use client"

import { useState } from "react"

import FeatureCard from "./components/FeatureCard"
import ResultCard from "./components/ResultCard"
import ScoreCard from "./components/ScoreCard"



export default function Home(){


  const [mode,setMode] = useState("batch")

  const [input,setInput] = useState("")

  const [result,setResult] = useState(null)

  const [loading,setLoading] = useState(false)



  const features=[


    {
      id:"batch",
      title:"🔥 生成100条爆款",
      desc:"批量生成小红书爆款内容"
    },


    {
      id:"blue",
      title:"🌊 蓝海选品",
      desc:"寻找低竞争高利润机会"
    },


    {
      id:"analyze",
      title:"📊 爆款对标",
      desc:"分析竞品市场打法"
    },


    {
      id:"ip",
      title:"👤 个人IP打造",
      desc:"规划赚钱型个人账号"
    }


  ]





  async function generate(){


    if(!input){

      alert("请输入产品或方向")

      return

    }



    setLoading(true)

    setResult(null)



    try{


      const res = await fetch("/api/generate",{


        method:"POST",


        headers:{


          "Content-Type":"application/json"


        },


        body:JSON.stringify({

          mode,

          input

        })


      })



      const data = await res.json()



      setResult(data.result || data)



    }


    catch(error){


      setResult({

        title:"错误",

        content:error.message,

        tags:"",

        score:{

          blue:0,

          hot:0,

          profit:0

        }

      })


    }



    setLoading(false)


  }






  return (

    <main

      style={{

        minHeight:"100vh",

        background:"#020617",

        padding:"40px",

        color:"#fff"

      }}

    >


      <div

        style={{

          maxWidth:"1100px",

          margin:"auto"

        }}

      >


        <h1

          style={{

            textAlign:"center",

            fontSize:"40px"

          }}

        >

          🔥 RedFlow AI

        </h1>




        <p

          style={{

            textAlign:"center",

            color:"#94a3b8"

          }}

        >

          小红书卖家 · 潮玩商家 · 个人IP增长助手

        </p>





        <div

          style={{

            display:"grid",

            gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

            gap:"20px",

            marginTop:"40px"

          }}

        >


        {

          features.map(item=>(


            <div

              key={item.id}

              onClick={()=>setMode(item.id)}

              style={{

                cursor:"pointer"

              }}

            >


              <FeatureCard

                title={item.title}

                desc={item.desc}

              />


            </div>


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



          <h2>

          当前模式：

          {mode}

          </h2>




          <textarea


            value={input}


            onChange={(e)=>setInput(e.target.value)}


            placeholder="例如：Labubu娃衣、潮玩盲盒、明星周边"


            style={{

              width:"100%",

              height:"120px",

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

              border:"none",

              background:"#ec4899",

              color:"#fff",

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






        {

          result &&

          <ResultCard result={result}/>

        }



        {

          result?.score &&

          <ScoreCard score={result.score}/>

        }




      </div>


    </main>


  )


}
