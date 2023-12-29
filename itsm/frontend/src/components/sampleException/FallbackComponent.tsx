import React from 'react';
import { Card } from 'react-bootstrap';
import "./fallbackComponent.scss";

type FallbackProps = {
  error: any;
};

export function FallbackComponent({ error }: FallbackProps) {
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };
  return (
    <Card className='fallbackContainer'>
      <div className='fallbackIcon'>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <div>
        <div className='overlay'></div> {/* Colored overlay */}
        <h3 style={{textAlign: "center"}}>
          Failed to run below service
        </h3>
        <p style={{fontSize: "20px"}}>
          {error} or refresh
        </p>
        <div className='fallbackbutton'>
          <button 
            onClick={handleRefresh} 
            className='btn btn-primary'
            >
              Refresh
          </button>
        </div>
      </div>
    </Card>
  );
}
