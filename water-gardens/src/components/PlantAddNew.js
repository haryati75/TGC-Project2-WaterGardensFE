import React from 'react';

// Rendered lists
const careLevels = [
    {key: "easy", label: "Easy"}, 
    {key: "medium", label: "Medium"},
    {key: "hard", label: "Hard"}
]

const lightingLevels = [
    {key: "low", label: "Low"}, 
    {key: "moderate-low", label: "Moderate-Low"},
    {key: "moderate", label: "Moderate"},
    {key: "moderate-high", label: "Moderate-High"},
    {key: "high", label: "High"}
]

function renderedDropdown(keyLabels, formField, updateFormField, fieldName) {
    // Rendered List Dropdown 
    return (
        keyLabels.map( item => 
            <React.Fragment key={item.key}>
                <option
                    name={fieldName}
                    value={item.key}
                    selected={ formField === item.key }
                    onChange={updateFormField}
                >{item.label}</option>
            </React.Fragment>
        )
    )
}

function PlantAddNew(props) {
    return (
        <React.Fragment>
            <h1>Add New Plant</h1>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newPlantName" placeholder="Plant Name"
                    name="newPlantName"
                    value={props.newPlantName}
                    onChange={props.updateFormField}
                />
                <label for="newPlantName">Plant Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Describe plant appearance" 
                    id="newPlantAppearance"
                    name="newPlantAppearance"
                    value={props.newPlantAppearance}
                    onChange={props.updateFormField}
                ></textarea>
                <label for="newPlantAppearance">Describe its appearance</label>
            </div>

            <div className="row g-2 mb-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" id="newPlantCare" aria-label="New Plant Care">
                            <option selected>Select its ease of care</option>
                            {renderedDropdown(careLevels, props.newPlantCare, props.updateFormField, "newPlantCare")}
                        </select>
                        <label for="newPlantCare">Ease of Care</label>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" id="newPlantLighting" aria-label="New Plant Lighting">
                            <option selected>Select Lighting Condition</option>
                            {renderedDropdown(lightingLevels, props.newPlantLighting, props.updateFormField, "newPlantLighting")}
                        </select>
                        <label for="newPlantLighting">Lighting Condition</label>
                    </div>
                </div>
            </div>
 
            <div className="card">
                <img className="card-img-top rounded mx-auto d-block" src={props.newPlantPhotoURL} alt={props.newPlantName}/>
                <div className="label">Photo URL:</div>
                <input
                    type="text"
                    className="form-control"
                    name="newPlantPhotoURL"
                    value={props.newPlantPhotoURL}
                    onChange={props.updateFormField}
                />
            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={props.addNewPlant}
            >Add New
            </button>
        </React.Fragment>
    );
}

export default PlantAddNew;