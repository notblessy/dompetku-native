import * as React from 'react';

import { SWRConfig } from 'swr';
import { ToastProvider } from 'react-native-toast-notifications'
import { fetcher } from './libs/utils/api';
import { AuthProvider } from './libs/contexts/auth';

import NavBar from './components/navbar';

export default function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher,
      }}
    >
     <ToastProvider
      placement="top"
      animationType='slide-in'
      duration={1500}
      animationDuration={150}
      offsetTop={50}
      swipeEnabled={true}
     >
        <AuthProvider>
          <NavBar />
        </AuthProvider>
     </ToastProvider>
    </SWRConfig>
  );
}
