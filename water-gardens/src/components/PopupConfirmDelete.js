import React from 'react';

function PopupConfirmDelete (props) {
    return (
        <React.Fragment>
            <div className="popup-background">
                <div className="popup card text-center">
                    <div className="card-header d-flex">
                        <div className="flex-grow-1">
                            <h4 className="card-title">Delete {props.deleteWhat}</h4>
                        </div>
                        <button className="rounded" onClick={()=>{props.hideDeletePopup(false)}}>X</button>
                    </div>

                    <div className="card-body">
                        <img className="card-img-top img-thumbnail mx-auto" style={{maxWidth: "200px", maxHeight: "30vh"}} src={props.deletePhotoURL} alt={props.deleteName}/>
                        <div className="card-text">
                            Are you sure you want to delete {props.deleteName}?
                        </div>
                    </div>

                    <div className="card-footer">
                        <button 
                            className="btn btn-secondary me-3" 
                            onClick={() => {props.hideDeletePopup(false)}}
                        >Close</button>
                        <button 
                            className="btn btn-danger me-3" 
                            onClick={() => {props.hideDeletePopup(true)}}
                        >Confirm Delete</button>
                    </div>
                    {/* ID: {props.deleteId} */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default PopupConfirmDelete;