import React from 'react';

const featuredList = [
    {key: "latest", label: "Latest Gardens and Plants"}, 
    {key: "popular", label: "Top-rated Gardens and Plants"},
    {key: "beginners", label: "Easy Plants and Gardens for beginners"},
    {key: "professionals", label: "Advanced aquascapers and not-so-easy plants"},
    {key: "worst", label: "Hall of Shame: unpopular gardens and plants"}
];

const showNList = [
    {key: 1, label: "Show 1"},
    {key: 3, label: "Show 3"},
    {key: 5, label: "Show 5"},
    {key: 10, label: "Show 10"},
    {key: 10, label: "Show 20"},
    {key: 10, label: "Show 50"}
];

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

function renderedDropdown(keyLabels) {
    return (
        keyLabels.map( item => 
            <React.Fragment key={item.key}>
                <option value={item.key}>{item.label}</option>
            </React.Fragment>
        )
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
            <li className="list-group-item card-text text-listing">
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
            <div className="sub-header">
                <h2>{featuredList.find(f => f.key === props.homeSelectedListing).label}</h2>
            </div>

            <div className="row g-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="homeSelectedListing" 
                            aria-label="Other Highlights"
                            name="homeSelectedListing"
                            value={props.homeSelectedListing}
                            onChange={props.updateFormField}
                        >
                            {renderedDropdown(featuredList)}
                        </select>
                        <label htmlFor="homeSelectedListing">Other Highlights</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="showN" 
                            aria-label="Show number of items"
                            name="showN"
                            value={props.showN}
                            onChange={props.updateFormField}
                        >
                            {renderedDropdown(showNList)}
                        </select>
                        <label htmlFor="showN">Display Items</label>
                    </div>
                </div>

                <div className="col-md">
                    <button
                        className="btn btn-primary"
                        onClick={props.refreshHomeData}
                    >Refresh List Below</button>
                </div>
            </div>
          
            <hr></hr>

            <h3>Featured Gardens</h3>
            <div className="row">
            {props.topGardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card col-12 col-md-6 col-lg-4 me-auto">
                        <div className="card-body">
                            <img className="card-img-top" src={g.photoURL} alt={g.name}/>
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <h5 className="card-text text-listing">Aquascaper: {g.aquascaper.name}</h5>
                            <p className="card-text text-listing">{g.desc}</p>
                            <p className="card-text text-listing">Complexity: {toComplexityLabel(g.complexityLevel)}</p>

                            <div className="card mt-3 mx-auto">
                                <div className="card-header">
                                    Top Ratings & Comments:
                                </div>
                                <ul className="list-group list-group-flush">
                                {renderGardenRatings(g.ratings)}
                                </ul>
                            </div>

                            <button
                                className="btn btn-success me-3 mt-3"
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
                    <div className="card col-12 col-md-4 col-lg-3 me-auto">
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