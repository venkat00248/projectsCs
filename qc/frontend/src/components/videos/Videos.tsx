import react from 'react'
import './Videos.scss'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DataTableWrapper from '../dataTable/DataTableWrapper';
import Videopopup from './Videopopup'
import Editvideopopup from './Editvideopopup'
export const Videos = () => {


    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Videos</h5>
                        <Videopopup/>
                    </div>
                </div>
                <div className='card-body my-4'>
                    <section className="row videocards">
                        <div className='col-md-3'>
                             <article className="video video--1" >
                                <div className="video__info-hover">
                                  <Tooltip title="Delete Video" placement="top" arrow> 
                                    <button className='btn deleteicon'><i className="mdi mdi-delete-sweep-outline text-danger"></i></button>
                                 </Tooltip>
                                    <div className="video__clock-info">
                                    <i className="mdi mdi-eye-check"></i>
                                         <span className="video__time">20</span>
                                    </div>

                                </div>
                                <div className="video__img"></div>
                                <div className="video_link">
                                    <div className="video__img--hover"  data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundImage: 'url("assets/img/play-video.jpg")',}}></div>
                                </div>
                                <div className="video__info">
                                    <Editvideopopup/> 
                                    <div className="video__by">Name</div>
                                    <h6 className="video__author text-truncate">Information Security Training</h6>
                                    <div className="video__by">Description</div>
                                    <h6 className="video__title text-truncate">Information Security Training</h6>
                                    <div className='float-start w-50'>
                                        <div className="video__by">Created Date</div>
                                        <span className="video__category" title="author">27 May 2021</span>
                                    </div>
                                    <div className='float-end w-50 text-end'>
                                        <div className="video__by">Status</div>
                                        <span className="video__category" title="author">Active</span>
                                    </div>
                                </div>
                             </article>

                        </div>
                        <div className='col-md-3'>
                             <article className="video video--1">
                                <div className="video__info-hover">
                                <button className='btn deleteicon'><i className="mdi mdi-delete-sweep-outline text-danger"></i></button>
                                    <div className="video__clock-info">
                                    <i className="mdi mdi-eye-check"></i>
                                         <span className="video__time">20</span>
                                    </div>

                                </div>
                                <div className="video__img"></div>
                                <div className="video_link">
                                    <div className="video__img--hover" style={{backgroundImage: 'url("assets/img/play-video.jpg")',}}></div>
                                </div>
                                <div className="video__info">
                                    <Editvideopopup/> 
                                    <div className="video__by">Name</div>
                                    <h6 className="video__author text-truncate">Business Ethics Anti Corruption Policy Training</h6>
                                    <div className="video__by">Description</div>
                                    <h6 className="video__title text-truncate">Business Ethics Anti Corruption Policy Training</h6>
                                    <div className='float-start w-50'>
                                        <div className="video__by">Created Date</div>
                                        <span className="video__category" title="author">27 May 2021</span>
                                    </div>
                                    <div className='float-end w-50 text-end'>
                                        <div className="video__by">Status</div>
                                        <span className="video__category" title="author">InActive</span>
                                    </div>
                                </div>
                             </article>

                        </div>
                        <div className='col-md-3'>
                             <article className="video video--1">
                                <div className="video__info-hover">
                                <button className='btn deleteicon'><i className="mdi mdi-delete-sweep-outline text-danger"></i></button>
                                    <div className="video__clock-info">
                                    <i className="mdi mdi-eye-check"></i>
                                         <span className="video__time">20</span>
                                    </div>

                                </div>
                                <div className="video__img"></div>
                                <div className="video_link">
                                    <div className="video__img--hover" style={{backgroundImage: 'url("assets/img/play-video.jpg")',}}></div>
                                </div>
                                <div className="video__info">
                                    <Editvideopopup/> 
                                    <div className="video__by">Name</div>
                                    <h6 className="video__author text-truncate">Information Security Training</h6>
                                    <div className="video__by">Description</div>
                                    <h6 className="video__title text-truncate">Information Security Training</h6>
                                    <div className='float-start w-50'>
                                        <div className="video__by">Created Date</div>
                                        <span className="video__category" title="author">27 May 2021</span>
                                    </div>
                                    <div className='float-end w-50 text-end'>
                                        <div className="video__by">Status</div>
                                        <span className="video__category" title="author">Active</span>
                                    </div>
                                </div>
                             </article>

                        </div>
                        <div className='col-md-3'>
                             <article className="video video--1">
                                <div className="video__info-hover">
                                <button className='btn deleteicon'><i className="mdi mdi-delete-sweep-outline text-danger"></i></button>
                                    <div className="video__clock-info">
                                    <i className="mdi mdi-eye-check"></i>
                                         <span className="video__time">20</span>
                                    </div>

                                </div>
                                <div className="video__img"></div>
                                <div className="video_link">
                                    <div className="video__img--hover" style={{backgroundImage: 'url("assets/img/play-video.jpg")',}}></div>
                                </div>
                                <div className="video__info">
                                    <Editvideopopup/> 
                                    <div className="video__by">Name</div>
                                    <h6 className="video__author text-truncate">Business Ethics Anti Corruption Policy Training</h6>
                                    <div className="video__by">Description</div>
                                    <h6 className="video__title text-truncate">Business Ethics Anti Corruption Policy Training</h6>
                                    <div className='float-start w-50'>
                                        <div className="video__by">Created Date</div>
                                        <span className="video__category" title="author">27 May 2021</span>
                                    </div>
                                    <div className='float-end w-50 text-end'>
                                        <div className="video__by">Status</div>
                                        <span className="video__category" title="author">InActive</span>
                                    </div>
                                </div>
                             </article>

                        </div>
                       
                    </section>

                </div>
            </div>

         
<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



        </div>

    )

}