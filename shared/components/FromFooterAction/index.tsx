import React from 'react';
import './styles.scss';

type FormFooterActionsTypes = {
  activeStep?: number;
  handleBack?: () => void;
  isSubmitting?: boolean;
  handleSave?: () => void;
  handleSubButton?: () => void;
  subButton?: boolean;
  subButtonTitle?: string;
  isLastStep?: boolean;
  hideBackBtn?: boolean;
  heading?: string;
  customTitle?: string;
  noPadding?: string;
};

const FormFooterActions = ({
  activeStep,
  handleBack,
  isSubmitting,
  isLastStep,
  hideBackBtn = false,
  handleSave,
  handleSubButton = () => {},
  subButton = false,
  subButtonTitle = '',
  heading = '',
  customTitle = '',
  noPadding,
}: FormFooterActionsTypes) => {
  const description = heading ? heading : 'Submit';
  return (
    <div className={` ${noPadding ? 'p-0' : 'custom-bottom-padding '}`}>
      <div className="form-footer-actions">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 custom-footer-links">
              {activeStep !== 0 && hideBackBtn === false && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="custom-btn-secondary"
                >
                  Back
                </button>
              )}

              {subButton ? (
                <button
                  disabled={isSubmitting}
                  type="button"
                  className="custom-btn-secondary"
                  onClick={handleSubButton}
                >
                  {subButtonTitle}
                </button>
              ) : null}
              <button
                disabled={isSubmitting}
                type="submit"
                className="custom-btn-primary"
                onClick={handleSave}
              >
                {isLastStep ? description : customTitle ? customTitle : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFooterActions;
