import React from 'react';
import Menu from './components/menu';

const Main = (props) => {
    return (
        <div>
            <Menu />
            {props.children}
        </div>
    );
}
export default Main;