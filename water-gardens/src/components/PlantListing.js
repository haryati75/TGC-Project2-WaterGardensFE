import React from 'react';

function renderSmartTagsDropDown(props) {
    // need to change to checkboxes
    return (
        <React.Fragment key={1}>
            <select 
                className="form-select" 
                aria-label=".form-select"
                name="aquascaperSelectedGardenListing"
                value={props.smartTagsSelectedPlantListing}
                onChange={props.updateFormField}
                >      
                <option value={""}>Show All</option>  
                {props.plantSmartTags.map( l => 
                    <React.Fragment key={l}>
                        <option value={l}>{l}</option>
                    </React.Fragment>
                )}
            </select>

            {/* <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                </label>
            </div> */}

        </React.Fragment>
    )
}


function PlantListing(props) {
    return (
        <React.Fragment>
            <h1>Plants Listing</h1>
            <div className="input-group mb-3">
                <input type="text" 
                    class="form-control" 
                    placeholder="Type the search keyword" 
                    aria-label="Plant Search Criteria" 
                    aria-describedby="btnPlantSearch"
                    name="criteriaSearchPlantListing"
                    value={props.criteriaSearchPlantListing}
                    onChange={props.updateFormField}
                />
                <button className="btn btn-outline-secondary" 
                    type="button" 
                    id="btnPlantSearch"
                    onClick={props.filterPlantsData}>
                Search</button>
            </div>

            <hr></hr>

            <div className="row">
            {props.plants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                            <h3 className="card-title">{p.name}</h3>
                            <p className="card-text">{p.appearance}</p>
                            <button
                                className="btn btn-info me-3"
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
    );
}

export default PlantListing;