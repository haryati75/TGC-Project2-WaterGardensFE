import React from 'react';

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
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="editedGardenComplexityLevel"
                value={props.editedGardenComplexityLevel}
                onChange={props.updateFormField}
                >
                <option value="">Select Complexity Level</option>
                {complexityLevels.map( l => 
                    <React.Fragment key={l.key}>
                        <option value={l.key}>{l.label}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

function renderGardenPlants(plants, deleteGardenPlant) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <div className="card mx-3" style={{width : "18rem"}}>
                <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                <div className="card-body">
                    <h6 className="card-subtitle mx-auto">{p.name} 
                        <button className="btn btn-danger btn-sm ms-3"
                                onClick={() => { deleteGardenPlant(p.id); }}
                            ><i className="far fa-trash-alt"></i>
                    </button></h6>
                </div>
            </div>
        </React.Fragment>)
        plantsJSX.push(e);
    }
    return plantsJSX;
}

function renderAddGardenPlantsDropdown(props) {
    return (
        <React.Fragment>
            <select 
                className="form-select form-select" 
                aria-label=".form-select"
                name="toAddGardenPlantId"
                value={props.toAddGardenPlantId}
                onChange={props.updateToAddGardenPlantFields}
                >
                <option value="">Select Plant for Garden</option>
                {props.allPlantsDropdown.map( p => 
                    <React.Fragment key={p.id}>
                        <option value={p.id}>{p.name}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

function GardenEditDetails (props) {
    return (
        <React.Fragment>
            <h1>Edit Garden Details</h1>
            <hr></hr>
            <div>
                <div className="label">Name of Garden</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenName"
                    value={props.editedGardenName}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Description</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenDesc"
                    value={props.editedGardenDesc}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Complexity:</div>
                {renderComplexityLevels(props)}
            </div>
            <div>
                <div className="label">Completion Date:</div>
                <input
                    type="date"
                    className="form-control"
                    name="editedGardenCompletionDate"
                    value={props.editedGardenCompletionDate}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">How many weeks do you take to complete it?</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenWeeksToComplete"
                    value={props.editedGardenWeeksToComplete}
                    onChange={props.updateFormField}
                />
            </div>

            <div>
                <div className="label">Aquascaper Name:</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenAquascaperName"
                    value={props.editedGardenAquascaperName}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Aquascaper Email:</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenAquascaperEmail"
                    value={props.editedGardenAquascaperEmail}
                    onChange={props.updateFormField}
                />
            </div>

            <div className="card">
                <img className="card-img p-3" src={props.editedGardenPhotoURL} alt={props.editedGardenName}/>
                <div className="label">Photo URL:</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedGardenPhotoURL"
                    value={props.editedGardenPhotoURL}
                    onChange={props.updateFormField}
                />
            </div>
            <hr></hr>
            <div className="card">
                <div className="row">
                    {props.editedGardenPlants.length > 0 ? <h6>Plants found in this Garden:</h6> : null}
                    {renderGardenPlants(props.editedGardenPlants, props.deleteGardenPlant)}
                </div>
            </div>

            <div className="card my-auto" style={{width : "18rem"}}>
                {renderAddGardenPlantsDropdown(props)}
                <img className="card-img-top mt-3" src={props.toAddGardenPlantPhotoURL} alt={props.toAddGardenPlantName}/>
                <button
                    className="btn btn-info me-3"
                    onClick={props.addGardenPlant}
                >Add Plant to Garden</button>                
            </div>
            <hr></hr>
            <button
                className="btn btn-success me-3"
                onClick={() => { props.saveEditedGarden(props.gardenIdBeingEdited); }}
            >Save Changes
            </button>
            <button
                className="btn btn-secondary me-3"
                onClick={props.hideGardenEditDetails}
            >Cancel
            </button>
        </React.Fragment>
    )
}

export default GardenEditDetails;