import React from 'react';
import OutlinedBtn from '../Button/OutlinedBtn';

const CardWithLabel = ({
  classes,
  id,
  label,
  action,
  children,
  onClick,
  btnTitle = 'Edit',
  btnType = 'outline',
  cancelBtnTitle,
  onCancelBtnClick,
}: CardWithLabelProps | any) => {
  return (
    <div className={'tab-pane fade show ' + classes} id={id}>
      <div className="friday-card card-shadow-1 border-radius-10 mb-4">
        {(label || action) && (
          <div className="friday-card-header">
            <h2 className="friday-card-title">{label}</h2>
            <div className="friday-icons-container">
              {cancelBtnTitle && (
                <button
                  className="friday-btn-primary friday-btn-md font-medium me-2"
                  onClick={onCancelBtnClick}
                  type="button"
                >
                  {cancelBtnTitle}
                </button>
              )}
              {action &&
                (btnType === 'primary' ? (
                  <button
                    className="friday-btn-primary friday-btn-md font-medium small-btn"
                    onClick={onClick}
                    type="button"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5.586"
                        height="5.387"
                        viewBox="0 0 5.586 5.387"
                      >
                        <path
                          id="Path_2060"
                          data-name="Path 2060"
                          d="M.618-2.621H2.884v2.17H3.932v-2.17H6.2V-3.668H3.932v-2.17H2.884v2.17H.618Z"
                          transform="translate(-0.618 5.838)"
                          fill="#0b77e3"
                        />
                      </svg>
                    </span>
                    {btnTitle}
                  </button>
                ) : (
                  <OutlinedBtn title={btnTitle} onClick={onClick} />
                ))}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export type CardWithLabelProps = {
  classes?: string;
  id?: string;
  label?: string;
  action?: any;
  onClick?: any;
  btnTitle?: string;
  btnType?: 'primary' | 'outline';
  cancelBtnTitle?: string;
  onCancelBtnClick?: any;
};

export default React.memo(CardWithLabel);
