import React from 'react';

class PlantDeleteConfirm extends React.Component {

    state = {
        plantId: this.props.plantId
    }

    render() {
        console.log("Plant Delete modal")
        return (
            <React.Fragment>
                <div className="modal">
                    Are you sure you want to delete this plant - {this.state.plantId}?
                </div>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.deletePlant(this.state.plantId)
                    }}
                >Confirm Delete</button>
            </React.Fragment>
        )
    }
}

export default PlantDeleteConfirm;