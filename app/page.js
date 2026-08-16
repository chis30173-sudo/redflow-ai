"use client"

import { useState } from "react"

export default function Home() {

  const [mode, setMode] = useState("blue")
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)


  const modes = [
    {
      id: "blue",
      title: "🔥 蓝海商品发现",
      desc: "找到值得卖的产品机会"
    },
    {
      id: "content",
      title: "✍️ 爆款内容工厂",
      desc: "生成小红书爆款图文"
    },
    {
      id: "analyze",
      title: "📊 爆款笔记拆解",
      desc: "分析别人为什么爆"
    },
    {
      id: "ip",
      title: "🚀 个人IP打造",
      desc: "规划账号成长路线"
    }
  ]


  async function generate() {

    if (!input) {
      alert("请输入内容")
      return
    }


    setLoading(true)
    setResult("")


    try {

      const res = await fetch("/api/generate", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          mode,
          input
        })

      })


      const data = await res.json()

      setResult(
        data.result || data.error
      )


    } catch(error) {

      setResult(error.message)

    }


    setLoading(false)

  }



  return (

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
            fontSize:"48px",
            textAlign:"center"
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
          小红书商业增长智能助手
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
          modes.map(item=>(

            <button

              key={item.id}

              onClick={()=>setMode(item.id)}

              style={{

                padding:"25px",

                borderRadius:"16px",

                background:
                mode===item.id
                ?
                "#ec4899"
                :
                "#1e293b",

                color:"white",

                cursor:"pointer"

              }}

            >

              <h2>{item.title}</h2>

              <p>{item.desc}</p>


            </button>

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

            placeholder="输入产品、行业、账号情况，例如：潮玩娃衣，小红书卖货"

            value={input}

            onChange={
              e=>setInput(e.target.value)
            }

            style={{
              width:"100%",
              height:"120px",
              padding:"15px",
              fontSize:"18px",
              borderRadius:"10px"
            }}

          />


          <button

            onClick={generate}

            style={{

              marginTop:"20px",

              padding:"15px 40px",

              borderRadius:"30px",

              background:"#f43f5e",

              color:"white",

              fontSize:"18px",

              cursor:"pointer"

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

          <div

            style={{

              marginTop:"40px",

              background:"#1e293b",

              padding:"30px",

              borderRadius:"20px",

              whiteSpace:"pre-wrap"

            }}

          >

            {result}

          </div>

        }


      </div>

    </main>

  )

}
