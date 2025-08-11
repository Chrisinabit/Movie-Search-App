//import React from 'react';
import style from './style.module.css'

function Loader() {
    return (
        <div>
            <div className={style.loading}>Loading&#8230;</div>
        </div>
    );
}

export default Loader;