import React from 'react';

function renderGardenPlants(plants) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <div className="card" style={{width : "18rem"}}>
                <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                <h6 className="card-subtitle">{p.name}</h6>
            </div>
        </React.Fragment>)
        plantsJSX.push(e);
    }
    return plantsJSX;
}

function GardenViewDetails(props) {

    return (
        <React.Fragment>
            <div className="card" style={{width : "80%"}}>

                <img className="card-img-bottom" src={props.garden.photoURL} alt={props.garden.name}/>
                <div className="card-body">
                    <h1 className="card-title">{props.garden.name}</h1>
                    <h5 className="card-subtitle">Aquascaper: {props.garden.aquascaper.name}</h5>

                    <p className="card-text">Description: {props.garden.desc}</p>
                    <p className="card-text">Complexity: {props.garden.complexityLevel}</p>
                    <p className="card-text">Weeks To Complete: {props.garden.weeksToComplete}</p>
                    <p className="card-text">Completion Date: {props.garden.completionDate}</p>
                    <p className="card-text">Website/Email: {props.garden.aquascaper.email}</p>
                </div>
            </div>
            <div className="row">
                <h6>Plants found in this Garden:</h6>
                {renderGardenPlants(props.garden.plants)}
            </div>

            <hr></hr>
            <div className="row">
                <h6>Ratings:</h6>
                <ul>
                    {Array.isArray(props.garden.ratings) ? props.garden.ratings.map(r => <li key={r._id}>{r.rating} - {r.comments}</li>) : null}
                </ul>
            </div>
            <button
                    className="btn btn-info me-3"
                    onClick={props.addRating}
                >Rate this Garden</button>
            <hr></hr>

            <button
                className="btn btn-primary me-3"
                onClick={props.showGardenEditDetails}
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
            >Go back <i className="fas fa-th-list"></i></button>
        </React.Fragment>
    )
}

export default GardenViewDetails;