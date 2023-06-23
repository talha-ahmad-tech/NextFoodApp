import { Button } from '@fridayfood/ui-toolkit';

const Card = (props: any) => {
  const {
    headerButtonShow = false,
    onClickHeaderButton = () => {},
    headerButtonLabel,
    noDisplay = false,
    noCardWrapper = false,
  } = props || {};
  return (
    <div
      className={`${
        noCardWrapper
          ? ' noshadow'
          : 'friday-card card-shadow-1 border-radius-10 mb-4'
      }`}
    >
      <div className={`${noDisplay ? 'noDisplay' : 'friday-card-header'}`}>
        <h2 className="friday-card-title">{props.Headertitle}</h2>
        {headerButtonShow ? (
          <button
            className="custom-btn-primary"
            type="button"
            onClick={onClickHeaderButton}
          >
            {headerButtonLabel}
          </button>
        ) : (
          ''
        )}
        {/* <div className="friday-icons-container">
          <button type="button" className="icon-wrap circle-icon-transparent">
            <span className="material-icons-outlined">delete</span>
          </button>
          <button type="button" className="icon-wrap circle-icon-transparent">
            <span className="material-icons-outlined">edit</span>
          </button>
        </div> */}
      </div>
      <div
        className={`friday-card-body ${props?.autoHeight ? 'auto-height' : ''}${
          props?.maxHeight ? 'max-height' : ''
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Card;
