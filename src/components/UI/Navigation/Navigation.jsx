import React, { useState } from 'react';

function Navigation(props) {

    const [state, setState] = useState('Comments');

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">News</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav pr-5">
                    <li class="nav-item dropdown mr-5">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {state}
                        </a>
                        <div class="dropdown-menu mr-5" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#" onClick={() => setState('Comments')}>Comments</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" onClick={() => setState('Views')}>Views</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" onClick={() => setState('Latest')}>Latest</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
