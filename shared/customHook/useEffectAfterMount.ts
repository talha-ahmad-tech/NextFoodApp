import { useEffect, useRef } from 'react';

const useEffectAfterMount = (callback: any, dependency: Array<any>) => {
  let isFirstCall = useRef(true);
  useEffect(() => {
    if (!isFirstCall.current) {
      callback();
    }
    isFirstCall.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency]);
};

export default useEffectAfterMount;
