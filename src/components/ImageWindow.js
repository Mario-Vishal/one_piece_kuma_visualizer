import { useState,useRef, useEffect } from "react"
import UploadButton from "./UploadButton"
import useImageResize from "../hooks/useImageResize";




export default function ImageWindow({imageSrc,setImageSrc,uploadData,data}){

    // const [imgFile,setImgFile]=useState(null)
    
    // const {imageSize:imageSize,ref:imgRef,updateSize:updateSize} = useImageResize();
    const [imageSize,setImageSize] = useState({width:0,height:0})
    const [orgImageSize,setOrgImageSize] = useState({width:0,height:0})

    const ref = useRef(null)
    const imageWindowRef = useRef(null)

    function updateSize(){

        if(ref.current){
            setImageSize({
                width:ref.current.clientWidth,
                height:ref.current.clientHeight
            });
        }
    }

    function calculateImageSize(width,height) {
        
        if(ref.current && imageWindowRef.current){

            const divWidth = imageWindowRef.current.clientWidth;
            const divHeight = imageWindowRef.current.clientHeight;
            // console.log(`sdfdsf ${imageWindowRef.current.clientWidth}`);
            // console.log("div width and height ->",divWidth,divHeight);
            
            const imgAspectRatio = width/height;
            const divAspectRatio = divWidth/divHeight;

            let newWidth,newHeight;

            if(imgAspectRatio>=1){
                newWidth = divWidth;
                newHeight = divWidth/imgAspectRatio;
                // newHeight = -1
            }
            else{
                newHeight = divHeight;
                // console.log(divHeight,orgImageSize.width);
                // newWidth = -1
                newWidth = divHeight*imgAspectRatio;
            }

            // console.log(`new ->>> ${newWidth} x ${newHeight} ${imgAspectRatio} ${newWidth/newHeight} ${width}/ ${height}`);
            
            // ref.current.style.width = `${newWidth * 0.8}px`;
            ref.current.style.width = `${newWidth}px`;
            ref.current.style.height = `${newHeight}px`;

        }
    }

    // useEffect(() => {
    //     if(imageSrc){
    //         calculateImageSize(orgImageSize.width, orgImageSize.height);
    //     }

    //     const handleResize = () => {
    //         calculateImageSize(orgImageSize.width, orgImageSize.height);
    //         updateSize()

    //     }
    //     // initialize size on mount
    //     window.addEventListener('resize',handleResize);
    //     // window.addEventListener('resize',calculateImageSize)
    //     updateSize();

    //     return ()=> window.removeEventListener('resize',handleResize);
    // },[imageSrc,orgImageSize]);

    // useEffect(() => {
    //     imgRef.current.focus();
    // },[]);
    
    async function handleImageUpload(e){

        const file = e.target.files[0]
        const reader = new FileReader();
        const img = new Image();
        
        
        img.onload = () => {

            setOrgImageSize({
                width:img.naturalWidth,
                height:img.naturalHeight
            })
            
            // console.log(`Original Image Size: ${img.naturalWidth}x${img.naturalHeight}`);
            // console.log(`Update Image Size: ${orgImageSize.width}x${orgImageSize.height}`);
            // console.log(`div size ${imageWindowRef.current.clientWidth} x ${imageWindowRef.current.clientHeight}`);
            
            calculateImageSize(img.naturalWidth,img.naturalHeight)
            uploadData(file,{width:ref.current.clientWidth,height:ref.current.clientHeight});
        }
        

        reader.onloadend = () => {
            img.src = reader.result
            // console.log(img);
            setImageSrc(reader.result)
            
        };
        // calculateImageSize();
        updateSize();
        
        
        reader.readAsDataURL(file)
        
        
        // await uploadData(file,{width:ref.current.clientWidth,height:ref.current.clientHeight});
        
    }



    function handleOnHoverBoundingBox(e,name){

        console.log(name);
        console.log(imageSize);
        
    }

    


    return (
        <div className="image-window-main" >
        <div className="image-window" ref={imageWindowRef}>

            {imageSrc ?

            <>
                <img ref={ref} src={imageSrc} alt="placeholder-img" />
                
                { data && 

                Object.keys(data).map((key) => (

                        <div
                            key={key}
                            className="bounding-box"
                            style={{
                                left: `${data[key]["bbox"][0]}px`,
                                top: `${data[key]["bbox"][1]}px`,
                                width: `${data[key]["bbox"][2]- data[key]["bbox"][0]}px`,
                                height: `${data[key]["bbox"][3] - data[key]["bbox"][1]}px`
                            }}
                            onMouseEnter={(e)=> handleOnHoverBoundingBox(e,data[key].name) }
                        >
                            
                        </div>
                    
                    ))    
                }
            </>
           :
           <>
           <h1>Upload or Select a sample image for analysis</h1>
           </>
            }

            
        </div>
        <UploadButton handleImageUpload={handleImageUpload} on_uploaded_class={`'upload-btn`}/>

        </div>

    )

}