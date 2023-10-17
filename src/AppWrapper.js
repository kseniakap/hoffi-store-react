import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from "./Context";

import { fadeIn } from "react-animations";
import Radium from "radium";

const App = React.lazy(() => import("./components/app/App"));

const styles = {
  fadeIn: {
    animation: "x 2s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const DelayedFallback = () => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowFallback(false);
    }, 4000);

    return () => clearTimeout(delayTimeout);
  }, []);

  return showFallback
    ? <div style={styles.fadeIn} className="fallback">Loading....</div>
    : null;
};

const AppWrapper = () => (
  <Suspense fallback={<DelayedFallback />}>
    <Context>
      <App />
    </Context>
    <ScrollToTop />
  </Suspense>
);

export default AppWrapper;
