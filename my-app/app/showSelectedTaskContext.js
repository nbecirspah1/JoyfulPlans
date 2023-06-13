import React from 'react';

const ShowSelectedTaskContext = React.createContext({
  showSelectedTask: false,
  setShowSelectedTask: () => {},
});

export default ShowSelectedTaskContext;
