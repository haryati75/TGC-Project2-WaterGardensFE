import React from 'react';
import logo from '../assets/water-gardens-logo-v2-small.jpg';

function Footer(props) {
    return (
        <React.Fragment>
            <footer className="container-fluid mt-5">
                <div className="row">
                    <button className="btn btn-info" onClick={props.refreshAllData}
                        >Click here to refresh listings (Last Refreshed: {props.refreshedOn})
                    </button>
                </div>
                <div className="row">
                    <div className="col-3 p-3">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className="col-9 p-3">
                        <p><em>References for Plants: </em>https://www.allpondsolutions.co.uk/</p>
                        <p><em>References for Gardens: </em>https://tropica.com/en/inspiration/</p>
                        <h4>This website is developed by: Haryati Hassan</h4>
                        <p>This is a school project under Trent Global College. Use of the website is for educational purpose only.</p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;