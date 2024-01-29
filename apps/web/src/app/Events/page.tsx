import React, { useState } from 'react';
import EventList from '../../components/EventList';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';

const EventsPage = () => {
  const [events, setEvents] = useState([]); // Fetch events dari API
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10; // bisa kau atur atau rubah

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilteredEvents(/* filter events sesuai value */);
  };

  const handlePageChange = (type) => {
    if (type === 'prev') {
      setCurrentPage((currentPage) => currentPage - 1);
    } else {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <Filter
        categories={['Category 1', 'Category 2']}
        locations={['Location 1', 'Location 2']}
        handleFilterChange={handleFilterChange}
      />
      <EventList events={currentEvents} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsPage;
