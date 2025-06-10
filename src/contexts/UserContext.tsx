'use client';
import {UserContextValueType} from '@/types/global-types';
import React, {createContext, useContext} from 'react';

interface UserContextType {
  children: React.ReactNode;
  value: UserContextValueType;
}

const UserContext = createContext<UserContextValueType>({
  user: null,
  valid: false
});

export const UserProvider: React.FC<UserContextType> = ({children, value}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useSessions = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useSessions must be used within a UserProvider');
  }
  return context;
};
