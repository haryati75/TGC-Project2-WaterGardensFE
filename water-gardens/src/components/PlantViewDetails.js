import React from 'react';

function PlantViewDetails(props) {
    return (
        <React.Fragment>
            <div className="card mt-3 g-1">

                <div className="card-header text-center">
                    <h2 className="card-title">{props.plant.name}</h2>
                </div> 
                
                <div className="card-body d-flex flex-column flex-md-row justify-content-center">

                    <div className="col col-12 col-md-5">
                        <img className="card-img-top rounded mx-auto d-block col-4" src={props.plant.photoURL} alt={props.plant.name}/>
                    </div>
                    
                    <div className="col col-12 col-md-4">
                        <ul className="list-group list-group-flush">  
                            <li className="list-group-item card-text">Appearance: {props.plant.appearance}</li>
                            <li className="list-group-item card-text">Ease of Care: {props.plant.care}</li>
                            <li className="list-group-item card-text">Lighting: {props.plant.lighting}</li>
                        </ul>
                    </div>

                    <div className="col col-10 col-md-3">
                        <div className="card-footer mx-auto">
                            { Array.isArray(props.plant.smartTags) && props.plant.smartTags.length > 0 ? 
                                <h5 className="mb-2 text-center">Smart Tags</h5> 
                                : null }
                            {Array.isArray(props.plant.smartTags) ? 
                                props.plant.smartTags.map(t => 
                                    <span className="badge rounded-pill bg-warning text-dark mx-1">{t}</span>)
                                : null }
                        </div>
                    </div>

                </div>

            </div>

            <div className="container d-flex justify-content-start flex-row mt-3">
                <button
                    className="btn btn-info me-3"
                    onClick={() => {
                        props.plant.likes++;
                        props.increasePlantLikesByOne(props.plant._id);
                    }}
                ><i className="fas fa-thumbs-up"></i> Likes: {props.plant.likes}</button>

                <button
                    className="btn btn-primary me-3"
                    onClick={props.showPlantEditDetails}
                >Edit Plant</button>
                <button
                    className="btn btn-danger me-3"
                    disabled={!props.allowPlantDelete}
                    onClick={() => {
                        props.displayDeletePopup(props.plant._id, props.plant.name, props.plant.photoURL, "plant");
                    }}
                >Delete Plant</button>
                <button
                    className="btn btn-dark me-3"
                    onClick={props.hidePlantDetails}
                >Go back <i className="fas fa-th-list"></i></button>
            </div>


        </React.Fragment>
    )
}

export default PlantViewDetails;