import React, { useState } from 'react';
import './Collapse.css';
import arrow from '../../assets/down-arrow.svg';

const Collapse = props => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <p>
                <div 
                    className="collapse-container" 
                    data-toggle="collapse" 
                    data-target="#collapseExample" 
                    aria-expanded="false" 
                    aria-controls="collapseExample"
                    onClick={() => setOpen(!open)}
                >
                    <img src={arrow} alt='arrow' className='collapse-container__arrow'
                         style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}}
                    />
                </div>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high 
                    life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, 
                    craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
            </div>
      </>
    )
}

export default Collapse;
