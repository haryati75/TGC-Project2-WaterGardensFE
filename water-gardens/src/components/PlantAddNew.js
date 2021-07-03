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

function renderedDropdown(keyLabels) {
    return (
        keyLabels.map( item => 
            <React.Fragment key={item.key}>
                <option value={item.key}>{item.label}</option>
            </React.Fragment>
        )
    )
}

function PlantAddNew(props) {
    return (
        <React.Fragment>
            <div className="sub-header">
                <h2>Submit a new Aquatic Plant</h2>
            </div>
            
            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newPlantName" placeholder="Plant Name"
                    name="newPlantName"
                    value={props.newPlantName}
                    onChange={props.updateFormField}
                />
                <label htmlFor="newPlantName">Plant Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Describe plant appearance" 
                    id="newPlantAppearance"
                    name="newPlantAppearance"
                    value={props.newPlantAppearance}
                    onChange={props.updateFormField}
                ></textarea>
                <label htmlFor="newPlantAppearance">Describe its appearance</label>
            </div>

            <div className="row g-2 mb-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="newPlantCare" 
                            aria-label="New Plant Care"
                            name="newPlantCare"
                            value={props.newPlantCare}
                            onChange={props.updateFormField}
                        >
                            {renderedDropdown(careLevels)}
                        </select>
                        <label htmlFor="newPlantCare">Ease of Care</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="newPlantLighting" 
                            aria-label="New Plant Lighting"
                            name="newPlantLighting"
                            value={props.newPlantLighting}
                            onChange={props.updateFormField}                       
                        >
                            {renderedDropdown(lightingLevels)}
                        </select>
                        <label htmlFor="newPlantLighting">Lighting Condition</label>
                    </div>
                </div>

            </div>
 
            <div className="card border-0">
                <img className="img-thumbnail mx-auto d-block col-4" src={props.newPlantPhotoURL} alt={props.newPlantName}/>
                
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" 
                        id="newPlantPhotoURL" placeholder="URL of Plant Image"
                        name="newPlantPhotoURL"
                        value={props.newPlantPhotoURL}
                        onChange={props.updateFormField}
                    />
                    <label htmlFor="newPlantPhotoURL">Plant Image URL</label>
                </div>
            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={props.addNewPlant}
            >Submit
            </button>
        </React.Fragment>
    );
}

export default PlantAddNew;