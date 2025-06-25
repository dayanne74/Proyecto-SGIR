import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://yourapiurl.com/hotels', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Hotel added successfully:', response.data);
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Hotel Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HotelForm;
