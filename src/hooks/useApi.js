import { useState,useCallback } from "react";

const useApi = (url) => {

    const [loading,setLoading]= useState(false);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    const uploadData = useCallback( async (imageFile,imageSize) => {

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('imageSize',JSON.stringify(imageSize));
        console.log("ggggg",imageSize);
        
    
        fetch(url,{
                method:"POST",
                body:formData
            }).then((response) => {

                if (!response.ok){
                    throw new Error("Something Went Wrong!")
                }
                return response.json()
            }).then((result)=>{
                console.log(result);
                console.log(`logging from uploadImage ${result}`);
                setData(result)
            }).catch(err =>{
            setError(err.message);
        })
        .finally( () => {
            setLoading(false);
        });

    },[url]);

    return {uploadData,data,loading,error}
}

export default useApi;