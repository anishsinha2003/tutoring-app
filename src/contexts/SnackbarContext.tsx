"use client"
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showMessage = (msg: string, level: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  sx={{ zIndex: 9999 }}>
        <Alert
            onClose={handleClose}
            severity={severity}
            sx={{
                width: '100%',
                '& .MuiAlert-icon': {
                    color: "#f2f2f2"
                },
                '& .MuiAlert-action': {
                    color: "#f2f2f2"
                },
                bgcolor:
                severity === 'success'
                    ? '#2fa81f'
                    : severity === 'error'
                    ? '#CF4747'
                    : severity === 'warning'
                    ? 'yellow'
                    : 'blue',
                color:
                severity === 'success'
                    ? 'white'
                    : severity === 'error'
                    ? 'white'
                    : severity === 'warning'
                    ? 'black'
                    : 'black',
                border: '1px solid',
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderColor:
                severity === 'success'
                     ? '#2fa81f'
                    : severity === 'error'
                    ? '#CF4747'
                    : severity === 'warning'
                    ? 'black'
                    : 'black',
            }}
            >
                <span style={{ fontFamily: "Montserrat",  fontSize: "16px", letterSpacing: "0.5px", "opacity": 0.7}}>{message}</span>
            </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
