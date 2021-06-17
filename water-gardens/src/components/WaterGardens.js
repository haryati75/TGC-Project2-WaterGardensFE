import React from 'react';
import axios from 'axios';
import PlantAddNew from './PlantAddNew';
import PlantListing from './PlantListing';
import GardenAddNew from './GardenAddNew';
import GardenListing from './GardenListing';

const baseURL = "https://3000-tan-trout-gu31y5ul.ws-us09.gitpod.io";

class WaterGardens extends React.Component {
    state = {
        'active': 'garden-listing',
        'plants': [],
        'gardens': [],

        'newPlantName': "",
        'newPlantAppearance': "",
        'newPlantCare': "",
        'newPlantLighting': ""
    }

    fetchData = async (route) => {
        let response = await axios.get(baseURL + route);
        return response.data;
    }

    async componentDidMount() {
        let plantsData = await this.fetchData("/plants");
        let gardensData = await this.fetchData("/gardens");
        this.setState({
            'plants': plantsData,
            'gardens': gardensData
        })
    }

    setActive = (page) => {
        this.setState({
            'active' : page
        })
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    addNewPlant = async () => {
        let response = await axios.post(baseURL + "/plant/add", {
            'name' : this.state.newPlantName,
            'appearance' : this.state.newPlantAppearance,
            'care' : this.state.newPlantCare,
            'lighting' : this.state.newPlantLighting,
            'likes' : 0
        })
        // return to listing
        this.setState({
            'plants': [
                ...this.state.plants,
                response.data[0]
            ],
            'active': 'plant-listing'
        })
    }

    addNewGarden = async () => {

    }

    renderContent() {
        if (this.state.active === 'plant-listing') {
            return (
                <React.Fragment>
                    <PlantListing plants={this.state.plants}/>
                </React.Fragment>
            );
        } else if (this.state.active === 'plant-add') {
            return (
                <React.Fragment>
                    <PlantAddNew 
                        newPlantName={this.state.newPlantName} 
                        newPlantAppearance={this.state.newPlantAppearance}
                        newPlantCare={this.state.newPlantCare}
                        newPlantLighting={this.state.newPlantLighting}
                        updateFormField={this.updateFormField}
                        addNewPlant={this.addNewPlant}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-listing') {
            return (
                <React.Fragment>
                    <GardenListing gardens={this.state.gardens} />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-add') {
            return (
                <React.Fragment>
                    <GardenAddNew />
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Water Gardens Gallery</h1>
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="garden-listing" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-listing" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("garden-listing");
                                }}
                            >Gardens
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="plant-listing" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-listing" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("plant-listing");
                                }}
                            >Plants
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="garden-add" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-add" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("garden-add");
                                }}
                            >Add New Garden
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="plant-add" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-add" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("plant-add");
                                }}
                            >Add New Plant
                            </button>
                        </li>
                    </ul>
                    {this.renderContent()}
                </div>
                <h1>Developed by: Haryati Hassan</h1>
            </React.Fragment>
        );
    }
}

export default WaterGardens;
