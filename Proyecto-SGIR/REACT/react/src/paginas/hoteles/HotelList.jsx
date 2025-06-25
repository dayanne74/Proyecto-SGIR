import React from 'react';
import HotelItem from './HotelItem';

const HotelList = ({ hotels, onEdit, onDelete }) => {
    return (
        <div>
            {hotels.map(hotel => (
                <HotelItem key={hotel._id} hotel={hotel} onEdit={() => onEdit(hotel)} onDelete={() => onDelete(hotel._id)} />
            ))}
        </div>
    );
};

export default HotelList;
