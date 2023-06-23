import React from 'react';
import './style.scss';

interface ModalCustomTypes {
  show: boolean;
  close?: () => void;
  title?: string | number;
  children?: React.ReactNode;
  handleSave?: () => void;
  saveButtonType?: 'submit' | 'button';
  modalWidth?: string;
  hideFooter?: boolean;
  customFooter?: boolean;
  changeButton?: boolean;
  handleConfirm?: () => void;
  customClass?: boolean;
  customOkHeading?: string;
  customCancelHeading?: string;
  noAction?: boolean;
  noScroll?: boolean;
  footerEnd?: boolean;
  isLoading?: boolean;
  customBodyClass?: string;
}

const ModalCustom = ({
  show,
  close,
  title,
  children,
  handleSave,
  saveButtonType = 'submit',
  modalWidth,
  hideFooter,
  customFooter,
  changeButton,
  handleConfirm,
  customClass,
  customOkHeading,
  customCancelHeading,
  noAction = false,
  noScroll = false,
  footerEnd = false,
  isLoading = false,
  customBodyClass = '',
}: ModalCustomTypes) => {
  return (
    <div
      className={`custom-modal-wrapper ${show ? 'active' : ''} ${modalWidth}`}
    >
      <div className="custom-modal-dialogue">
        <div className="custom-modal-header">
          <h5>{title}</h5>
          <button type="button" className="custom-close-btn" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
            >
              <g
                id="Group_9956"
                data-name="Group 9956"
                transform="translate(-1343 -198)"
              >
                <g id="cross" transform="translate(1350 205)">
                  <g id="Group_9402" data-name="Group 9402">
                    <g id="Group_9231" data-name="Group 9231">
                      <line
                        id="Line_203"
                        data-name="Line 203"
                        x2="8"
                        y2="8"
                        fill="none"
                        stroke="#24282c"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <line
                        id="Line_204"
                        data-name="Line 204"
                        x1="8"
                        y2="8"
                        fill="none"
                        stroke="#24282c"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    </g>
                  </g>
                </g>
                <rect
                  id="Rectangle_7694"
                  data-name="Rectangle 7694"
                  width="23"
                  height="23"
                  transform="translate(1343 198)"
                  fill="#fff"
                  opacity="0"
                />
              </g>
            </svg>
          </button>
        </div>
        <div
          className={`${
            customClass
              ? `custom-modal-body-center`
              : `${
                  noScroll ? 'custom-modal-body-no-scroll' : 'custom-modal-body'
                }`
          } ${customBodyClass}`}
        >
          {children}
        </div>
        <>
          {noAction ? null : (
            <>
              {!hideFooter ? (
                <div className="custom-modal-footer">
                  <button
                    className="custom-btn-secondary"
                    type="button"
                    onClick={close}
                  >
                    {customCancelHeading ? customCancelHeading : 'Cancel'}
                  </button>
                  <button
                    className="custom-btn-primary"
                    type={saveButtonType}
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loader"></div>
                    ) : customOkHeading ? (
                      customOkHeading
                    ) : (
                      'Add'
                    )}
                  </button>
                </div>
              ) : null}
              {customFooter ? (
                <div
                  className={`${
                    customClass
                      ? 'custom-modal-footer-center'
                      : 'custom-modal-footer'
                  }`}
                >
                  <button
                    className="custom-btn-secondary"
                    type="button"
                    onClick={close}
                  >
                    No
                  </button>
                  <button
                    className="custom-btn-primary"
                    type={saveButtonType}
                    disabled={isLoading}
                    onClick={handleConfirm ? handleConfirm : handleSave}
                  >
                    {isLoading ? <div className="loader"></div> : 'Yes'}
                  </button>
                </div>
              ) : null}
              {changeButton ? (
                <div
                  className={`${
                    customClass
                      ? 'custom-modal-footer-center'
                      : 'custom-modal-footer'
                  }`}
                >
                  <button
                    className="custom-btn-primary"
                    type={saveButtonType}
                    onClick={handleSave}
                  >
                    OK
                  </button>
                </div>
              ) : null}
            </>
          )}
        </>
      </div>
    </div>
  );
};
export default ModalCustom;
