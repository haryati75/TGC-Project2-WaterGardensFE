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

        <div className="sub-header">
            <h2>Edit Aquatic Plant</h2>
        </div>
        
        <div className="form-floating mb-3">
            <input type="text" className="form-control" 
                id="editedPlantName" placeholder="Plant Name"
                name="editedPlantName"
                value={props.editedPlantName}
                onChange={props.updateFormField}
            />
            <label htmlFor="editedPlantName">Plant Name</label>
        </div>

        <div className="form-floating mb-3">
            <textarea className="form-control" placeholder="Describe plant appearance" 
                id="editedPlantAppearance"
                name="editedPlantAppearance"
                value={props.editedPlantAppearance}
                onChange={props.updateFormField}
            ></textarea>
            <label htmlFor="editedPlantAppearance">Describe its appearance</label>
        </div>

        <div className="row g-2 mb-3">

            <div className="col-md">
                <div className="form-floating">
                    <select className="form-select" 
                        id="editedPlantCare" 
                        aria-label="Edit Plant Care"
                        name="editedPlantCare"
                        value={props.editedPlantCare}
                        onChange={props.updateFormField}
                    >
                        {renderedDropdown(careLevels)}
                    </select>
                    <label htmlFor="editedPlantCare">Ease of Care</label>
                </div>
            </div>

            <div className="col-md">
                <div className="form-floating">
                    <select className="form-select" 
                        id="editedPlantLighting" 
                        aria-label="Edit Plant Lighting"
                        name="editedPlantLighting"
                        value={props.editedPlantLighting}
                        onChange={props.updateFormField}                       
                    >
                        {renderedDropdown(lightingLevels)}
                    </select>
                    <label htmlFor="editedPlantLighting">Lighting Condition</label>
                </div>
            </div>

        </div>

        <div className="card border-0">
            <img className="img-thumbnail mx-auto d-block col-4" src={props.editedPlantPhotoURL} alt={props.editedPlantName}/>
            
            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="editedPlantPhotoURL" placeholder="URL of Plant Image"
                    name="editedPlantPhotoURL"
                    value={props.editedPlantPhotoURL}
                    onChange={props.updateFormField}
                />
                <label htmlFor="editedPlantPhotoURL">Plant Image URL</label>
            </div>
        </div>
        
        <hr></hr>

        <div className="card">
            <div className="card-header sub-header">
                <h3>Smart Tags for Plant</h3>
            </div>

            <ul>
                {renderSmartTags(props.editedPlantSmartTags, props.deleteSmartTag)}
            </ul>
        </div>

        <div className="form-floating">
            <select 
                className="form-select" 
                id="toAddTag"
                aria-label=".form-select"
                name="toAddTag"
                value={props.toAddTag}
                onChange={props.updateFormField}
                >      
                <option value={""}>Select an existing Smart Tag</option>
                {renderedDropdown(props.plantSmartTags)}
            </select>
            <label htmlFor="toAddTag">Available Smart Tags</label>
        </div>

        <div className="input-group">
            <input type="text" 
                className="form-control" 
                placeholder="Enter a new Smart Tag" 
                aria-label="New Smart Tag" 
                aria-describedby="btnAddSmartTag"
                name="toAddTag"
                value={props.toAddTag}
                onChange={props.updateFormField}
            />
            <button className="btn btn-outline-secondary" 
                type="button" 
                id="btnAddSmartTag"
                onClick={props.addSmartTag}>
            Add Smart Tag</button>
        </div>

        <hr></hr>

        <button
            className="btn btn-success me-3"
            onClick={() => { props.saveEditedPlant(props.plantIdBeingEdited); }}
        >
            Save Changes
        </button>
        <button
            className="btn btn-secondary me-3"
            onClick={props.hidePlantEditDetails}
        >
            Cancel
        </button>
        
    </React.Fragment>)
    
}

export default PlantEditDetails;
