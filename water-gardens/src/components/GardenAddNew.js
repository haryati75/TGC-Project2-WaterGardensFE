import React from 'react';

const complexityLevels = [
    {key: "beginner", label: "Beginner"}, 
    {key: "intermediate", label: "Intermediate"},
    {key: "semi-professional", label: "Semi-Professional"},
    {key: "professional", label: "Professional"}
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

function GardenAddNew(props) {
    return (
        <React.Fragment>
            <h1>Add New Garden</h1>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenName" placeholder="Garden Name"
                    name="newGardenName"
                    value={props.newGardenName}
                    onChange={props.updateFormField}
                />
                <label for="newGardenName">Garden Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Describe Garden" 
                    id="newGardenDesc"
                    name="newGardenDesc"
                    value={props.newGardenDesc}
                    onChange={props.updateFormField}
                ></textarea>
                <label for="newGardenDesc">Describe the garden briefly</label>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" id="newGardenComplexityLevel" aria-label="New Garden Complexity">
                            <option selected>Select its complexity</option>
                            {renderedDropdown(complexityLevels, props.newGardenComplexityLevel, props.updateFormField, "newGardenComplexityLevel")}
                        </select>
                        <label for="newGardenComplexityLevel">Level of Complexity</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="label">Completion Date:</div>
                    <input
                        type="date"
                        className="form-control"
                        name="newGardenCompletionDate"
                        value={props.newGardenCompletionDate}
                        onChange={props.updateFormField}
                    />
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <input type="text" className="form-control" 
                            id="newGardenWeeksToComplete" placeholder="Duration to Complete"
                            name="newGardenWeeksToComplete"
                            value={props.newGardenWeeksToComplete}
                            onChange={props.updateFormField}
                        />
                        <label for="newGardenWeeksToComplete">Weeks to complete</label>
                    </div>
                </div>

            </div>

            <div className="card">
                <img className="card-img-top rounded mx-auto d-block" style={{width : "50%"}} src={props.newGardenPhotoURL} alt={props.newGardenName}/>
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
            <h1>Aquascaper Details: </h1>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenAquascaperName" placeholder="Aquascaper Name"
                    name="newGardenAquascaperName"
                    value={props.newGardenAquascaperName}
                    onChange={props.updateFormField}
                />
                <label for="newGardenAquascaperName">Aquascaper Name</label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenAquascaperEmail" placeholder="Aquascaper Website"
                    name="newGardenAquascaperEmail"
                    value={props.newGardenAquascaperEmail}
                    onChange={props.updateFormField}
                />
                <label for="newGardenAquascaperEmail">Aquascaper Website</label>
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