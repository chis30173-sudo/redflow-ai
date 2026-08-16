export default function ResultCard({result}) {

  if(!result){
    return null
  }


  return (

    <div
      style={{
        marginTop:"30px",
        background:"#1e293b",
        padding:"25px",
        borderRadius:"20px",
        color:"#fff"
      }}
    >

      <h2>
        🔥 AI分析结果
      </h2>


      <hr/>


      <div
        style={{
          whiteSpace:"pre-wrap",
          lineHeight:"1.8"
        }}
      >

        {result}

      </div>


      <button

        onClick={()=>{
          navigator.clipboard.writeText(result)
        }}

        style={{
          marginTop:"20px",
          padding:"10px 25px",
          borderRadius:"20px",
          cursor:"pointer"
        }}

      >

        📋 复制内容

      </button>


    </div>

  )

}
