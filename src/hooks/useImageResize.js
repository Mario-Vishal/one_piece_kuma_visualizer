import { useCallback, useEffect, useRef, useState } from "react";

const useImageResize = () => {
    
    const [imageSize,setImageSize] = useState({width:0,height:0})
    const ref = useRef(null)


    // const updateSize = useCallback(() => {
    
        
    //     if(ref.current){
    //         setImageSize({
    //             width:ref.current.clientWidth,
    //             height:ref.current.clientHeight
    //         });
    //     }

    //     console.log(imageSize);
        
        

    // },[imageSize])
    
    useEffect(() => {

        // initialize size on mount

        function updateSize(){
            if(ref.current){
                setImageSize({
                    width:ref.current.clientWidth,
                    height:ref.current.clientHeight
                });
            }
        }
    
        window.addEventListener('resize',updateSize);
        updateSize();

        return ()=> window.removeEventListener('resize',updateSize);
    },[]);

    return [imageSize,ref]
}

export default useImageResize;