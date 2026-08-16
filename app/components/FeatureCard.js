export default function FeatureCard({
  title,
  desc,
  active,
  onClick
}) {


  return (

    <div

      onClick={onClick}

      style={{

        padding:"25px",

        borderRadius:"18px",

        background:
        active
        ?
        "#ec4899"
        :
        "#1e293b",

        color:"#fff",

        cursor:"pointer",

        transition:"0.3s"

      }}

    >

      <h2>
        {title}
      </h2>


      <p>
        {desc}
      </p>


    </div>

  )

}
