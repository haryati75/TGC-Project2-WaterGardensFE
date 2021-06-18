import React from 'react';
import axios from 'axios';

// Main Page Sections
import Header from './Header';
import Footer from './Footer';

// Content Section: Navigation Tabs
import Home from './Home';
import PlantAddNew from './PlantAddNew';
import PlantListing from './PlantListing';
import PlantViewDetails from './PlantViewDetails';
import PlantEditDetails from './PlantEditDetails';
import GardenAddNew from './GardenAddNew';
import GardenListing from './GardenListing';
import GardenViewDetails from './GardenViewDetails';

const baseURL = "https://3000-tan-trout-gu31y5ul.ws-us08.gitpod.io";

class WaterGardens extends React.Component {
    state = {
        'plants': [],
        'gardens': [],
        'active': 'home',

        // Toggle between Listing All or View Detail of One
        'showPlant': false,
        'plantBeingShown': 0,
        'editPlant': false,
        'plantIdBeingEdited' : 0,
        'showGarden': false,
        'gardenBeingShown': 0,

        // to add new plant
        'newPlantName': "",
        'newPlantAppearance': "",
        'newPlantCare': "",
        'newPlantLighting': "",
        'newPlantPhotoURL' : "",

        // to add new garden
        'newGardenName': "",
        'newGardenDesc': "",
        'newGardenCompletionDate': "",
        'newGardenWeeksToComplete': 0,
        'newGardenComplexityLevel': "",
        'newGardenAquascaperName': "",
        'newGardenAquascaperEmail': "", 
        'newGardenPhotoURL' : "",
        
        // to process deletion
        'deleteWhat': "",
        'deleteId': null,
        'showDeletePopup': false,

        // to edit plant
        'editedPlantName' : "",
        'editedPlantAppearance' : "",
        'editedPlantCare' : "",
        'editedPlantLighting' : "",
        'editedPlantLikes' : 0,     // Likes should not be allowed to edit
        'editedPlantPhotoURL' : "",

        // to edit smartTags during Edit/Add Plant
        'editedPlantSmartTags' : [],
        'toAddTag' : ""
    }

    // -----------------------------------------------
    // Initialize global arrays for plants and gardens
    // -----------------------------------------------
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

    // ------------------------
    // Utilities for Rendering
    // ------------------------
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

    // ------------------------
    // Plant Edit Processing
    // ------------------------
    addSmartTag = () => {
        let newTag = this.state.toAddTag
        let clonedArray = [...this.state.editedPlantSmartTags, newTag]
        this.setState({
            'editedPlantSmartTags' : clonedArray,
            'toAddTag' : ""
        })
    }

    deleteSmartTag = (toDeleteTag) => {
        let indexToDelete = this.state.editedPlantSmartTags.findIndex( t => t === toDeleteTag);

        let clonedArray = [
            ...this.state.editedPlantSmartTags.slice(0, indexToDelete),
            ...this.state.editedPlantSmartTags.slice(indexToDelete + 1)
        ]
        this.setState({
            'editedPlantSmartTags' : clonedArray
        })
    }

    saveEditedPlant = async (plantId) => {
        // save to database
        try {
            await axios.put(baseURL + "/plant/" + plantId + "/edit", {
                name : this.state.editedPlantName,
                appearance : this.state.editedPlantAppearance,
                care : this.state.editedPlantCare,
                lighting : this.state.editedPlantLighting,
                likes : this.state.editedPlantLikes,
                smartTags : this.state.editedPlantSmartTags,
                photoURL : this.state.editedPlantPhotoURL
            })

            // modify the array in the state, reset state for edited fields
            let response = await axios.get(baseURL + "/plant/" + plantId);
            let modifiedPlant = response.data;
            console.log("save successfully", modifiedPlant);

            let indexToChange = this.state.plants.findIndex(p => p._id === plantId);
            let clonedArray = [
                ...this.state.plants.slice(0, indexToChange),
                modifiedPlant,
                ...this.state.plants.slice(indexToChange + 1)
            ];
            this.setState({
                plants : clonedArray,

                'plantIdBeingEdited' : null,

                'editedPlantName' : "",
                'editedPlantAppearance' : "",
                'editedPlantCare' : "",
                'editedPlantLighting' : "",
                'editedPlantLikes' : 0,
                'editedPlantSmartTags' : [],
                'editedPlantPhotoURL' : "",
    
                'editPlant': false,
                'plantBeingShown' : modifiedPlant,
                'active': "plant-view" 
            })

        } catch(e) {
            alert("Save edited plant failed. See console.");
            console.log(e);
        }
    }

    increasePlantLikesByOne = async (plantId) => {
        try {
            await axios.patch(baseURL + "/plant/" + plantId + "/likes/add_one")

            // update the plant in the plants array
            let wantedPlant = this.state.plants.filter( p => p._id === plantId ? p : null)[0];
            let clonedPlant = {...wantedPlant};
            clonedPlant.likes++;

            let indexToChange = this.state.plants.findIndex( p => p._id === clonedPlant._id );
            let clonedArray = [
                ...this.state.plants.slice(0, indexToChange),
                clonedPlant,
                ...this.state.plants.slice(indexToChange + 1)
            ];

            this.setState({
                plants : clonedArray,
                'active': this.state.showPlant ? "plant-view" : "plant-listing"
            })

        } catch (e) {
            alert("Increase plant likes failed. See console.")
            console.log(e)
        }            
    }

    //-----------------------------------------------------
    // Toggle between Listing All Plant or View One Plant
    //-----------------------------------------------------
    viewPlantDetails = async (plantId) => {
        // get the plant being viewed from API
        let response = await axios.get(baseURL + "/plant/" + plantId);

        this.setState({
            'showPlant': true,
            'plantBeingShown': response.data,
            'active': "plant-view"
        })
    }

    // on hide of view, go back to listing
    hidePlantDetails = () => {
        this.setState({
            'showPlant': false,
            'plantBeingShown': null,
            'active': "plant-listing"
        });
    };

    showPlantEditDetails = () => {
        let editedPlant = {...this.state.plantBeingShown}
        this.setState({
            'plantIdBeingEdited' : editedPlant._id,

            'editedPlantName' : editedPlant.name,
            'editedPlantAppearance' : editedPlant.appearance,
            'editedPlantCare' : editedPlant.care,
            'editedPlantLighting' : editedPlant.lighting,
            'editedPlantLikes' : editedPlant.likes,
            'editedPlantSmartTags' : editedPlant.smartTags,
            'editedPlantPhotoURL' : editedPlant.photoURL,

            'editPlant': true,
            'active': "plant-edit"
        })
    }

    // on hide of edit, go back to view
    hidePlantEditDetails = () => {
        this.setState({
            'plantIdBeingEdited' : null,

            'editedPlantName' : "",
            'editedPlantAppearance' : "",
            'editedPlantCare' : "",
            'editedPlantLighting' : "",
            'editedPlantLikes' : 0,
            'editedPlantSmartTags' : [],
            'editedPlantPhotoURL' : "",

            'editPlant': false,
            'active': "plant-view" 
        });
    };

    //-------------------------------------------------------
    // Toggle between Listing All Gardens or View One Garden
    //-------------------------------------------------------
    viewGardenDetails = async (gardenId) => {
        // get the plant being viewed from API
        let response = await axios.get(baseURL + "/garden/" + gardenId);

        this.setState({
            'showGarden': true,
            'gardenBeingShown': response.data,
            'active': "garden-view"
        })
    }

    hideGardenDetails = () => {
        this.setState({
            'showGarden': false,
            'gardenBeingShown': null,
            'active': "garden-listing"
        });
    };
    //-----------------------------------------------------
    // Handles Add New document for both plant and garden
    //-----------------------------------------------------
    addNewPlant = async () => {
        let response = await axios.post(baseURL + "/plant/add", {
            'name' : this.state.newPlantName,
            'appearance' : this.state.newPlantAppearance,
            'care' : this.state.newPlantCare,
            'lighting' : this.state.newPlantLighting,
            'likes' : 0,
            'photoURL' : this.state.newPlantPhotoURL
        })
        // add the latest to the first of array, then return to listing
        this.setState({
            'plants': [
                response.data[0],
                ...this.state.plants
            ],
            'newPlantName': "",
            'newPlantAppearance': "",
            'newPlantCare': "",
            'newPlantLighting': "",
            'newPlantPhotoURL' : "",
            'active': 'plant-listing'
        })
    }

    addNewGarden = async () => {
        let response = await axios.post(baseURL + "/garden/add", {
            'name': this.state.newGardenName,
            'desc': this.state.newGardenDesc,
            'completionDate': this.state.newGardenCompletionDate,
            'weeksToComplete': this.state.newGardenWeeksToComplete,
            'complexityLevel': this.state.newGardenComplexityLevel,
            'aquascaper': {
                'name': this.state.newGardenAquascaperName,
                'email': this.state.newGardenAquascaperEmail 
            },
            'photoURL': this.state.newGardenPhotoURL
        })
        // return to listing
        this.setState({
            'gardens': [
                response.data[0],
                ...this.state.gardens
            ],
            'newGardenName': "",
            'newGardenDesc': "",
            'newGardenCompletionDate': "",
            'newGardenWeeksToComplete': 0,
            'newGardenComplexityLevel': "",
            'newGardenAquascaperName': "",
            'newGardenAquascaperEmail': "", 
            'newGardenPhotoURL': "",
            'active': 'garden-listing'
        })
    }

    //-----------------------------------------------------
    // Handles Deletion process for both plant and garden
    //-----------------------------------------------------
    renderDeletePopup() {
        if (this.state.showDeletePopup) {
            // HARYATI: to show the plant/garden name before deletion
            return (
                <React.Fragment>
                    <div className="popup-background">
                        <div className="popup card">
                            <div className="card-body">
                                <h5 className="card-title">Delete a {this.state.deleteWhat}</h5>
                                <p className="card-text">Are you sure you want to delete this {this.state.deleteWhat}?</p>
                                <p className="card-text">{this.state.deleteId}</p>
                                <button 
                                    className="btn btn-secondary me-3" 
                                    onClick={() => {this.hideDeletePopup(false)}}
                                >Close</button>
                                <button 
                                    className="btn btn-primary me-3" 
                                    onClick={() => {this.hideDeletePopup(true)}}
                                >Confirm Delete</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
          } else {
            return null;
        }
    }

    // toggle display/hide of the state variables
    displayDeletePopup = (idToDelete, deleteWhat) => {
        this.setState({
          'showDeletePopup' : true,
          'deleteId' : idToDelete,
          'deleteWhat' : deleteWhat
        });
    };

    hideDeletePopup = (confirm) => {
        // Check for deletion confirmation
        if (confirm === true) {
            this.state.deleteWhat === "plant" ? this.deletePlant(this.state.deleteId) : this.deleteGarden(this.state.deleteId)
        } else {
            // reset all the states for deletion
            this.setState({
                'deleteWhat' : "",
                'deleteId' : null,
                'showDeletePopup' : false
            });
        }
    };

    deletePlant = async (plantId) => {
        // delete from database via API
        try {
            let response = await axios.delete(baseURL + "/plant/" + plantId);

            // delete from array in state
            let toDeleteIdx = this.state.plants.findIndex(p => p._id === plantId);
            let modifiedPlants = [
                ...this.state.plants.slice(0, toDeleteIdx),
                ...this.state.plants.slice(toDeleteIdx + 1)
            ];
    
            // return backk to listing and reset all delete states
            this.setState({
                'plants': modifiedPlants,
                'active': 'plant-listing',
                'deleteWhat' : "",
                'deleteId' : null,
                'showDeletePopup' : false
            });

        } catch(e) {
            alert("Deletion of plant record failed. See console.")
            console.log(e)
        }
    }

    deleteGarden = async (gardenId) => {
        // delete from database via API
        try {
            let response = await axios.delete(baseURL + "/garden/" + gardenId);

            // delete from array in state
            let toDeleteIdx = this.state.gardens.findIndex(g => g._id === gardenId);
            let modifiedGardens = [
                ...this.state.gardens.slice(0, toDeleteIdx),
                ...this.state.gardens.slice(toDeleteIdx + 1)
            ];
    
            // return backk to listing and reset all delete states
            this.setState({
                'gardens': modifiedGardens,
                'active': 'garden-listing',
                'deleteWhat' : "",
                'deleteId' : null,
                'showDeletePopup' : false
            });

        } catch(e) {
            alert("Deletion of garden record failed. See console.")
            console.log(e)
        }
    }

    //------------------------------------------------------------
    // Manage the navigation between components and passing props
    //------------------------------------------------------------
    renderContent() {
        if (this.state.active === 'home') {
            return (
                <React.Fragment>
                    <Home setActive={this.setActive}/>
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-view') {
            return (
                <React.Fragment>
                    <GardenViewDetails 
                        garden={this.state.gardenBeingShown} 
                        displayDeletePopup={this.displayDeletePopup}
                        hideGardenDetails={this.hideGardenDetails}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-listing') {
            return (
                <React.Fragment>
                    <GardenListing 
                        gardens={this.state.gardens}
                        viewGardenDetails={this.viewGardenDetails}
                        displayDeletePopup={this.displayDeletePopup} 
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'plant-edit') {
            return (
                <React.Fragment>
                    <PlantEditDetails 
                        
                        plantIdBeingEdited={this.state.plantIdBeingEdited}
                        editedPlantName={this.state.editedPlantName} 
                        editedPlantAppearance={this.state.editedPlantAppearance}
                        editedPlantCare={this.state.editedPlantCare}
                        editedPlantLighting={this.state.editedPlantLighting} 
                        editedPlantLikes={this.state.editedPlantLikes}
                        editedPlantPhotoURL={this.state.editedPlantPhotoURL}

                        editedPlantSmartTags={this.state.editedPlantSmartTags} 
                        toAddTag={this.state.toAddTag}
                        addSmartTag={this.addSmartTag}
                        deleteSmartTag={this.deleteSmartTag}

                        updateFormField={this.updateFormField}
                        saveEditedPlant={this.saveEditedPlant}
                        hidePlantEditDetails={this.hidePlantEditDetails}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'plant-view') {
            return (
                <React.Fragment>
                    <PlantViewDetails 
                        plant={this.state.plantBeingShown} 
                        increasePlantLikesByOne={this.increasePlantLikesByOne}
                        displayDeletePopup={this.displayDeletePopup}
                        hidePlantDetails={this.hidePlantDetails}
                        showPlantEditDetails={this.showPlantEditDetails}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'plant-listing') {
            return (
                <React.Fragment>
                    <PlantListing 
                        plants={this.state.plants} 
                        viewPlantDetails={this.viewPlantDetails}
                        increasePlantLikesByOne={this.increasePlantLikesByOne}
                        displayDeletePopup={this.displayDeletePopup}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-add') {
            return (
                <React.Fragment>
                    <GardenAddNew 
                        newGardenName={this.state.newGardenName}
                        newGardenDesc={this.state.newGardenDesc}
                        newGardenCompletionDate={this.state.newGardenCompletionDate}
                        newGardenWeeksToComplete={this.state.newGardenWeeksToComplete}
                        newGardenComplexityLevel={this.state.newGardenComplexityLevel}
                        newGardenAquascaperName={this.state.newGardenAquascaperName}
                        newGardenAquascaperEmail={this.state.newGardenAquascaperEmail}
                        newGardenPhotoURL={this.state.newGardenPhotoURL}
                        updateFormField={this.updateFormField}
                        addNewGarden={this.addNewGarden}
                    />
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
                        newPlantPhotoURL={this.state.newPlantPhotoURL}
                        updateFormField={this.updateFormField}
                        addNewPlant={this.addNewPlant}
                    />
                </React.Fragment>
            );
        }
    }

    //------------------------------------------------------------
    // Main Page Structure and Setting the active tabs
    //------------------------------------------------------------
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="home" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="home" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("home");
                                }}
                            >Highlights
                            </button>
                        </li>
                        <li className={this.state.showGarden ? "nav-item d-none" : "nav-item"}>
                            <button 
                                className={this.state.active==="garden-listing" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-listing" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("garden-listing");
                                }}
                            >Gardens
                            </button>
                        </li>
                        <li className={this.state.showGarden ? "nav-item" : "nav-item d-none"}>
                            <button 
                                className={this.state.active==="garden-view" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-view" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("garden-view");
                                }}
                            >View Garden
                            </button>
                        </li>
                        <li className={this.state.showPlant ? "nav-item d-none" : "nav-item"}>
                            <button 
                                className={this.state.active==="plant-listing" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-listing" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("plant-listing");
                                }}
                            >Aquatic Plants
                            </button>
                        </li>
                        <li className={this.state.showPlant && !this.state.editPlant ? "nav-item" : "nav-item d-none"}>
                            <button 
                                className={this.state.active==="plant-view" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-view" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("plant-view");
                                }}
                            >View Plant
                            </button>
                        </li>
                        <li className={this.state.editPlant ? "nav-item" : "nav-item d-none"}>
                            <button 
                                className={this.state.active==="plant-edit" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-edit" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("plant-edit");
                                }}
                            >Edit Plant
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="garden-add" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-add" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("garden-add");
                                }}
                            >Submit your Garden
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={this.state.active==="plant-add" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="plant-add" ? "page" : "false"}
                                onClick={() => {
                                    this.setActive("plant-add");
                                }}
                            >Found a new plant?
                            </button>
                        </li>
                    </ul>
                    {this.renderContent()}
                    {this.renderDeletePopup()}
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default WaterGardens;
