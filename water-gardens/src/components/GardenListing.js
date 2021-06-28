import React from 'react';

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

function renderGardenRatings(ratings) {
    let ratingsJSX = [];
    for (let r of ratings) {
        let e = (<React.Fragment key={r.id}>
            <li>
            {renderRatingIcons(r.level)} - {r.comment}
            </li>
            </React.Fragment>)
        ratingsJSX.push(e);
    }
    return ratingsJSX;
}

function renderGardenPlants(plants) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <li>
                {p.name}
            </li>
            </React.Fragment>)
        plantsJSX.push(e);
    }
    return plantsJSX;
}

function GardenListing(props) {
    return (
        <React.Fragment>
            <h1>Gardens Listing</h1>
            <div className="row">
            {props.gardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card" style={{width: "30rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={g.photoURL} alt={g.name}/>
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <p className="card-text">{g.desc}</p>
                            <h5>Aquascaper: {g.aquascaper.name}</h5>
                            <p>Website: {g.aquascaper.email}</p>
                            <h6>Plants:</h6>
                            <ul>
                                {renderGardenPlants(g.plants)}
                            </ul>

                            <h6>Ratings and Comments:</h6>
                            <ul>
                                {renderGardenRatings(g.ratings)}
                            </ul>
                            <button
                                className="btn btn-success me-3"
                                onClick={()=>{
                                    props.viewGardenDetails(g._id);
                                }}
                            >View Garden</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
            </div>
        </React.Fragment>
    );
}

export default GardenListing;