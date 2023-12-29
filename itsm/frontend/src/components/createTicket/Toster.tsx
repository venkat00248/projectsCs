import { ToastContainer, ToastContainerProps } from 'react-toastify';

interface CustomToastContainerProps extends ToastContainerProps {
  zIndex?: number;
}

export const CustomToastContainer = ({ zIndex = 9999, ...rest }: CustomToastContainerProps) => {
  return (
    <ToastContainer
      {...rest}
      style={{
        zIndex: `${zIndex} !important`,
        // You can add other custom styles here as well
      }}
    />
  );
};