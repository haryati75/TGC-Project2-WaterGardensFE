import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <header>
                <div className="container d-flex flex-column">
                    <div className="d-none d-md-block mx-auto mt-3 align-self-start">
                        <h1>Welcome to Water Gardens Gallery</h1>
                    </div>
                    <div className="d-block d-md-none mx-auto mt-3 align-self-start">
                        <h1>Water Gardens Gallery</h1>
                    </div>
                    <div className="d-none d-md-block mx-auto">
                        <h6>Featuring aquascaping aquariums by hobbyists and the aquatic plants that beautifies them.</h6>
                    </div>
                    <div className="d-block d-md-none mx-auto">
                        <h6>Featuring aquascaping aquariums and plants.</h6>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;