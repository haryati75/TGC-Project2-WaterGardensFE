import React from 'react';

const complexityLevels = [
    {key: "beginner", label: "Beginner"}, 
    {key: "intermediate", label: "Intermediate"},
    {key: "semi-professional", label: "Semi-Professional"},
    {key: "professional", label: "Professional"}
]

function renderedDropdown(keyLabels) {
    return (
        keyLabels.map( item => 
            <React.Fragment key={item.key}>
                <option value={item.key}>{item.label}</option>
            </React.Fragment>
        )
    )
}

function renderGardenPlants(plants, deleteGardenPlant) {
    let plantsJSX = [];
    for (let p of plants) {
        let e = (<React.Fragment key={p.id}>
            <div className="card mx-3 text-center col-2">
                <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                <div className="card-footer">
                    <h6 className="card-subtitle mx-auto">{p.name} - {p.care}
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
                        <option value={p.id}>({p.care}) {p.name}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

function GardenEditDetails (props) {
    return (
        <React.Fragment>

            <div className="sub-header">
                <h2>Edit Garden Details</h2>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="editedGardenName" placeholder="Garden Name"
                    name="editedGardenName"
                    value={props.editedGardenName}
                    onChange={props.updateFormField}
                />
                <label htmlFor="editedGardenName">Garden Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height: "100px"}}
                    placeholder="Describe Garden" 
                    id="editedGardenDesc"
                    name="editedGardenDesc"
                    value={props.editedGardenDesc}
                    onChange={props.updateFormField}
                ></textarea>
                <label htmlFor="editedGardenDesc">Describe the garden briefly</label>
            </div>

            <div className="row g-3 mb-3">

                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="editedGardenComplexityLevel" 
                            name="editedGardenComplexityLevel"
                            value={props.editedGardenComplexityLevel}
                            onChange={props.updateFormField}
                            aria-label="Edit Garden Complexity">
                            <option defaultValue>Select Complexity</option>
                            {renderedDropdown(complexityLevels)}
                        </select>
                        <label htmlFor="editedGardenComplexityLevel">Select Complexity</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="label">Completion Date:</div>
                    <input
                        type="date"
                        className="form-control"
                        name="editedGardenCompletionDate"
                        value={props.editedGardenCompletionDate}
                        onChange={props.updateFormField}
                    />
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <input type="text" className="form-control" 
                            id="editedGardenWeeksToComplete" placeholder="Duration to Complete"
                            name="editedGardenWeeksToComplete"
                            value={props.editedGardenWeeksToComplete}
                            onChange={props.updateFormField}
                        />
                        <label htmlFor="editedGardenWeeksToComplete">Weeks to complete</label>
                    </div>
                </div>

            </div>

            <div className="card border-0">
                <img className="rounded mx-auto d-block" style={{maxWidth : "80%"}} src={props.editedGardenPhotoURL} alt={props.editedGardenName}/>
                
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" 
                        id="editedGardenPhotoURL" placeholder="URL of Garden Image"
                        name="editedGardenPhotoURL"
                        value={props.editedGardenPhotoURL}
                        onChange={props.updateFormField}
                    />
                    <label htmlFor="editedGardenPhotoURL">Garden Image URL</label>
                </div>
            </div>


            <hr></hr>

            <div className="sub-header">
                <h3>Aquascaper</h3>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="editedGardenAquascaperName" placeholder="Aquascaper Name"
                    name="editedGardenAquascaperName"
                    value={props.editedGardenAquascaperName}
                    onChange={props.updateFormField}
                />
                <label htmlFor="editedGardenAquascaperName">Aquascaper Name</label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="editedGardenAquascaperEmail" placeholder="Aquascaper Website"
                    name="editedGardenAquascaperEmail"
                    value={props.editedGardenAquascaperEmail}
                    onChange={props.updateFormField}
                />
                <label htmlFor="editedGardenAquascaperEmail">Aquascaper Website</label>
            </div>


            <hr></hr>

            <div className="card">
                <div className="card-header sub-header">
                    <h3>Plants used in this Garden</h3>
                </div>
                <div className="row">
                    {!props.editedGardenPlants.length ? <h6>No plants found. Please add a Plant to the garden</h6> : null}
                    
                    {renderGardenPlants(props.editedGardenPlants, props.deleteGardenPlant)}
                </div>
            </div>

            <div className="card my-auto mx-auto" style={{width : "18rem"}}>
                {renderAddGardenPlantsDropdown(props)}
                <img className="card-img-top mt-3" src={props.toAddGardenPlantPhotoURL} alt={props.toAddGardenPlantName}/>
                <button
                    className="btn btn-info mx-auto"
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