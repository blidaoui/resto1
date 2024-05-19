import React from 'react';

const Restaurant = () => {
    return (
        <div className="container-xxl position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <a href="/" className="navbar-brand p-0">
                    <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
                    {/* <img src="img/logo.png" alt="Logo" /> */}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <a href="#" className="nav-item nav-link">Menu</a>
                        <a href="#" className="nav-item nav-link">Contact</a>
                    </div>
                    <a href="/" className="btn btn-primary py-2 px-4">Book A Table</a>
                </div>
            </nav>

            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container my-5 py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Pizza</h1>
                            <p className="text-white animated slideInLeft mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
        
                        </div>
                        <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                            <img className="img-fluid" src="images/public/images/slider-img1.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restaurant;
