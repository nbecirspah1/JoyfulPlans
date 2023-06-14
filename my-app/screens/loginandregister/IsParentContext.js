import React, { createContext, useState } from 'react';

// Create the context
const IsParentContext = createContext();

// Create a provider component
const IsParentProvider = ({ children }) => {
  const [isParent, setIsParent] = useState(true);

  return (
    <IsParentContext.Provider value={{ isParent, setIsParent }}>
      {children}
    </IsParentContext.Provider>
  );
};

export { IsParentContext, IsParentProvider };
