import React, { useState } from 'react';

function Navigation(props) {
    const [state, setState] = useState('Comments');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">News</a>
        
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav pr-5">
                    <li className="nav-item dropdown mr-5">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {state}
                        </a>
                        <div className="dropdown-menu mr-5" aria-labelledby="navbarDropdown">
                        { ['Comments', 'Views', 'Latest'].map((item, i, array) => {
                          return <div key={item}>
                                    <a className="dropdown-item" href="#" onClick={() => setState(item)}>{item}</a>
                                    {i === (array.length - 1) ? null : <div className="dropdown-divider"></div>}
                            </div>
                           } 
                        )}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
