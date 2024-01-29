import React from 'react';
import { useRouter } from 'next/router';

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div>
      <h1>Event Detail</h1>
      <p>Event ID: {eventId}</p>
    </div>
  );
};

export default EventPage;
