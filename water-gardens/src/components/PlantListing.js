import React from 'react';

function renderSmartTagsDropDown(props) {
    // need to change to checkboxes
    return (
        <React.Fragment key={1}>
            <div className="form-floating">
                <select 
                    className="form-select" 
                    id="criteriaSearchPlantListing"
                    aria-label=".form-select"
                    name="criteriaSearchPlantListing"
                    value={props.criteriaSearchPlantListing}
                    onChange={props.updateFormField}
                    >      
                    <option value={""}>Select an existing Smart Tag</option>
                    {props.plantSmartTags.map( l => 
                        <React.Fragment key={l}>
                            <option value={l}>{l}</option>
                        </React.Fragment>
                    )}
                </select>
                <label htmlFor="criteriaSearchPlantListing">Smart Tags Search</label>
            </div>

        </React.Fragment>
    )
}

function PlantListing(props) {
    return (
        <React.Fragment>
            
            <div className="sub-header">
                <h2>Plant Listing</h2>
            </div>

            <div className="row g-2">
                <div className="col-md">
                    {renderSmartTagsDropDown(props)}
                </div>
                <div className="col-md">

                    <div className="input-group">
                        <input type="text" 
                            className="form-control" 
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

                </div>
            </div>

            <hr></hr>

            <div className="row">
            {props.plants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card col-6 col-md-4 col-lg-3 mx-auto">
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