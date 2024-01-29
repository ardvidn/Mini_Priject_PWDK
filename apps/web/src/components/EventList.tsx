import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
