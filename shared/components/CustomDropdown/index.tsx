import { useEffect, useRef, useState } from 'react';
import './style.scss';
interface ICUSTOMDROPDOWN {
  items?: any;
  title?: string;
  className?: string;
  icon?: any;
}
const CustomDropdown = ({ items, title, className, icon }: ICUSTOMDROPDOWN) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref);

  const handleClick = () => {
    ref.current?.classList.replace('d-none', 'd-inline');
  };

  return (
    <div className={`customdropdownwrapper active ms-2`}>
      <div
        className={`customdropdownbutton ${className}`}
        onClick={handleClick}
      >
        <button>
          {title}
          {icon}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8.206"
            height="4.967"
            viewBox="0 0 8.206 4.967"
            className="no-item"
          >
            <path
              id="Path_2086"
              data-name="Path 2086"
              d="M151.05,240.368a.885.885,0,0,1,.25-.613.871.871,0,0,1,1.226,0l2.625,2.617,2.625-2.625A.867.867,0,0,1,159,240.972l-3.238,3.238a.855.855,0,0,1-.613.25.892.892,0,0,1-.613-.25l-3.238-3.23A.9.9,0,0,1,151.05,240.368Z"
              transform="translate(-151.05 -239.493)"
              fill="#aac0de"
            />
          </svg>
        </button>
      </div>
      <div className="customdropdown-body d-none" ref={ref}>
        <div className="dropdown-list-wrapper">
          {items?.map(({ name, icon, onClick }: any) => (
            <button key={name} onClick={onClick}>
              {icon}
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CustomDropdown;

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref.current.className.includes('d-inline')
      ) {
        ref.current?.classList.replace('d-inline', 'd-none');
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
