import React from 'react';

function PopupConfirmDelete (props) {
    return (
        <React.Fragment>
            <div className="popup-background">
                <div className="popup card text-center">
                    <div className="card-header">Delete {props.deleteWhat}</div>
                    <img className="rounded mx-auto d-block" style={{width : "30%"}} src={props.deletePhotoURL} alt={props.deleteName}/>
                    <div className="card-text">
                        Are you sure you want to delete {props.deleteName}?
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
                    ID: {props.deleteId}
                </div>
            </div>
        </React.Fragment>
    );
}

export default PopupConfirmDelete;