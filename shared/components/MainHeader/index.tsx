import "./styles.scss";

const MainHeader = (props: any) => {
  return (
    <div className="row justify-content-start">
      <div className="col-12 custom-flex-between mb-4 mobile-col-resp">
        <div className="custom-flex-col custom-header-wrapper">
          <h3>
            <span className="font-bold">{props.title}</span> | All Cards
          </h3>
          <span className="custom-p-10 brand-color">{props.pagelisting}</span>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
