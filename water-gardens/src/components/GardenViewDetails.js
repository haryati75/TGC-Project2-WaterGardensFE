import React from 'react';

const ratingLevels = [
    {key: "5", label: "star1"}, 
    {key: "4", label: "star2"},
    {key: "3", label: "star3"},
    {key: "2", label: "star4"},
    {key: "1", label: "star5"}
]

function renderRatingLevels (props) {
    // Ratings via fontawesom icons in CSS
    let ratingsJSX = [];

    for (let r of ratingLevels) {
        let e = (<React.Fragment key={r.key}>
            <input
                type="radio"
                id={r.label}
                name="toAddGardenRatingLevel"
                value={r.key}
                checked={ props.toAddGardenRatingLevel === r.key }
                onChange={props.updateFormField}
            />
            <label htmlFor={r.label}></label>
        </React.Fragment>)
        ratingsJSX.push(e);
    }

    return ratingsJSX;
}

function renderGardenPlants(plants) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <div className="card mb-3 mx-auto text-center" style={{maxWidth : "10rem"}}>
                <img className="card-img-top img-thumbnail" src={p.photoURL} alt={p.name}/>
                <p className="card-footer">{p.name} (Care: {p.care})</p>
            </div>
        </React.Fragment>)
        plantsJSX.push(e);
    }
    return plantsJSX;
}

function renderRatingIcons(n) {
    let iconsJSX = [];
    for (let i=0; i < n; i++) {
        let e = (<React.Fragment key={i}>
                <i className="fas fa-leaf"></i>
            </React.Fragment>)
        iconsJSX.push(e);
    }
    return iconsJSX;
}

function renderGardenRatings(gardenId, ratings, deleteGardenRating, displayGardenRatingEditPopup) {
    let ratingsJSX = [];
    for (let r of ratings) {
        let e = (<React.Fragment key={r.id}>
            <li className="list-group-item">
                {renderRatingIcons(r.level)} - {r.comment}

                <button className="btn btn-sm"
                    onClick={() => { displayGardenRatingEditPopup(r.id, r.level, r.comment); }}>
                    <i className="fas fa-pencil-alt" style={{color: "blue"}}></i>
                </button>

                <button className="btn btn-sm"
                    onClick={() => { deleteGardenRating(gardenId, r.id); }}>
                    <i className="far fa-trash-alt" style={{color: "red"}}></i>
                </button>
            </li>
            </React.Fragment>)
        ratingsJSX.push(e);
    }
    return ratingsJSX;
}

function renderGardenRatingsStats (gardenId, statsGardens) {
    let stats = statsGardens.filter(g => g._id === gardenId ? g : null)[0];
    if (stats !== undefined) {
        return (<React.Fragment key={gardenId}>
            <li className="list-group-item">Average: {renderRatingIcons(Math.round(stats.ave))} ({stats.ave}) - Total: {stats.count}</li>
            <li className="list-group-item">Highest: {renderRatingIcons(stats.max)} - Lowest: {renderRatingIcons(stats.min)}</li>
        </React.Fragment>)
    } else {
        return (<React.Fragment key={gardenId}>
            <li className="list-group-item">No Ratings Available for this Garden</li>
        </React.Fragment>)
    }
}

function GardenViewDetails(props) {

    return (
        <React.Fragment>
            <div className="card mt-3 g-1">

                <img className="rounded mx-auto d-block" style={{maxWidth : "100%"}} src={props.garden.photoURL} alt={props.garden.name}/>
                <div className="card-body">
                    <h1 className="card-title">{props.garden.name}</h1>
                    <h5 className="card-subtitle">Aquascaper: {props.garden.aquascaper.name}</h5>

                    <p className="card-text">Description: {props.garden.desc}</p>
                    <p className="card-text">Complexity: {props.garden.complexityLevel}</p>
                    <p className="card-text">Weeks To Complete: {props.garden.weeksToComplete}</p>
                    <p className="card-text">Completion Date: {props.garden.completionDate}</p>
                    <p className="card-text">Website/Email: {props.garden.aquascaper.email}</p>
                    <h6>Plants found in this Garden:</h6>
                </div>
                
                <div className="container d-flex justify-content-start flex-row">
                    {renderGardenPlants(props.garden.plants)}
                </div>
            </div>

            <div className="container d-flex justify-content-start flex-row mt-3">
                <button
                    className="btn btn-primary me-3"
                    onClick={props.showGardenEditDetails}
                >Edit Garden</button>
                <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                        props.displayDeletePopup(props.garden._id, props.garden.name, props.garden.photoURL, "garden");
                    }}
                >Delete Garden</button>
                <button
                    className="btn btn-dark me-3"
                    onClick={props.hideGardenDetails}
                >Go back <i className="fas fa-th-list"></i></button>
            </div>

            <hr></hr>

            <div className="row" style={{width : "80%"}}>
                <div className="label">Rate this Garden: </div>
                <div className="container">
                    <div className="starrating d-flex justify-content-end flex-row-reverse">
                        {renderRatingLevels(props)}
                    </div>
                </div> 
            </div>

            <div>
                <div className="label">Comments: </div>
                <input
                    type="text"
                    className="form-control"
                    name="toAddGardenRatingComment"
                    value={props.toAddGardenRatingComment}
                    onChange={props.updateFormField}
                />
            </div>

            <button
                    className="btn btn-success me-3 mt-3"
                    onClick={() => { props.addGardenRating(props.garden._id)}}
                >Submit your rating and comments
            </button>

            <div className="card mt-3" style={{width: "50%"}}>
                <div className="card-header">
                    Ratings Statistics:
                </div>
                <ul className="list-group list-group-flush">
                    {renderGardenRatingsStats(props.garden._id, props.statsGardens)}
                </ul>
            </div>
               
            <div className="card mt-3" style={{width: "80%"}}>
                <div className="card-header">
                    All Ratings and Comments
                </div>
                <ul className="list-group list-group-flush">
                    {renderGardenRatings(props.garden._id, props.garden.ratings, props.deleteGardenRating, props.displayGardenRatingEditPopup)}
                </ul>
            </div>
            


        </React.Fragment>
    )
}

export default GardenViewDetails;