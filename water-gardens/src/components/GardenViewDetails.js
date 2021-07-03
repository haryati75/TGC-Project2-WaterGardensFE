import React from 'react';
const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const ratingLevels = [
    {key: "5", label: "star1"}, 
    {key: "4", label: "star2"},
    {key: "3", label: "star3"},
    {key: "2", label: "star4"},
    {key: "1", label: "star5"}
]

const complexityLevels = [
    {key: "beginner", label: "Beginner"}, 
    {key: "intermediate", label: "Intermediate"},
    {key: "semi-professional", label: "Semi-Professional"},
    {key: "professional", label: "Professional"}
]

function toComplexityLabel (key) {
    let obj = complexityLevels.filter(c => c.key === key.toLowerCase() ? c : null)[0];
    return (obj != null ? obj.label : key);
}

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
            <div className="card mb-3 mx-auto text-center col-6 col-md-3">
                <div className="card-body">
                    <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                </div>
                <div className="card-footer">
                    <h6 className="card-subtitle">{p.name}</h6>
                    <p className="card-text text-listing">Care: {p.care}</p>
                </div>
            </div>
        </React.Fragment>)
        plantsJSX.push(e);
    }
    return ( plantsJSX.length > 0 ? plantsJSX : <div className="card-title">No Plants found. Please Edit Garden to add a Plant to it.</div>);
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
            <li className="list-group-item card-text">Average: {renderRatingIcons(Math.round(stats.ave))} ({stats.ave.toFixed(2)})</li>
            <li className="list-group-item card-text">Total: {stats.count}</li>
            <li className="list-group-item card-text">Highest: {renderRatingIcons(stats.max)}</li>
            <li className="list-group-item card-text">Lowest: {renderRatingIcons(stats.min)}</li>
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

                <div className="card-header text-center">
                    <h2 className="card-title">Name: {props.garden.name}</h2>
                    <h3 className="card-subtitle">Aquascaper: {props.garden.aquascaper.name}</h3>
                    <img className="rounded mt-3 mx-auto d-block col-10" src={props.garden.photoURL} alt={props.garden.name}/>
                    
                </div>
                <div className="card-body d-flex flex-md-row flex-column">
                    <div className="col col-12 col-md-8">
                        <ul className="list-group list-group-flush">  
                            <li className="list-group-item card-text">{props.garden.desc}</li>                      
                            <li className="list-group-item card-text">Complexity: {toComplexityLabel(props.garden.complexityLevel)}</li>
                            <li className="list-group-item card-text">Weeks To Complete: {props.garden.weeksToComplete}</li>
                            <li className="list-group-item card-text">Completion Date: {new Date(props.garden.completionDate).toLocaleDateString('en-GB', optionsDate)}</li>
                            <li className="list-group-item card-text">Website: <a href={props.garden.aquascaper.email} target="_blank" rel="noopener noreferrer">{props.garden.aquascaper.email}</a></li>
                            <li className="list-group-item card-text">Created on: {new Date(props.garden.createdOn).toLocaleDateString('en-GB', optionsDate)}</li>
                            <li className="list-group-item card-text">{props.garden.modifiedOn ? <p className="card-text">Last Modified on: {new Date(props.garden.modifiedOn).toLocaleString('en-GB', optionsDate)}</p> : null}</li>
                        </ul>
                    </div>

                    <div className="card mt-3 my-auto mx-auto col-8 col-md-3">
                        <div className="card-header">
                            Ratings Statistics:
                        </div>
                        <ul className="list-group list-group-flush">
                            {renderGardenRatingsStats(props.garden._id, props.statsGardens)}
                        </ul>
                    </div>                    
                </div>
                
                <div className="card-footer">
                    <h5 className="card-title">Plants:</h5>
                    <div className="row">
                        {renderGardenPlants(props.garden.plants)}
                    </div>
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
                <div className="label">Please provide feedback on this Garden: </div>
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
                >Submit
            </button>
               
            <div className="card mt-3" style={{width: "100%"}}>
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