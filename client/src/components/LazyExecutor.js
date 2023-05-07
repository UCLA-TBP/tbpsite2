import { LinearProgress } from '@mui/material';
import React, { useEffect, useRef } from 'react';

// When in viewport, lazy loader will execute the given function
const LazyExecutor = ({ func, enabled, show }) => {
  const intervalId = useRef(null);
  const executorRef = useRef(null);

  useEffect(() => {
    const execFunc = () => {
      if (!executorRef.current) return;
      const boundingRect = executorRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (boundingRect.top >= 0 && boundingRect.bottom <= windowHeight) {
        func();
      }
    };

    if (enabled) {
      if (intervalId.current) return;
      intervalId.current = setInterval(execFunc, 100);
    } else {
      clearInterval(intervalId.current);
      intervalId.current = false;
    }
  }, [func, enabled]);

  if (!show) return <> </>;
  return (
    <div
      ref={executorRef}
      style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}
    >
      <LinearProgress
        color='secondary'
        sx={{
          width: { xs: '90%', sm: '60%' },
          height: '0.5rem',
          borderRadius: '1rem',
        }}
      />
    </div>
  );
};

export default LazyExecutor;
