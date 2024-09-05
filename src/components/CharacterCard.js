export default function CharacterCard({name}){

    return (
        <div className="character-card">
            <h3>{name}</h3>
            <h4>Bounty: 500000 berries</h4>
        </div>
    )
}