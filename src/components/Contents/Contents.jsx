import React from 'react';
import './Contents.css'; // Import your custom CSS file for styling

const Content = ({ selectedItem }) => {
    return (
        <div className="content-container">
            {selectedItem}
        </div>
    );
};

export default Content;
