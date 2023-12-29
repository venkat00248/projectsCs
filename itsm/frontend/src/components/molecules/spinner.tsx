import {RotatingLines} from  'react-loader-spinner'
 
export const Spinner = () => {

    return(
        <span>
            <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="25"
            visible={true}
            />
        </span>
    )
}