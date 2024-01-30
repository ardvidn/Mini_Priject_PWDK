import React, { useState, useEffect } from 'react';

function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    available_seat: '',
    image: '',
    price: '',
    category_event: 'sport', // Default category
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend or mock data
    const mockCategories = ['sport', 'music', 'nobar']; // Dummy data
    setCategories(mockCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit form data (e.g., send to backend)
    console.log('Form Data:', formData);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full h-24"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="event_date" className="block font-bold mb-1">
            Event Date
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-bold mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="available_seat" className="block font-bold mb-1">
            Available Seat
          </label>
          <input
            type="number"
            id="available_seat"
            name="available_seat"
            value={formData.available_seat}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-bold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category_event" className="block font-bold mb-1">
            Category Event
          </label>
          <select
            id="category_event"
            name="category_event"
            value={formData.category_event}
            onChange={handleChange}
            className="border border-gray-400 rounded px-4 py-2 w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
