import React from 'react';

function GardenViewDetails(props) {

    return (
        <React.Fragment>
            <h1>{props.garden.name}</h1>
            <h5>Complexity: {props.garden.complexityLevel}</h5>
            <h5>Aquascaper: {props.garden.aquascaper.name}</h5>
            <p>Description: {props.garden.desc}</p>
            <p>Weeks To Complete: {props.garden.weeksToComplete}</p>
            <h6>Plants found in this Garden:</h6>
            <ul>
                {Array.isArray(props.garden.plants) ? props.garden.plants.map(p => <li key={p._id}>{p.name}</li>) : null}
            </ul>
            <h6>Ratings:</h6>
            <ul>
                {Array.isArray(props.garden.ratings) ? props.garden.ratings.map(r => <li key={r._id}>{r.rating} - {r.comments}</li>) : null}
            </ul>
            <hr></hr>
            <button
                className="btn btn-info me-3"
                onClick={props.addRating}
            >Rate this Garden</button>
            <button
                className="btn btn-info me-3"
                onClick={props.addGardenPlant}
            >Add Plant to Garden</button>
            <button
                className="btn btn-primary me-3"
                onClick={props.editGarden}
            >Edit Garden</button>
            <button
                className="btn btn-danger me-3"
                onClick={() => {
                    props.displayDeletePopup(props.garden._id, "garden");
                }}
            >Delete Garden</button>
            <button
                className="btn btn-success me-3"
                onClick={props.hideGardenDetails}
            >Go back to Listing</button>
        </React.Fragment>
    )
}

export default GardenViewDetails;