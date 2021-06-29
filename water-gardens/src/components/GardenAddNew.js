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
                name="newGardenComplexityLevel"
                value={props.newGardenComplexityLevel}
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

function GardenAddNew(props) {
    return (
        <React.Fragment>
            <h1>Add New Garden</h1>
            <div>
                <div className="label">Name of Garden</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenName"
                    value={props.newGardenName}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Description</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenDesc"
                    value={props.newGardenDesc}
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
                    name="newGardenCompletionDate"
                    value={props.newGardenCompletionDate}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">How many weeks do you take to complete it?</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenWeeksToComplete"
                    value={props.newGardenWeeksToComplete}
                    onChange={props.updateFormField}
                />
            </div>
            <div className="card">
                <img className="rounded mx-auto d-block" style={{width : "50%"}} src={props.newGardenPhotoURL} alt={props.newGardenName}/>
                <div className="label">Photo URL:</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenPhotoURL"
                    value={props.newGardenPhotoURL}
                    onChange={props.updateFormField}
                />
            </div>

            <hr></hr>
            <div>
                <div className="label">Aquascaper Name:</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenAquascaperName"
                    value={props.newGardenAquascaperName}
                    onChange={props.updateFormField}
                />
            </div>
            <div>
                <div className="label">Aquascaper Email:</div>
                <input
                    type="text"
                    className="form-control"
                    name="newGardenAquascaperEmail"
                    value={props.newGardenAquascaperEmail}
                    onChange={props.updateFormField}
                />
            </div>
            <button
                className="btn btn-primary mt-3"
                onClick={props.addNewGarden}
            >Add New
            </button>
        </React.Fragment>
    );
}

export default GardenAddNew;