import CharacterCard from "./CharacterCard"

export default function ResultsWindow({data}){


    console.log(data);
    return(
        <div className="results-window">
            
            { data?

            Object.keys(data).map((key) => ( 
                
                <CharacterCard key={key} name={data[key].name} />
            )):
            <p>No Data!</p>
        }

        </div>
    )
}