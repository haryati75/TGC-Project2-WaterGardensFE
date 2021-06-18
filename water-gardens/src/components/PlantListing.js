import React from 'react';

function PlantListing(props) {
    return (
        <React.Fragment>
            <h1>Plants Listing</h1>
            {props.plants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                            <h3 className="card-title">{p.name}</h3>
                            <p className="card-text">Appearance: {p.appearance}</p>
                            {/* <p>Likes: {p.likes}</p> */}
                            <button
                                className="btn btn-info me-3"
                                onClick={() => {
                                    props.increasePlantLikesByOne(p._id);
                                }}
                            >Increase Likes: {p.likes}</button>

                            <button
                                className="btn btn-success me-3"
                                onClick={() => {
                                    props.viewPlantDetails(p._id);
                                }}
                            >View Plant Details</button>
                        </div>

                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}


export default PlantListing;