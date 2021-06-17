import React from 'react';

function GardenListing(props) {
    return (
        <React.Fragment>
            <h1>Gardens Listing</h1>
            {props.gardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <h5>Description: {g.desc}</h5>
                            <h5>Aquascaper: {g.aquascaper.name}</h5>
                            <p>Contact: {g.aquascaper.email}</p>
                            <p>Plants:</p>
                            <ul>
                                {Array.isArray(g.plants) ? g.plants.map(p => <li key={p.id}>{p.name}</li>) : null}
                            </ul>
                            <button
                                className="btn btn-info me-3"
                                onClick={props.addReview}
                            >Add a Review</button>
                            <button
                                className="btn btn-primary me-3"
                                onClick={props.addPlantToGarden}
                            >Add Plant</button>
                            <button
                                className="btn btn-success me-3"
                                onClick={props.editGarden}
                            >Edit Garden</button>
                            <button
                                className="btn btn-secondary me-3"
                                onClick={() => {
                                    props.displayDeletePopup(g._id, "garden");
                                }}
                            >Delete Garden</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default GardenListing;