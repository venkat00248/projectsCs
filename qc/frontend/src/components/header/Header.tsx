import React from 'react'
import './Header.scss'
import UserProfile from '../userProfile/UserProfile'
export const Header = () => {
  return (
<header id="page-topbar">

<div className="topnav">
    <div className="container-fluid">

        <nav className="navbar navbar-light navbar-expand-lg topnav-menu">


            <button type="button"
                className="btn btn-sm me-2 font-size-24 d-lg-none header-item waves-effect waves-light"
                data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i className="mdi mdi-menu"></i>
            </button>
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box">
                <a href="dashboard.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="assets/img/logo-icon.png" alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src="assets/img/cloud4c_0.png" alt=""/>
                    </span>
                </a>
            </div>


            <div className="collapse navbar-collapse" id="topnav-menu-content">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="dashboard.html">
                            <i className="ti-home me-2"></i>Dashboard
                        </a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button">
                            <i className="ti-video-camera me-2"></i>Docs & Videos
                        </a>
                        <div className="dropdown-menu">
                            <a href="documentsdetails.html" className="dropdown-item">Documents List</a>
                            <a href="documents.html" className="dropdown-item">Documents</a>
                            <a href="videos.html" className="dropdown-item">Videos</a>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button">
                            <i className="ti-agenda me-2"></i>Training Details
                        </a>
                        <div className="dropdown-menu">
                            <a href="trainingschedule.html" className="dropdown-item">Training Schedule </a>
                            <a href="trainingresults.html" className="dropdown-item">Training Results</a>

                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button">
                            <i className="ti-user me-2"></i>Employees
                        </a>
                        <div className="dropdown-menu">
                            <a href="newemployees.html" className="dropdown-item">New Employees</a>
                            <a href="#" className="dropdown-item">Employees</a>

                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button">
                            <i className="ti-receipt me-2"></i>Reports
                        </a>
                        <div className="dropdown-menu">
                            <a href="documentreports.html" className="dropdown-item">Documents Report</a>
                            <a href="videoreports.html" className="dropdown-item">Videos Report</a>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button">
                            <i className="ti-settings me-2"></i>Settings
                        </a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">Roles Master</a>
                            <a href="#" className="dropdown-item">Department Master</a>
                        </div>
                    </li>



                </ul>
            </div>

            {/* <!-- App Search--> */}
            <form className="app-search d-lg-block">
                <div className="position-relative">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <a href="#" className="fa fa-search"></a>
                </div>
            </form>




            <div className="dropdown d-inline-block">
                <button type="button" className="btn header-item noti-icon waves-effect"
                    id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="badge bg-danger rounded-pill">42</span>
                </button>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div className="p-3">
                        <div className="row align-items-center">
                            <div className="col">
                                <h5 className="m-0 font-size-16">Notifications (42)
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style={{maxHeight: "230px"}}>
                        <a href="newemployees.html" className="text-reset notification-item">
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-xs">
                                        <span className="avatar-title bg-warning rounded-circle font-size-16">
                                            <i className="mdi mdi-account-outline"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-1"> You have Employee!
                                    </h6>
                                    <div className="font-size-12">
                                        <p className="mb-1">Waiting for Access Previllages</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="p-2 border-top">
                        <div className="d-grid">
                            <a className="btn btn-sm btn-link font-size-14 text-center"
                                href="newemployees.html">Show list of Employees </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dropdown d-inline-block">
                <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="rounded-circle header-profile-user" src="assets/img/avatar-1.jpg"
                        alt="Header Avatar" />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                    {/* <!-- item--> */}
                    <UserProfile/>
                    {/* <a className="dropdown-item text-muted" href="userprofile.html"><i
                            className="mdi mdi-account-circle font-size-17 align-middle me-1"></i> profile </a> */}
                    <a className="dropdown-item text-muted" href="#"><i
                            className="mdi mdi-power-settings font-size-17 align-middle me-1"></i>Logout</a>
                            {/* <UserProfile/> */}
                </div>
            </div>


        </nav>
    </div>
</div>

</header>
  )
}
