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

function GardenAddNew(props) {
    return (
        <React.Fragment>
            <div className="sub-header">
                <h2>Submit a new Water Garden</h2>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenName" placeholder="Garden Name"
                    name="newGardenName"
                    value={props.newGardenName}
                    onChange={props.updateFormField}
                />
                <label htmlFor="newGardenName">Garden Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height:"100px"}}
                    placeholder="Describe Garden" 
                    id="newGardenDesc"
                    name="newGardenDesc"
                    value={props.newGardenDesc}
                    onChange={props.updateFormField}
                ></textarea>
                <label htmlFor="newGardenDesc">Describe the garden briefly</label>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select className="form-select" 
                            id="newGardenComplexityLevel" 
                            name="newGardenComplexityLevel"
                            value={props.newGardenComplexityLevel}
                            onChange={props.updateFormField}
                            aria-label="New Garden Complexity">
                            <option defaultValue>Select its complexity</option>
                            {renderedDropdown(complexityLevels)}
                        </select>
                        <label htmlFor="newGardenComplexityLevel">Level of Complexity</label>
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
                        <label htmlFor="newGardenWeeksToComplete">Weeks to complete</label>
                    </div>
                </div>

            </div>

            <div className="card border-0">
                <img className="rounded mx-auto d-block" style={{maxWidth : "80%"}} src={props.newGardenPhotoURL} alt={props.newGardenName}/>
                
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" 
                        id="newGardenPhotoURL" placeholder="URL of Garden Image"
                        name="newGardenPhotoURL"
                        value={props.newGardenPhotoURL}
                        onChange={props.updateFormField}
                    />
                    <label htmlFor="newGardenPhotoURL">Garden Image URL</label>
                </div>
            </div>

            <hr></hr>

            <div className="sub-header">
                <h3>Aquascaper</h3>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenAquascaperName" placeholder="Aquascaper Name"
                    name="newGardenAquascaperName"
                    value={props.newGardenAquascaperName}
                    onChange={props.updateFormField}
                />
                <label htmlFor="newGardenAquascaperName">Aquascaper Name</label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" 
                    id="newGardenAquascaperEmail" placeholder="Aquascaper Website"
                    name="newGardenAquascaperEmail"
                    value={props.newGardenAquascaperEmail}
                    onChange={props.updateFormField}
                />
                <label htmlFor="newGardenAquascaperEmail">Aquascaper Website</label>
            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={props.addNewGarden}
            >Submit
            </button>
        </React.Fragment>
    );
}

export default GardenAddNew;