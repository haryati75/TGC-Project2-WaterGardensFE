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
import GardenEditDetails from './GardenEditDetails';

const baseURL = "https://3000-tan-trout-gu31y5ul.ws-us08.gitpod.io";
//const baseURL = "https://3000-tan-trout-gu31y5ul.ws-us09.gitpod.io";

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
        'allowPlantDelete': false,

        'showGarden': false,
        'gardenBeingShown': 0,
        'editGarden': false,
        'gardenIdBeingEdited' : 0,

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
        'deleteName' : "",
        'deletePhotoURL' : "",
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
        'toAddTag' : "",

        // to edit garden
        'editedGardenName': "",
        'editedGardenDesc': "",
        'editedGardenCompletionDate': "",
        'editedGardenWeeksToComplete': 0,
        'editedGardenComplexityLevel': "",
        'editedGardenAquascaperName': "",
        'editedGardenAquascaperEmail': "", 
        'editedGardenPlants': [],
        'editedGardenRatings': [],
        'editedGardenPhotoURL' : "",

        // to add a plant to a garden
        'allPlantsDropdown' : [],
        'toAddGardenPlantId' : 0,
        'toAddGardenPlantName' : "",
        'toAddGardenPlantPhotoURL' : "",
        'toAddGardenPlantCare' : "",

        // to add a rating to a garden
        'toAddGardenRatingLevel' : 0,
        'toAddGardenRatingComment' : "",

        // home highlights: top garden/plants
        'topGardens' : [],
        'topPlants' : [],
        'statsGardens' : [],
        'aquascaperNames' : [],
        'plantSmartTags' : [],
        'aquascaperSelectedGardenListing' : "",
        'smartTagsSelectedPlantListing' : [],
        'complexityLevelSelectedGardenListing' : "",
        'homeSelectedListing' : "latest",
        'showN' : 4,

        // refresh datetimestamp
        'refreshedOn' : null
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
        
        // to show the latest plants for Home tab
        let showN = this.state.showN;
        let topPlantsData = await this.fetchData("/plants/top?n=" + showN);
        let topGardensData = await this.fetchData("/gardens/top?n=" + showN);

        // to load stats of gardens and aquascapers names for Garden Listing tab
        let statsGardensData = await this.fetchData("/gardens/ratings");
        let aquascaperNamesData = await this.fetchData("/aquascapers/names");
        let plantSmartTagsData = await this.fetchData("/plants/smarttags");

        let now = new Date()
        let nowDate = now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear()
        let nowTime = now.toLocaleTimeString()

        this.setState({
            'plants': plantsData,
            'gardens': gardensData,
            'topPlants' : topPlantsData,
            'topGardens' : this.sortTopGardensRatings(topGardensData),
            'statsGardens' : statsGardensData,
            'aquascaperNames' : aquascaperNamesData,
            'plantSmartTags' : plantSmartTagsData,
            'refreshedOn' : nowDate + " " + nowTime
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.active === "home" && this.props.active !== prevProps.active) {
            this.refreshHomeData()
        }
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

    refreshAllData = () => {
        this.componentDidMount();
    }

    refreshHomeData = async () => {
        let showN = "top?n=" + this.state.showN;
        let plantCriteria = showN;
        let gardenCriteria = showN;
        let topPlantsData = [];
        let topGardensData = [];

        // if homeSelectedListing === "latest", no other criteria needed

        if (this.state.homeSelectedListing === "beginners") {
            plantCriteria += "&care=easy";
            gardenCriteria += "&level=beginner";

        } else if (this.state.homeSelectedListing === "popular") {
            plantCriteria += "&likes=10";
            gardenCriteria += "&rating=3";

        } else if (this.state.homeSelectedListing === "professionals") {
            plantCriteria += "&care=medium&care=hard";

        } else if (this.state.homeSelectedListing === "worst") {
            plantCriteria += "&likes=-10";
            gardenCriteria += "&rating=-3";
        }

        topPlantsData = await this.fetchData("/plants/" + plantCriteria);

        if (this.state.homeSelectedListing === "professionals") {
            topGardensData = await this.fetchData("/aquascapers/" + gardenCriteria);
        } else {
            topGardensData = await this.fetchData("/gardens/" + gardenCriteria);
        }

        // Filter and sort the topGardens' ratings to show top 3 ratings only
        this.setState({
            'topPlants' : topPlantsData,
            'topGardens' : this.sortTopGardensRatings(topGardensData),
        })
    }

    sortTopGardensRatings = (gardensArray) => {
        let transformedGardensArray = gardensArray.map( g => {
            // sort in descending order
            g.ratings.sort((a, b) => {
                return b.level - a.level;
            })
            g.ratings.splice(3);
            return g;
        })
        return transformedGardensArray;
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
            console.log("Plant save successfully", modifiedPlant);

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

    // allow increasing plant likes without going Edit Details
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

    // ------------------------
    // Garden Edit Processing
    // ------------------------
    updateToAddGardenPlantFields = (event) => {
        let plantId = event.target.value
        if (plantId !== "") {
            let wantedPlant = this.state.allPlantsDropdown.filter( p => p.id === plantId ? p : null)[0];
         
            this.setState({
                'toAddGardenPlantId' : wantedPlant.id,
                'toAddGardenPlantName' : wantedPlant.name,
                'toAddGardenPlantPhotoURL' : wantedPlant.photoURL,
                'toAddGardenPlantCare' : wantedPlant.care
            })
        } else {
            this.setState({
                'toAddGardenPlantId' : 0,
                'toAddGardenPlantName' : "",
                'toAddGardenPlantPhotoURL' : "",
                'toAddGardenPlantCare' : ""
            })
        }
    }

    addGardenRating = async (gardenId) => {
        // call API to insert directly to update in db
        try {
            let response = await axios.patch(baseURL + "/garden/" + gardenId + "/rating/add", {
                'newRatingLevel' : parseInt(this.state.toAddGardenRatingLevel),
                'newRatingComment' : this.state.toAddGardenRatingComment
            })

            // update the garden in the gardens array
            let clonedGarden = response.data;
            
            let indexToChange = this.state.gardens.findIndex( g => g._id === gardenId );
            let clonedGardensArray = [
                ...this.state.gardens.slice(0, indexToChange),
                clonedGarden,
                ...this.state.gardens.slice(indexToChange + 1)
            ];

            this.setState({
                gardenBeingShown : clonedGarden,
                gardens : clonedGardensArray,
                'toAddGardenRatingLevel' : 0,
                'toAddGardenRatingComment' : ""
            })

        } catch (e) {
            alert("Add Garden Rating failed. See console.")
            console.log(e)
        }     

    }

    deleteGardenRating = async (gardenId, ratingId) => {

        // call API to insert directly to update in db
        try {
            let response = await axios.patch(baseURL + "/garden/" + gardenId + "/rating/" + ratingId + "/delete");

            // update the garden in the gardens array
            let clonedGarden = response.data;
            
            let indexToChange = this.state.gardens.findIndex( g => g._id === gardenId );
            let clonedGardensArray = [
                ...this.state.gardens.slice(0, indexToChange),
                clonedGarden,
                ...this.state.gardens.slice(indexToChange + 1)
            ];

            this.setState({
                gardenBeingShown : clonedGarden,
                gardens : clonedGardensArray
            })

        } catch (e) {
            alert("Delete Garden Rating failed. See console.")
            console.log(e)
        }   
    }

    editGardenRating = (gardenId, ratingId) => {

    }

    // adding sub-document with referential integrity (i.e. plant must exist before adding to garden)
    addGardenPlant = () => {
        let newGardenPlant = this.state.allPlantsDropdown.filter( p => p.id === this.state.toAddGardenPlantId ? p : null)[0];

        let clonedArray = [...this.state.editedGardenPlants, newGardenPlant]
        this.setState({
            'editedGardenPlants' : clonedArray,
            'toAddGardenPlantId' : 0,
            'toAddGardenPlantName' : "",
            'toAddGardenPlantPhotoURL' : "",
            'toAddGardenPlantCare' : ""
        })
    }

    deleteGardenPlant = (plantId) => {
        let indexToDelete = this.state.editedGardenPlants.findIndex( p => p.id === plantId);

        let clonedArray = [
            ...this.state.editedGardenPlants.slice(0, indexToDelete),
            ...this.state.editedGardenPlants.slice(indexToDelete + 1)
        ]
        this.setState({
            'editedGardenPlants' : clonedArray
        })
    }

    saveEditedGarden = async (gardenId) => {
        // save to database
        try {
            await axios.put(baseURL + "/garden/" + gardenId + "/edit", {
                name : this.state.editedGardenName,
                desc : this.state.editedGardenDesc,
                completionDate : this.state.editedGardenCompletionDate,
                weeksToComplete : this.state.editedGardenWeeksToComplete,
                complexityLevel : this.state.editedGardenComplexityLevel,
                aquascaper : {
                    name: this.state.editedGardenAquascaperName,
                    email: this.state.editedGardenAquascaperEmail
                },
                plants : this.state.editedGardenPlants,
                ratings : this.state.editedGardenRatings,
                photoURL : this.state.editedGardenPhotoURL
            })

            // modify the array in the state, reset state for edited fields
            let response = await axios.get(baseURL + "/garden/" + gardenId);
            let modifiedGarden = response.data;
            console.log("Garden saved successfully", modifiedGarden);

            let indexToChange = this.state.gardens.findIndex(g => g._id === gardenId);
            let clonedArray = [
                ...this.state.gardens.slice(0, indexToChange),
                modifiedGarden,
                ...this.state.gardens.slice(indexToChange + 1)
            ];
            this.setState({
                gardens : clonedArray,

                'gardenIdBeingEdited' : null,

                'editedGardenName': "",
                'editedGardenDesc': "",
                'editedGardenCompletionDate': "",
                'editedGardenWeeksToComplete': 0,
                'editedGardenComplexityLevel': "",
                'editedGardenAquascaperName': "",
                'editedGardenAquascaperEmail': "", 
                'editedGardenPlants': [],
                'editedGardenRatings': [],
                'editedGardenPhotoURL' : "",

                'allPlantsDropdown': [],
                'toAddGardenPlantId' : 0,
                'toAddGardenPlantName' :"",
                'toAddGardenPlantPhotoURL' : "",
                'toAddGardenPlantCare' : "",
    
                'editGarden': false,
                'gardenBeingShown' : modifiedGarden,
                'active': "garden-view" 
            })

        } catch(e) {
            alert("Save edited plant failed. See console.");
            console.log(e);
        }
    }


    //-----------------------------------------------------
    // Toggle between Listing All Plant or View One Plant
    //-----------------------------------------------------
    // to help check if a Plant exist in another Garden before it can be deleted
    canDelete = (plantId) => {
        let deleteFlag = true;
        for (let g of this.state.gardens) {
            if (g.plants.length > 0) {
                if (g.plants.findIndex(p => p.id === plantId) !== -1) {
                    deleteFlag = false;
                    break
                }
            }
        }
        return deleteFlag;
    }

    viewPlantDetails = async (plantId) => {
        // get the plant being viewed from API
        let response = await axios.get(baseURL + "/plant/" + plantId);

        this.setState({
            'showPlant': true,
            'plantBeingShown': response.data,
            'allowPlantDelete': this.canDelete(plantId),
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

    //-----------------------------------------------------
    // Toggle between Listing View or Edit Plant
    //-----------------------------------------------------
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
    // Toggle between Listing View or Edit Garden
    //-----------------------------------------------------
    showGardenEditDetails = () => {
        let editedGarden = {...this.state.gardenBeingShown}

        // setup list of all plants for editing plants in a garden
        // this.state.allPlantsDropdown
        let transformedPlants = this.state.plants.map(p => {
            return {
                'id' : p._id,
                'name' : p.name,
                'photoURL' : p.photoURL,
                'care' : p.care
            }
        })
    
        this.setState({
            'gardenIdBeingEdited' : editedGarden._id,

            'editedGardenName': editedGarden.name,
            'editedGardenDesc': editedGarden.desc,
            'editedGardenCompletionDate': editedGarden.completionDate,
            'editedGardenWeeksToComplete': editedGarden.weeksToComplete,
            'editedGardenComplexityLevel': editedGarden.complexityLevel,
            'editedGardenAquascaperName': editedGarden.aquascaper.name,
            'editedGardenAquascaperEmail': editedGarden.aquascaper.email, 
            'editedGardenPlants': editedGarden.plants,
            'editedGardenRatings': editedGarden.ratings,
            'editedGardenPhotoURL' : editedGarden.photoURL,

            'allPlantsDropdown' : transformedPlants,
            'toAddGardenPlantId' : 0,
            'toAddGardenPlantName' :"",
            'toAddGardenPlantPhotoURL' : "",
            'toAddGardenPlantCare' : "",

            'editGarden': true,
            'active': "garden-edit"
        })
    }

    hideGardenEditDetails = () => {
        this.setState({
            'gardenIdBeingEdited' : 0,

            'editedGardenName': "",
            'editedGardenDesc': "",
            'editedGardenCompletionDate': "",
            'editedGardenWeeksToComplete': 0,
            'editedGardenComplexityLevel': "",
            'editedGardenAquascaperName': "",
            'editedGardenAquascaperEmail': "", 
            'editedGardenPlants': [],
            'editedGardenRatings': [],
            'editedGardenPhotoURL' : "",

            'allPlantsDropdown' : [],
            'toAddGardenPlantId' : 0,
            'toAddGardenPlantName' :"",
            'toAddGardenPlantPhotoURL' : "",
            'toAddGardenPlantCare' : "",

            'editGarden': false,
            'active': "garden-view" 
        });
    }

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
                        <div className="popup card text-center">
                            <div className="card-header">Delete {this.state.deleteWhat}</div>
                            <img className="rounded mx-auto d-block" style={{width : "30%"}} src={this.state.deletePhotoURL} alt={this.state.deleteName}/>
                            <div className="card-text">
                                Are you sure you want to delete {this.state.deleteName}?
                            </div>
                            <div className="card-footer">
                                <button 
                                    className="btn btn-secondary me-3" 
                                    onClick={() => {this.hideDeletePopup(false)}}
                                >Close</button>
                                <button 
                                    className="btn btn-danger me-3" 
                                    onClick={() => {this.hideDeletePopup(true)}}
                                >Confirm Delete</button>
                            </div>
                            ID: {this.state.deleteId}
                        </div>
                    </div>
                </React.Fragment>
            );
          } else {
            return null;
        }
    }

    // toggle display/hide of the state variables
    displayDeletePopup = (idToDelete, nameToDelete, photoURLToDelete, deleteWhat) => {
        this.setState({
          'showDeletePopup' : true,
          'deleteId' : idToDelete,
          'deleteName' : nameToDelete,
          'deletePhotoURL' : photoURLToDelete,
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
                'deleteName' : "",
                'deletePhotoURL' : "",
                'showDeletePopup' : false
            });
        }
    };

    deletePlant = async (plantId) => {
        // delete from database via API
        try {
            await axios.delete(baseURL + "/plant/" + plantId);

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
                'deleteName' : "",
                'deletePhotoURL' : "",
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
            await axios.delete(baseURL + "/garden/" + gardenId);

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
                'deleteName' : "",
                'deletePhotoURL' : "",
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
                    <Home 
                        homeSelectedListing={this.state.homeSelectedListing}
                        topPlants={this.state.topPlants}
                        topGardens={this.state.topGardens}
                        showN={this.state.showN}
                        refreshHomeData={this.refreshHomeData}
                        updateFormField={this.updateFormField}
                        viewGardenDetails={this.viewGardenDetails}
                        viewPlantDetails={this.viewPlantDetails}
                        increasePlantLikesByOne={this.increasePlantLikesByOne}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-edit') {
            return (
                <React.Fragment>
                    <GardenEditDetails 
                        gardenIdBeingEdited={this.state.gardenIdBeingEdited}

                        editedGardenName={this.state.editedGardenName}
                        editedGardenDesc={this.state.editedGardenDesc}
                        editedGardenCompletionDate={this.state.editedGardenCompletionDate}
                        editedGardenWeeksToComplete={this.state.editedGardenWeeksToComplete}
                        editedGardenComplexityLevel={this.state.editedGardenComplexityLevel}
                        editedGardenAquascaperName={this.state.editedGardenAquascaperName}
                        editedGardenAquascaperEmail={this.state.editedGardenAquascaperEmail}
                        editedGardenPhotoURL={this.state.editedGardenPhotoURL}
                        
                        editedGardenPlants={this.state.editedGardenPlants}
                        allPlantsDropdown={this.state.allPlantsDropdown}
                        toAddGardenPlantId={this.state.toAddGardenPlantId}
                        toAddGardenPlantName={this.state.toAddGardenPlantName}
                        toAddGardenPlantPhotoURL={this.state.toAddGardenPlantPhotoURL}
                        toAddGardenPlantCare={this.state.toAddGardenPlantCare}
                        updateToAddGardenPlantFields={this.updateToAddGardenPlantFields}
                        addGardenPlant={this.addGardenPlant}
                        deleteGardenPlant={this.deleteGardenPlant}

                        updateFormField={this.updateFormField}
                        saveEditedGarden={this.saveEditedGarden}
                        hideGardenEditDetails={this.hideGardenEditDetails}
                    />
                </React.Fragment>
            );
        
        } else if (this.state.active === 'garden-view') {
            return (
                <React.Fragment>
                    <GardenViewDetails 
                        garden={this.state.gardenBeingShown} 
                        statsGardens={this.state.statsGardens}

                        toAddGardenRatingLevel={this.state.toAddGardenRatingLevel}
                        toAddGardenRatingComment={this.state.toAddGardenRatingComment}
                        updateFormField={this.updateFormField}
                        addGardenRating={this.addGardenRating}
                        editGardenRating={this.editGardenRating}
                        deleteGardenRating={this.deleteGardenRating}

                        displayDeletePopup={this.displayDeletePopup}
                        hideGardenDetails={this.hideGardenDetails}
                        showGardenEditDetails={this.showGardenEditDetails}
                    />
                </React.Fragment>
            );
        } else if (this.state.active === 'garden-listing') {
            return (
                <React.Fragment>
                    <GardenListing 
                        gardens={this.state.gardens}
                        statsGardens={this.state.statsGardens}
                        aquascaperNames={this.state.aquascaperNames}
                        aquascaperSelectedGardenListing={this.state.aquascaperSelectedGardenListing}
                        complexityLevelSelectedGardenListing={this.state.complexityLevelSelectedGardenListing}
                        updateFormField={this.updateFormField}
                        viewGardenDetails={this.viewGardenDetails}
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
                        allowPlantDelete={this.state.allowPlantDelete}
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
                        plantSmartTags={this.state.plantSmartTags}
                        smartTagsSelectedPlantListing={this.state.smartTagsSelectedPlantListing}
                        updateFormField={this.updateFormField}
                        viewPlantDetails={this.viewPlantDetails}
                        increasePlantLikesByOne={this.increasePlantLikesByOne}
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
                                    this.refreshHomeData();
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
                        <li className={this.state.showGarden && !this.state.editGarden ? "nav-item" : "nav-item d-none"}>
                            <button 
                                className={this.state.active==="garden-view" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-view" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("garden-view");
                                }}
                            >View Garden
                            </button>
                        </li>
                        <li className={this.state.editGarden ? "nav-item" : "nav-item d-none"}>
                            <button 
                                className={this.state.active==="garden-edit" ? "nav-link active" : "nav-link"}
                                aria-current={this.state.active==="garden-edit" ? "page" : "false"} 
                                onClick={() => {
                                    this.setActive("garden-edit");
                                }}
                            >Edit Garden
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
                <Footer 
                    refreshAllData={this.refreshAllData} 
                    refreshedOn={this.state.refreshedOn}
                />
            </React.Fragment>
        );
    }
}

export default WaterGardens;
