import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="row overlay justify-content-center">
                    <div className="col">
                        <h1>Welcome to Water Gardens Gallery</h1>
                        <p className="p-3">Featuring aquascaping aquariums by hobbyists and the aquatic plants that beautifies them.</p>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;