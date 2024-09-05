import ImageCard from "./ImageCard";

export default function SamplesWindow({samples,setImageSrc}){



    return(
        <div className="samples-window">
            <h3 style={{color:"white"}}>Select a sample image for demo</h3>
            {
                samples.map((sampleImgSrc,index)=>(
                    
                    <ImageCard setImageSrc={setImageSrc} sampleImageSrc={sampleImgSrc} key={index} >Sample Image {index+1}</ImageCard>
                ))
            }

        </div>
    )
}