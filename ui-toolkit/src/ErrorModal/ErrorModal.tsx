import React from "react"

import "./ErrorModal.scss";
import { ErrorItemProps } from "./components/ErrorItem";
import ErrorItem from "./components/ErrorItem";
const ErrorModal = (props: ErrorModalProps) => {
  return (
    <div className="modal fade" id="errors-modal">
      <div className="modal-dialog">
        <div className="modal-content friday-modal">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="circle-icon-secondary"
              data-bs-dismiss="modal"
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
          <div className="modal-body friday-modal-body">
            <div className="error-content">
              <ul className="error-content__group">
                {props.errors.map((item: ErrorItemProps) => {
                  return (
                    <ErrorItem
                      key={item.label}
                      label={item.label}
                      message={item.message}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ErrorModal);

export type ErrorModalProps = {
  title: string;
  errors: ErrorItemProps[];
};
