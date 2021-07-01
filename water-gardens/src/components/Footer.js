import React from 'react';
import logoSmall from '../assets/water-gardens-logo-v2-small.jpg';
import logo from '../assets/water-gardens-logo-v2.jpg';

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
                    <div className="card col-8 d-block d-md-none mx-auto">
                        <img src={logoSmall} style={{maxWidth:"80%"}} alt="Logo Small"/>
                    </div>
                    <div className="card d-none d-md-block col-md-4 p-3 my-auto">
                        <img src={logo} style={{maxWidth:"80%"}} alt="Logo"/>
                    </div>
                    <div className="card col-12 col-md-8 p-3">
                        <h6>References for Plants & Gardens: </h6>
                        <p>
                            https://www.allpondsolutions.co.uk/ | https://tropica.com/en/inspiration/
                        </p>
                        <hr></hr>
                        <h6>Website developed by: Haryati Hassan</h6>
                        <p>A school project under Trent Global College. Use of the website is for educational purpose only.</p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;