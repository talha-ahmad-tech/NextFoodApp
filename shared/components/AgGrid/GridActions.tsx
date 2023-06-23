import { OutlinedBtn } from '@fridayfood/ui-toolkit';

export type ActionBtn = {
  title: string;
  disabled?: boolean;
  onClick: () => void;
  customComponent?: any;
  showCustomComponent?: boolean;
  showButton?: boolean;
};
export interface IGridAction {
  actionButtons: ActionBtn[];
  rightActions?: ActionBtn[];
  leftActionButtons?: ActionBtn[];
}

const GridAction = ({
  actionButtons = [],
  rightActions = [],
  leftActionButtons = [],
}: IGridAction) => {
  return (
    <div className="custom-flex-between mb-3 align-items-start d-flex">
      {leftActionButtons && (
        <div className="table-action-btns d-flex justify-content-start align-items-center">
          {leftActionButtons?.map(
            ({
              title,
              onClick,
              disabled,
              customComponent,
              showCustomComponent,
              showButton = true,
            }: ActionBtn) =>
              customComponent ? (
                <>{showCustomComponent ? customComponent : null}</>
              ) : (
                <>
                  {showButton ? (
                    <button
                      type="button"
                      className="custom-grey-outline-btn"
                      title={title}
                      onClick={onClick}
                      disabled={disabled}
                    >
                      {title}
                    </button>
                  ) : null}
                </>
              ),
          )}
        </div>
      )}
      {actionButtons && (
        <div className="table-action-btns custom-flex-start align-items-start">
          {actionButtons?.length > 0 &&
            actionButtons?.map(
              ({ title, onClick, disabled, customComponent }: ActionBtn) =>
                customComponent ? (
                  <>{customComponent}</>
                ) : (
                  <OutlinedBtn
                    title={title}
                    onClick={onClick}
                    disabled={disabled}
                  />
                ),
            )}
        </div>
      )}
      {rightActions && (
        <div className="table-action-btns custom-flex-start align-items-center">
          {rightActions?.length > 0 &&
            rightActions?.map(
              ({
                title,
                onClick,
                disabled,
                customComponent,
                showCustomComponent,
                showButton = true,
              }: ActionBtn) =>
                customComponent ? (
                  <>{showCustomComponent ? customComponent : null}</>
                ) : (
                  <>
                    {showButton ? (
                      <button
                        type="button"
                        className="custom-btn-primary"
                        title={title}
                        onClick={onClick}
                        disabled={disabled}
                      >
                        {title}
                      </button>
                    ) : null}
                  </>
                ),
            )}
        </div>
      )}
    </div>
  );
};

export default GridAction;
