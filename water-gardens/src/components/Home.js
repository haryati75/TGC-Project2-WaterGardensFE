import React from 'react';

const listings = [
    {key: "new-gardens", label: "Latest Gardens in the Gallery"}, 
    {key: "gardens-beginners", label: "Gardens for Beginners"},
    {key: "plants-easy-care", label: "Easy to Care Plants"},
    {key: "topN-plants-likes", label: "Popular Plants"}
]

function renderHighlightsList(props) {
    // Dropdown list for Complexity
    return (
        <React.Fragment>
            <select 
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="homeSelectedListing"
                value={props.homeSelectedListing}
                onChange={props.updateFormField}
                >
                <option value={listings[0].key}>{listings[0].label}</option>
                {listings.map( l => 
                    <React.Fragment key={l.key}>
                        <option value={l.key}>{l.label}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
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

// This is the Home page which is called "Highlights" in the Tabs
function Home(props) {
    return (
        <React.Fragment>
            <h1>Other highlights</h1>
            {renderHighlightsList(props)}

            <hr></hr>

            <h3>Featured Gardens</h3>
            <div className="row">
            {props.topGardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card" style={{width: "24rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={g.photoURL} alt={g.name}/>
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <h5 className="card-subtitle text-muted">Aquascaper: {g.aquascaper.name}</h5>
                            <p>Complexity: {g.complexityLevel}</p>
                            <h6>Ratings and Comments:</h6>
                            <ul>
                                {renderGardenRatings(g.ratings)}
                            </ul>
                            <button
                                className="btn btn-success me-3"
                                onClick={()=>{
                                    props.viewGardenDetails(g._id);
                                }}
                            >View and Rate this Garden</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
            </div>

            <hr></hr>

            <h3>Featured Plants</h3>
            <div className="row">
            {props.topPlants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card" style={{width: "15rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">Ease of Care: {p.care}, Lighting: {p.lighting}</p>
                            <button
                                className="btn btn-light me-3" disabled={true}
                                onClick={() => {
                                    props.increasePlantLikesByOne(p._id);
                                }}
                            ><i className="fas fa-thumbs-up"></i> Likes: {p.likes}</button>

                            <button
                                className="btn btn-success me-3"
                                onClick={() => {
                                    props.viewPlantDetails(p._id);
                                }}
                            >View Plant Details</button>
                        </div>

                    </div>
                </React.Fragment>
            )}
            </div>
        </React.Fragment>
    )
}

export default Home;