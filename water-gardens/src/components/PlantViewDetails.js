import React from 'react';

function PlantViewDetails(props) {
    return (
        <React.Fragment>
            <div className="card" style={{width : "80%"}}>

                <img className="card-img-top" src={props.plant.photoURL} alt={props.plant.name}/>
                <div className="card-body">
                    <h1 className="card-title">{props.plant.name}</h1>
                    <p className="card-text">Ease of Care: {props.plant.care}</p>
                    <p className="card-text">Lighting: {props.plant.lighting}</p>
                    <p className="card-text">Appearance: {props.plant.appearance}</p>

                    { Array.isArray(props.plant.smartTags) && props.plant.smartTags.length > 0 ? <p className="card-text">Keywords:</p> : null }
                    <ul>
                        {Array.isArray(props.plant.smartTags) ? props.plant.smartTags.map(t => <li key={t}>{t}</li>) : null}
                    </ul>
                </div>
            </div>
            <hr></hr>
            <button
                className="btn btn-info me-3 mt-2"
                onClick={() => {
                    props.plant.likes++;
                    props.increasePlantLikesByOne(props.plant._id);
                }}
            ><i class="fas fa-thumbs-up"></i> Likes: {props.plant.likes}</button>

            <button
                className="btn btn-primary me-3"
                onClick={props.showPlantEditDetails}
            >Edit Plant</button>
            <button
                className="btn btn-danger me-3"
                disabled={!props.allowPlantDelete}
                onClick={() => {
                    props.displayDeletePopup(props.plant._id, "plant");
                }}
            >Delete Plant</button>
            <button
                className="btn btn-dark me-3"
                onClick={props.hidePlantDetails}
            >Go back <i class="fas fa-th-list"></i></button>
        </React.Fragment>
    )
}

export default PlantViewDetails;