export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px"
    }}>

      <section style={{
        maxWidth: "900px",
        margin: "auto",
        textAlign: "center"
      }}>

        <h1 style={{
          fontSize:"48px",
          fontWeight:"800"
        }}>
          🚀 RedFlow AI
        </h1>


        <p style={{
          fontSize:"22px",
          marginTop:"20px",
          color:"#cbd5e1"
        }}>
          AI爆款内容生成平台
        </p>


        <div style={{
          background:"#1e293b",
          padding:"30px",
          borderRadius:"20px",
          marginTop:"50px"
        }}>

          <h2>
            输入你的产品
          </h2>


          <input
          placeholder="例如：Labubu 毛绒玩偶"
          style={{
            width:"80%",
            padding:"15px",
            marginTop:"20px",
            borderRadius:"10px",
            border:"none",
            fontSize:"18px"
          }}
          />


          <br/>


          <button
          style={{
            marginTop:"25px",
            padding:"15px 40px",
            background:"#ff3366",
            color:"white",
            border:"none",
            borderRadius:"30px",
            fontSize:"18px",
            cursor:"pointer"
          }}
          >
          🔥 立即生成爆款内容
          </button>


        </div>



        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px",
          marginTop:"50px"
        }}>


          <Card 
          title="小红书爆款"
          text="标题+正文+标签"
          />


          <Card
          title="TikTok脚本"
          text="短视频带货脚本"
          />


          <Card
          title="电商文案"
          text="商品卖点生成"
          />


        </div>


        <p style={{
          marginTop:"60px",
          color:"#94a3b8"
        }}>
          免费体验 · AI驱动 · 商业增长工具
        </p>


      </section>


    </main>
  )
}



function Card({title,text}){

return (

<div style={{
background:"#1e293b",
padding:"25px",
borderRadius:"15px"
}}>

<h3>
{title}
</h3>

<p>
{text}
</p>

</div>

)

}
