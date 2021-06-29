import React from 'react';

const featuredList = [
    {key: "popular", label: "Top-rated Gardens and Plants"},
    {key: "latest", label: "Latest Gardens and Plants"}, 
    {key: "beginners", label: "Easy Plants and Gardens for beginners"},
    {key: "professionals", label: "Advanced aquascapers and not-so-easy plants"},
    {key: "worst", label: "Hall of Shame: unpopular gardens and plants"}
];

const showNList = [1, 3, 5, 10];

function renderFeaturedListDropdown(props) {
    // Dropdown list for Complexity
    return (
        <React.Fragment>
            <select 
                className="form-select" 
                aria-label=".form-select example"
                name="homeSelectedListing"
                value={props.homeSelectedListing}
                onChange={props.updateFormField}
                >        
                {featuredList.map( l => 
                    <React.Fragment key={l.key}>
                        <option value={l.key}>{l.label}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

function renderShowNList(props) {
    return (
        <React.Fragment>
            <select 
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="showN"
                value={props.showN}
                onChange={props.updateFormField}
                >
                <option value={props.showN}>Show {props.showN}</option>
                {showNList.map( l => 
                    <React.Fragment key={l}>
                        <option value={l}>Show {l}</option>
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
                <i className="fas fa-leaf"></i>
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
            <h1>Featured: {featuredList.find(f => f.key === props.homeSelectedListing).label} </h1>
            <p>Select other highlights: </p>
            {renderFeaturedListDropdown(props)}
            {renderShowNList(props)}
            <button
                className="btn btn-primary me-3 mt-3"
                onClick={props.refreshHomeData}
            >Refresh List Below</button>
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
                            <p className="card-text">Ease of Care: {p.care} Lighting: {p.lighting}</p>
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