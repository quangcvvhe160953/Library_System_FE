import React, { createContext, useState } from 'react';
export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  return (
    <PasswordContext.Provider value={{ newPassword, setNewPassword, otp, setOtp, email, setEmail }}>
      {children}
    </PasswordContext.Provider>
  );
};