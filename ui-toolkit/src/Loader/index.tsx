import { forwardRef } from 'react';

const Loader = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className="custom-uploader-wrapper" style={{ zIndex: 9999 }} ref={ref}>
      <div className="multi-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
});

export default Loader;
