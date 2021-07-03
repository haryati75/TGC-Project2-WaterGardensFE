import React from 'react';

const ratingLevels = [
    {key: 5, label: "1"}, 
    {key: 4, label: "2"},
    {key: 3, label: "3"},
    {key: 2, label: "4"},
    {key: 1, label: "5"}
]

function renderRatingLevels (props) {
    // Ratings via fontawesom icons in CSS
    let ratingsJSX = [];

    for (let r of ratingLevels) {
        let e = (<React.Fragment key={r.key}>
            <input
                type="radio"
                id={"editedRatingLevel"+r.label}
                name="editedRatingLevel"
                value={r.key}
                checked={ props.editedRatingLevel === r.key }
                onChange={props.updateFormField}
            />
            <label htmlFor={"editedRatingLevel"+r.label}></label>
        </React.Fragment>)
        ratingsJSX.push(e);
    }

    return ratingsJSX;
}

function PopupGardenRatingEdit (props) {

    return(<React.Fragment>
        <div className="popup-background">
                <div className="popup card text-center">
                    <div className="card-header d-flex">
                        <div className="flex-grow-1"><h2>Edit Garden Rating</h2></div>
                        <button className="rounded" 
                            onClick={()=>{props.hidePopupGardenRatingEdit(false)}}
                        >X</button>
                    </div>

                    <div className="card-body">
                        <div className="row form-floating mb-3 mx-5" style={{width : "80%"}}>
                            <div className="label">Change Rating: </div>
                            <div className="container">
                                <div className="starrating d-flex justify-content-center flex-row-reverse">
                                    {renderRatingLevels(props)}
                                </div>
                            </div> 
                        </div>

                        <div className="form-floating mb-3 mx-auto" style={{width: "80%"}}>
                            <textarea className="form-control" style={{height:"100px"}}
                                id="editedRatingComment" placeholder="Rating Comment"
                                name="editedRatingComment"
                                value={props.editedRatingComment}
                                onChange={props.updateFormField}
                            ></textarea>
                            <label htmlFor="editedRatingComment">Comments: </label>
                        </div>
                    </div>
                    
                    <div className="card-footer fixed-bottom" >
                        <button 
                            className="btn btn-secondary my-auto me-3"
                            onClick={() => {props.hidePopupGardenRatingEdit(false)}}
                        >Close</button>
                        <button 
                            className="btn btn-danger my-auto me-3" 
                            onClick={() => {props.hidePopupGardenRatingEdit(true)}}
                        >Update</button>
                    </div>
                    {/* ID: {props.ratingBeingEdited} */}
                </div>
            </div>
    </React.Fragment>)

}

export default PopupGardenRatingEdit;