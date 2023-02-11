import * as React from 'react';

import { SWRConfig } from 'swr';
import { ToastProvider } from 'react-native-toast-notifications'
import { fetcher } from './src/libs/utils/api';
import { AuthProvider } from './src/libs/contexts/auth';

import NavBar from './src/components/navbar';

export default function App() {
  return (
    <ToastProvider
      placement="top"
      animationType='slide-in'
      duration={1500}
      animationDuration={150}
      offsetTop={50}
      swipeEnabled={true}
    >
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
        }}
      >
      
          <AuthProvider>
            <NavBar />
          </AuthProvider>
      
      </SWRConfig>
    </ToastProvider>
  );
}
