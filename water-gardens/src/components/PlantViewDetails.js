import React from 'react';

function PlantViewDetails(props) {

    return (
        <React.Fragment>
            <h1>{props.plant.name}</h1>
            <h5>Ease of Care: {props.plant.care}</h5>
            <h5>Lighting: {props.plant.lighting}</h5>
            <p>Appearance: {props.plant.appearance}</p>
            <p>Likes: {props.plant.likes}</p>
            <p>Keywords:</p>
            <ul>
                {Array.isArray(props.plant.smartTags) ? props.plant.smartTags.map(t => <li key={t}>{t}</li>) : null}
            </ul>
            <hr></hr>
            <button
                className="btn btn-info me-3"
                onClick={() => {
                    props.increasePlantLikesByOne(props.plant._id);
                }}
            >Increase Likes</button>
            <button
                className="btn btn-primary me-3"
                onClick={props.addSmartTags}
            >Add Keywords</button>
            <button
                className="btn btn-danger me-3"
                onClick={() => {
                    props.displayDeletePopup(props.plant._id, "plant");
                }}
            >Delete Plant</button>
            <button
                className="btn btn-success me-3"
                onClick={props.hidePlantDetails}
            >Go back to Listing</button>
        </React.Fragment>
    )
}

export default PlantViewDetails;