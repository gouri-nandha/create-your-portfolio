import React, { createContext, useContext } from 'react';
import { ViewportMode } from '../components/builder/DeviceViewportSelector';

interface ViewportContextType {
  mode: ViewportMode;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const ViewportContext = createContext<ViewportContextType>({
  mode: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

export const ViewportProvider: React.FC<{ mode?: ViewportMode; children: React.ReactNode }> = ({
  mode = 'desktop',
  children,
}) => {
  const isMobile = mode === 'mobile';
  const isTablet = mode === 'tablet';
  const isDesktop = mode === 'desktop';

  return (
    <ViewportContext.Provider value={{ mode, isMobile, isTablet, isDesktop }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => useContext(ViewportContext);
