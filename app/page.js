"use client"

import { useState } from "react"


export default function Home(){

  const [product,setProduct] = useState("")
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")


  async function generate(){

    if(!product){
      alert("请输入商品")
      return
    }


    setLoading(true)
    setResult(null)
    setError("")


    try{

      const res = await fetch("/api/generate",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          product
        })

      })


      const data = await res.json()


      if(data.error){

        setError(data.error)
        setLoading(false)
        return

      }


      // DeepSeek 返回的是 JSON 字符串
      const jsonResult = JSON.parse(data.result)


      setResult(jsonResult)



    }catch(err){

      setError(err.message)

    }


    setLoading(false)

  }



  return (

    <main
    style={{
      minHeight:"100vh",
      background:"#0f172a",
      color:"white",
      padding:"40px"
    }}
    >


      <div
      style={{
        maxWidth:"900px",
        margin:"auto",
        textAlign:"center"
      }}
      >


        <h1
        style={{
          fontSize:"48px"
        }}
        >
          🚀 RedFlow AI
        </h1>


        <p
        style={{
          fontSize:"22px"
        }}
        >
          AI爆款内容生成平台
        </p>



        <div
        style={{
          background:"#1e293b",
          padding:"30px",
          borderRadius:"20px",
          marginTop:"40px"
        }}
        >


          <input

          value={product}

          onChange={(e)=>setProduct(e.target.value)}

          placeholder="输入商品，例如 Labubu 毛绒玩偶"

          style={{

            width:"80%",
            padding:"15px",
            fontSize:"18px",
            borderRadius:"10px"

          }}

          />



          <br/>


          <button

          onClick={generate}

          style={{

            marginTop:"20px",
            padding:"15px 40px",
            borderRadius:"30px",
            background:"#ff3366",
            color:"white",
            fontSize:"18px",
            cursor:"pointer"

          }}

          >

          {
            loading
            ?
            "AI生成中..."
            :
            "🔥立即生成爆款内容"
          }


          </button>


        </div>





        {
          error &&

          <div
          style={{
            marginTop:"30px",
            background:"#7f1d1d",
            padding:"20px",
            borderRadius:"15px"
          }}
          >

          ❌ {error}

          </div>

        }





        {
          result &&

          <div

          style={{

            marginTop:"40px",
            background:"#1e293b",
            padding:"30px",
            borderRadius:"20px",
            textAlign:"left"

          }}

          >


          <h2>
          🔥 {result.title}
          </h2>



          <hr/>



          <h3>
          📝 小红书文案
          </h3>


          <p>
          {result.content}
          </p>




          <h3>
          🎬 TikTok脚本
          </h3>


          <p>
          {result.tiktok}
          </p>





          <h3>
          💡 商品卖点
          </h3>


          <p>
          {result.selling_points}
          </p>





          <h3>
          🏷️ 标签
          </h3>


          <p>
          {result.tags}
          </p>



          </div>


        }



      </div>


    </main>

  )


}
