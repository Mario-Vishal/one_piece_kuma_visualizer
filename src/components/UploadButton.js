import { useRef } from "react"


export default function UploadButton({handleImageUpload,on_uploaded_class}){

    const inputRef = useRef(null);

    const handleUploadButtonClick = () => {

        inputRef.current.click()
    }


    return (
        <div className="upload-window">
            <button type="button" onClick={handleUploadButtonClick} className="upload-btn">
                Upload Image
            </button>
            <input ref={inputRef} type="file" accept="image/*" onChange={(e)=>handleImageUpload(e)} className="upload-btn" title="" style={{display:'none'}}/>
        </div>
        
    )
    
}