import react from 'react'
import './Training.scss'
import TrainingscheduleTable from './TrainingscheduleTable';
import AddtrainingschedulePopup from './AddtrainingschedulePopup'  
 
export const Trainingschedule = () => {

  
      

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='mb-0 pt-1 text-primary'>Training Details List</h5>
                        <AddtrainingschedulePopup/> 
                    </div>
                </div>
               
            </div>

            <div className='row mt-3'>
                    <div className="customtbl table-responsive">
                     <TrainingscheduleTable/>
                    </div>
            </div>

        </div>

    )

}