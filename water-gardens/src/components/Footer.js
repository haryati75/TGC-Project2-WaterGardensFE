import React from 'react';
import logo from './water-gardens-logo-small.png';

function Footer() {
    return (
        <React.Fragment>
            <footer className="container-fluid mt-5">
                <div className="row">
                    <div className="col-3 p-3">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className="col-9 p-3">
                        <h4>This website is developed by: Haryati Hassan</h4>
                        <p>This is a school project under Trent Global College. Use of the website is for educational purpose only.</p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;