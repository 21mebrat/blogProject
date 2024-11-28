import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Time = ({ timeStamp }) => {
  let postedDate = '';

  if (timeStamp) {
    const date = parseISO(timeStamp);
    const period = formatDistanceToNow(date);
    postedDate = `${period} ago`; // Fix assignment
  }

  return (
    <span className="text-sm text-gray-500 italic">
      {postedDate || 'Date not available'}
    </span>
  );
};

export default Time;
