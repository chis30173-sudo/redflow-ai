export default function ResultCard({result}) {

  if(!result){
    return null
  }


  return (

    <div
      style={{
        marginTop:"30px",
        background:"#111827",
        padding:"30px",
        borderRadius:"24px",
        color:"#fff"
      }}
    >

      <h2>
        🔥 爆款分析结果
      </h2>


      <hr/>


      <section>

        <h3>
          🚀 爆款标题
        </h3>

        <div
          style={{
            background:"#1f2937",
            padding:"15px",
            borderRadius:"12px"
          }}
        >
          {result.title || result}
        </div>


      </section>



      <section>

        <h3>
          📝 小红书爆款文案
        </h3>

        <div
          style={{
            background:"#1f2937",
            padding:"15px",
            borderRadius:"12px",
            whiteSpace:"pre-wrap",
            lineHeight:"1.8"
          }}
        >

          {result.content || result}

        </div>


      </section>




      <section>

        <h3>
          🏷 热门标签
        </h3>

        <div
          style={{
            background:"#1f2937",
            padding:"15px",
            borderRadius:"12px"
          }}
        >

          {result.tags || "#潮玩 #小红书 #爆款"}

        </div>

      </section>




      <section>

        <h3>
          📊 爆款评分
        </h3>


        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(2,1fr)",
            gap:"10px"
          }}
        >

          <div>
            🔥 热度指数：
            {result.hot || 85}
          </div>


          <div>
            🌊 蓝海指数：
            {result.blue || 80}
          </div>


          <div>
            ⚔️ 竞争指数：
            {result.compete || 40}
          </div>


          <div>
            💰 利润指数：
            {result.profit || 75}
          </div>


        </div>


      </section>



      <button

        onClick={()=>{

          navigator.clipboard.writeText(
            JSON.stringify(result,null,2)
          )

        }}

        style={{

          marginTop:"25px",
          padding:"12px 30px",
          borderRadius:"30px",
          border:"none",
          cursor:"pointer"

        }}

      >

        📋 复制爆款方案

      </button>



    </div>

  )

}
