export default function ScoreCard({score}) {

  if(!score){
    return null
  }


  return (

    <div

      style={{
        marginTop:"25px",
        background:"#0f172a",
        padding:"25px",
        borderRadius:"20px",
        color:"#fff"
      }}

    >


      <h2>
        📊 爆款评分分析
      </h2>


      <hr/>


      <p>
        🌊 蓝海指数：
        {score.blue || 85}
      </p>


      <p>
        🔥 热度指数：
        {score.hot || 90}
      </p>


      <p>
        ⚔️ 竞争指数：
        {score.compete || 35}
      </p>


      <p>
        💰 利润指数：
        {score.profit || 80}
      </p>



      <h3>

        综合评分：
        {score.total || 88} 分

      </h3>



      <div

        style={{
          background:"#1e293b",
          padding:"15px",
          borderRadius:"12px"
        }}

      >

        ✅ 推荐测试

        <br/>

        ✅ 适合小红书账号打造

        <br/>

        ✅ 适合寻找蓝海机会


      </div>


    </div>

  )

}
