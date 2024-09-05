export default function ImageCard({sampleImageSrc,setImageSrc,children}){

    

    return (
        <div className="image-card" onClick={()=>setImageSrc(sampleImageSrc)}
        style={
            {
                background:`url(${sampleImageSrc})`,backgroundRepeat:"no-repeat",backgroundPosition:"cover",backgroundSize:"cover"
            }
        }
        >
            <h4>{children}</h4>
            {/* <img src={sampleImageSrc} alt="sample-image" /> */}
            
        </div>
    )
}