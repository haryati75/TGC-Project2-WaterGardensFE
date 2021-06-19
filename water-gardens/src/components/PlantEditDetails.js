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

// same as PlantAddNew but change the props field to Edit states in Parent
function renderCareLevels (props) {
    // Radio buttons for Ease of Care 
    return (
        careLevels.map( c => 
            <React.Fragment key={c.key}>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="editedPlantCare"
                        value={c.key}
                        checked={ props.editedPlantCare === c.key }
                        onChange={props.updateFormField}
                    />
                    <label className="form-check-label">{c.label}</label>
                </div>
            </React.Fragment>
        )
    )
}

function renderLightingLevels (props) {
    // Dropdown list for Lighting
    return (
        <React.Fragment>
            <select 
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="editedPlantLighting"
                value={props.editedPlantLighting}
                onChange={props.updateFormField}
                >
                <option value="">Select Lighting Level</option>
                {lightingLevels.map( l => 
                    <React.Fragment key={l.key}>
                        <option value={l.key}>{l.label}</option>
                    </React.Fragment>
                )}
            </select>
        </React.Fragment>
    )
}

function renderSmartTags (tags, deleteSmartTag) {
    let tagsJSX = [];
    for (let t of tags) {
        let e = (<React.Fragment key={t}>
                <li>
                    {t}
                    <button className="btn btn-danger btn-sm ms-3"
                        onClick={() => { deleteSmartTag(t); }}
                    ><i className="far fa-trash-alt"></i></button>
                </li>
                </React.Fragment>)
        tagsJSX.push(e);
    }
    return tagsJSX;
}

function PlantEditDetails (props) {

    return (<React.Fragment>
        <h1>Edit Plant Details</h1>
        <div>
            <div className="label">Name</div>
            <input
                type="text"
                className="form-control"
                name="editedPlantName"
                placeholder="Enter new Name"
                value={props.editedPlantName}
                onChange={props.updateFormField}
            />
        </div>
        <div>
            <div className="label">Appearance</div>
            <input
                type="text"
                className="form-control"
                name="editedPlantAppearance"
                placeholder="Enter new Appearance"
                value={props.editedPlantAppearance}
                onChange={props.updateFormField}
            />
        </div>
        <div>
            <div className="label">Ease of Care:</div>
            {renderCareLevels(props)}
        </div>
        <div>
            <div className="label">Lighting:</div>
            {renderLightingLevels(props)}
        </div>
        <div className="card">
            <img className="card-img-top" src={props.editedPlantPhotoURL} alt={props.editedPlantName}/>
            <div className="label">Photo URL:</div>
                <input
                    type="text"
                    className="form-control"
                    name="editedPlantPhotoURL"
                    value={props.editedPlantPhotoURL}
                    onChange={props.updateFormField}
                />
        </div>
        
        <hr></hr>
        <p>Keywords:</p>
        <ul>
            {renderSmartTags(props.editedPlantSmartTags, props.deleteSmartTag)}
        </ul>
        <input 
            type="text"
            className="form-control"
            name="toAddTag"
            placeholder="Enter a new keyword"
            value={props.toAddTag}
            onChange={props.updateFormField}
        />
        <button
            className="btn btn-primary me-3"
            onClick={props.addSmartTag}
        >Add Keyword
        </button>
        <hr></hr>

        <button
            className="btn btn-success me-3"
            onClick={() => { props.saveEditedPlant(props.plantIdBeingEdited); }}
        >Save Changes
        </button>
        <button
            className="btn btn-secondary me-3"
            onClick={props.hidePlantEditDetails}
        >Cancel
        </button>
        
    </React.Fragment>)
    
}

export default PlantEditDetails;
