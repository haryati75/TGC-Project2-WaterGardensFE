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
            <div className="card" style={{width : "18rem"}}>
                <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                <h6 className="card-subtitle">{p.name} (Care: {p.care})</h6>
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
                <i class="fas fa-leaf"></i>
            </React.Fragment>)
        iconsJSX.push(e);
    }
    return iconsJSX;
}

function renderGardenRatings(gardenId, ratings, deleteGardenRating, editGardenRating) {
    let ratingsJSX = [];
    for (let r of ratings) {
        let e = (<React.Fragment key={r.id}>
            <li>
                {renderRatingIcons(r.level)} - {r.comment}

                <button className="btn btn-sm"
                    onClick={() => { editGardenRating(gardenId, r.id); }}>
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

function GardenViewDetails(props) {

    return (
        <React.Fragment>
            <div className="card mt-3" style={{width : "80%"}}>

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
                <h6>Ratings and Comments:</h6>
                <div>
                    <ul>
                        {renderGardenRatings(props.garden._id, props.garden.ratings, props.deleteGardenRating, props.editGardenRating)}
                    </ul>
                </div>
            </div>


            <div className="row">
                <div className="label">Rate Me: </div>
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
                className="btn btn-dark me-3"
                onClick={props.hideGardenDetails}
            >Go back <i className="fas fa-th-list"></i></button>
        </React.Fragment>
    )
}

export default GardenViewDetails;