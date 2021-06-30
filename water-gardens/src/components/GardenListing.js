import React from 'react';

function renderAquascaperNamesDropdown(props) {
    // Dropdown list for Complexity
    return (
        <React.Fragment key={1}>
            <select 
                className="form-select" 
                aria-label=".form-select"
                name="aquascaperSelectedGardenListing"
                value={props.aquascaperSelectedGardenListing}
                onChange={props.updateFormField}
                >      
                <option value={""}>Show All</option>  
                {props.aquascaperNames.map( l => 
                    <React.Fragment key={l}>
                        <option value={l}>{l}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

const complexityLevels = [
    {key: "beginner", label: "Beginner"}, 
    {key: "intermediate", label: "Intermediate"},
    {key: "semi-professional", label: "Semi-Professional"},
    {key: "professional", label: "Professional"}
]

function renderComplexityLevels(props) {
    // Dropdown list for Complexity
    return (
        <React.Fragment>
            <select 
                className="form-select" 
                aria-label=".form-select"
                name="complexityLevelSelectedGardenListing"
                value={props.complexityLevelSelectedGardenListing}
                onChange={props.updateFormField}
                >
                <option value="">Select All</option>
                {complexityLevels.map( l => 
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
            <li className="list-group-item">Average: {renderRatingIcons(Math.round(stats.ave))} ({stats.ave}) - Total: {stats.count}</li>
            <li className="list-group-item">Highest: {renderRatingIcons(stats.max)} - Lowest: {renderRatingIcons(stats.min)}</li>
        </React.Fragment>)
    } else {
        return (<React.Fragment key={gardenId}>
            <li className="list-group-item">No Ratings Available for this Garden</li>
        </React.Fragment>)
    }
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

    let gardensToList = props.gardens;

    if (props.aquascaperSelectedGardenListing !== "") {
        gardensToList = props.gardens.filter(g => g.aquascaper.name === props.aquascaperSelectedGardenListing ? g : null)
    } 

    if (props.complexityLevelSelectedGardenListing !== "") {
        gardensToList = gardensToList.filter(g => g.complexityLevel === props.complexityLevelSelectedGardenListing ? g : null)
    } 

    return (
        <React.Fragment>
            <h1>Gardens Listing</h1>

            Select Aquascapers: {renderAquascaperNamesDropdown(props)}
            Select Complexity: {renderComplexityLevels(props)}

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
            
            <hr></hr>

            {/* <div className="card" style={{width: "26rem"}}></div> */}

            <div className="row">
            {gardensToList.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card col-12 col-md-6 col-lg-4 mx-auto">
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