import React from 'react';

function PlantListing(props) {
    return (
        <React.Fragment>
            <h1>Plants Listing</h1>
            <div className="row">
            {props.plants.map( p => 
                <React.Fragment key={p._id}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={p.photoURL} alt={p.name}/>
                            <h3 className="card-title">{p.name}</h3>
                            <p className="card-text">{p.appearance}</p>
                            <button
                                className="btn btn-info me-3"
                                onClick={() => {
                                    props.increasePlantLikesByOne(p._id);
                                }}
                            ><i className="fas fa-thumbs-up"></i> Likes: {p.likes}</button>

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
            </div>
        </React.Fragment>
    );
}


export default PlantListing;