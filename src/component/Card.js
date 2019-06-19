import React from 'react';

const Card = ({
    url,
}) => {
    return (
        <div className="card">
            <a target="_blank" href={url}>{url}</a>
        </div>
    );
};

export default Card;