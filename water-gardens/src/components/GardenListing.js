import React from 'react';
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
    // not a key/label pair but is a string array
    if (!keyLabels[0].key && Array.isArray(keyLabels)) { 
        return (
            keyLabels.map( item => 
                <React.Fragment key={item}>
                    <option value={item}>{item}</option>
                </React.Fragment>
            )
        )
    } else {
        return (
            keyLabels.map( item => 
                <React.Fragment key={item.key}>
                    <option value={item.key}>{item.label}</option>
                </React.Fragment>
            )
        )
    }
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

function renderGardenRatingsStats (gardenId, statsGardens) {
    let stats = statsGardens.filter(g => g._id === gardenId ? g : null)[0];
    if (stats !== undefined) {
        return (<React.Fragment key={gardenId}>
            <li className="list-group-item card-text text-listing">Average: {renderRatingIcons(Math.round(stats.ave))} ({stats.ave.toFixed(2)}) - Total: {stats.count}</li>
            <li className="list-group-item card-text text-listing">Highest: {renderRatingIcons(stats.max)} - Lowest: {renderRatingIcons(stats.min)}</li>
        </React.Fragment>)
    } else {
        return (<React.Fragment key={gardenId}>
            <li className="list-group-item card-text text-listing">No Ratings Available for this Garden</li>
        </React.Fragment>)
    }
}

function renderGardenPlants(plants) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <li className="card-text text-listing">
                {p.name}
            </li>
            </React.Fragment>)
        plantsJSX.push(e);
    }
    if (plantsJSX.length === 0) {
        return <p className="card-text text-listing">No Plants added in Garden</p>
    }
    return plantsJSX;
}

function GardenListing(props) {
    return (
        <React.Fragment>
            <div className="sub-header">
                <h2>Garden Listing</h2>
            </div>

            <div className="row g-3">

                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="aquascaperSelectedGardenListing" 
                            name="aquascaperSelectedGardenListing"
                            value={props.aquascaperSelectedGardenListing}
                            onChange={props.updateFormField}
                            aria-label="List by Aquascaper">
                            <option value="">Show All</option>
                            {renderedDropdown(props.aquascaperNames)}
                        </select>
                        <label htmlFor="aquascaperSelectedGardenListing">Select Aquascaper</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="complexityLevelSelectedGardenListing" 
                            name="complexityLevelSelectedGardenListing"
                            value={props.complexityLevelSelectedGardenListing}
                            onChange={props.updateFormField}
                            aria-label="List By Garden Complexity">
                            <option value="" defaultValue>Show All</option>
                            {renderedDropdown(complexityLevels)}
                        </select>
                        <label htmlFor="complexityLevelSelectedGardenListing">Select Complexity</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="input-group mb-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Type the search keyword" 
                            aria-label="Garden Search Criteria" 
                            aria-describedby="btnGardenSearch"
                            name="criteriaSearchGardenListing"
                            value={props.criteriaSearchGardenListing}
                            onChange={props.updateFormField}
                        />
                        <button className="btn btn-outline-secondary" 
                            type="button" 
                            id="btnGardenSearch"
                            onClick={props.filterGardensData}>
                        Search</button>
                    </div>

                </div>
            </div>
            
            <hr></hr>

            <div className="row">
            {props.gardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card col-12 col-md-6 col-lg-4 mx-auto">
                        <div className="card-body">
                            <img className="card-img-top" src={g.photoURL} alt={g.name}/>
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <p className="card-text text-listing">{g.desc}</p>
                            <h5 className="card-text text-listing">Aquascaper: <a href={g.aquascaper.email} target="_blank" rel="noopener noreferrer">{g.aquascaper.name}</a></h5>
                            <p className="card-text text-listing">Complexity: {toComplexityLabel(g.complexityLevel)}</p>

                            <h5 className="card-text text-listing">Plants:</h5>
                            <ul>
                                {renderGardenPlants(g.plants)}
                            </ul>

                            <div className="card mt-3 mx-auto">
                                <div className="card-header">
                                    Ratings Statistics:
                                </div>
                                <ul className="list-group list-group-flush">
                                    {renderGardenRatingsStats(g._id, props.statsGardens)}
                                </ul>
                            </div>

                            <button
                                className="btn btn-success me-3 mt-3"
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