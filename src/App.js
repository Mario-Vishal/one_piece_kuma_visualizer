import Header from "./components/Header";
// import Body from "./components/Body";
import ImageWindow from "./components/ImageWindow";
import Footer from "./components/Footer";
import { useState,useEffect } from "react";
import ResultsWindow from "./components/ResultsWindow";
import SamplesWindow from "./components/SamplesWindow";
// import useApi from "/hooks/useApi"
import useApi from "./hooks/useApi"

const sampleImages = ['/images/2.jpg','/images/bk_face.png','/images/marine_head.jpg']

const DEFAULT_IMG_SRC = sampleImages[0]

// const boxes = [{left:50,top:50,right:100,bottom:100}]

function App() {


  const [imgSrc,setImageSrc]=useState(null)

  // const [data,setData] = useState({
  //   name: "",
  //   age: 0,
  //   date: "",
  //   programming: "",
  // })

  const {uploadData, data, loading, error} = useApi('http://localhost:5000/predict')

  useEffect(() => {

    fetch("http://localhost:5000/data")
    .then(res => res.json())
    .then((data) => {

        // setData({
        //   name:data.Name,
        //   age: data.Age,
        //   date: data.Date,
        //   programming: data.programming,
        // })
        

      })

  },[]);

  // console.log(data);

  return (
    <div className="App" >
      <Header/>
      <div className="body-main">
          <SamplesWindow samples={sampleImages} setImageSrc={setImageSrc} />
          <ImageWindow imageSrc={imgSrc} setImageSrc={setImageSrc} uploadData={uploadData} data={data}/>
          <ResultsWindow data={data} />
      </div>
      
      <Footer>copyright@2024 made by Mario Vishal R</Footer>
    </div>
  );
}

export default App;
