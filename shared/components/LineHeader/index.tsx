import { memo, useState } from 'react';
import { Icon } from '../Icon';

type Item = {
  label: string;
  value: string | number;
  onClick?: any;
  btnLabel?: string;
  btnDisable?: boolean;
};

type ILineHeader = {
  items: Item[];
};

const LineHeader = ({ items = [] }: ILineHeader) => {
  const [isActive, setIsActive] = useState(false);

  const buttonclick = () => {
    setIsActive(current => !current);
  };

  return (
    <div
      className={
        isActive ? 'hidden-text quantity-wrapper-main' : 'quantity-wrapper-main'
      }
    >
      <div className="quantity-wrapper-main-inner">
        {items?.map(({ label, value, onClick, btnLabel, btnDisable }: Item) => (
          <h6>
            <span className="main-head">{label}:</span>
            <span className="text-bold">{value}</span>
            {btnLabel ? (
              <button
                onClick={onClick}
                disabled={btnDisable}
                className="summary-btn"
              >
                <Icon variant="file" />
                {btnLabel}
              </button>
            ) : null}
          </h6>
        ))}
      </div>
      <button className="wrapper-toggle-btn" onClick={buttonclick}>
        <Icon variant="arrowdown" className="arrow-down" />
      </button>
    </div>
  );
};

export default memo(LineHeader);
