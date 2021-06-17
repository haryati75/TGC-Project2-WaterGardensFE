import React from 'react';

function PlantListing(props) {
    return (
        <React.Fragment>
            <h1>Plants Listing</h1>
            {props.plants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                {p.name}
                            </h3>
                            <h5>Ease of Care: {p.care}</h5>
                            <h5>Lighting: {p.lighting}</h5>
                            <p>Appearance: {p.appearance}</p>
                            <p>Likes: {p.likes}</p>
                            <p>Keywords:</p>
                            <ul>
                                {Array.isArray(p.smartTags) ? p.smartTags.map(t => <li key={t}>{t}</li>) : null}
                            </ul>
                            <button
                                className="btn btn-info me-3"
                                onClick={props.increaseLikes}
                            >Increase Likes</button>
                            <button
                                className="btn btn-primary me-3"
                                onClick={props.addSmartTags}
                            >Add Keywords</button>
                            <button
                                className="btn btn-success me-3"
                                onClick={props.editPlant}
                            >Edit Plant</button>
                            <button
                                className="btn btn-secondary me-3"
                                onClick={props.deletePlant}
                            >Delete Plant</button>
                        </div>

                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default PlantListing;