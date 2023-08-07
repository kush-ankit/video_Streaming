import React from 'react';
import './movie-view.css';

function View(props) {
  return (
    <div>
        <div className='size'>
            <img src={props.name} alt="img" className='size' />
        </div>
    </div>
  )
}

export default View