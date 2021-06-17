import React from 'react';

function renderCareLevels(props) {
    const careLevels = [
        {key: "easy", label: "Easy"}, 
        {key: "medium", label: "Medium"},
        {key: "hard", label: "Hard"}
    ]

    return (
        careLevels.map( c => 
            <React.Fragment key={c.key}>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="newPlantCare"
                        value={c.key}
                        checked={ props.newPlantCare === c.key }
                        onChange={props.updateFormField}
                    />
                    <label className="form-check-label">{c.label}</label>
                </div>
            </React.Fragment>
        )
    )
}

function renderLightingLevels(props) {
    const lightingLevels = [
        {key: "low", label: "Low"}, 
        {key: "moderate-low", label: "Moderate-Low"},
        {key: "moderate", label: "Moderate"},
        {key: "moderate-high", label: "Moderate-High"},
        {key: "high", label: "High"}
    ]

    return (
        <React.Fragment>
            <select 
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="newPlantLighting"
                value={props.newPlantLighting}
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

function PlantAddNew(props) {
    return (
        <React.Fragment>
            <h1>Add New Plant</h1>
            <div>
                <div className="label">Name</div>
                <input
                    type="text"
                    className="form-control"
                    name="newPlantName"
                    value={props.newPlantame}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Appearance</div>
                <input
                    type="text"
                    className="form-control"
                    name="newPlantAppearance"
                    value={props.newPlantAppearance}
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
            <button
                className="btn btn-primary mt-3"
                onClick={props.addNewPlant}
            >Add New
            </button>
        </React.Fragment>
    );
}

export default PlantAddNew;