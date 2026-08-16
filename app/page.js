"use client"

import { useState } from "react"


export default function Home(){

  const [product,setProduct] = useState("")
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)


  async function generate(){

    if(!product){
      alert("请输入商品")
      return
    }


    setLoading(true)


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


      setResult(data)


    }catch(error){

      console.log(error)

      alert("生成失败")

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
            🔥 AI生成结果
          </h2>



          <pre

          style={{

            whiteSpace:"pre-wrap",

            lineHeight:"1.8",

            fontSize:"16px"

          }}

          >

          {
            result.result
          }

          </pre>



        </div>

        }



      </div>


    </main>

  )

}
