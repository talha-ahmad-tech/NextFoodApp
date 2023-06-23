import './style.scss';

const CardHorizentalImage = (props: any) => {
  //   const { headerButtonShow = false, onClickHeaderButton = () => { }, headerButtonLabel } = props || {}
  return (
    <div className="custom-card-wrapper">
      <h5 className="font-medium mb-2">Announcements for You</h5>
      <div className="card-wrapper-inner-list">
        <div className="card-wrapper-hori-list-wrapper">
          <div className="img-wrapper">
            <img src="/assets/images/review.png" alt="Review image" />
          </div>
          <div className="details-list">
            <p className="font-medium mb-2">
              Review the course schedule for upcoming courses!
            </p>
            <span className="custom-p-14 grey-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis{' '}
            </span>
          </div>
        </div>
        <div className="card-wrapper-hori-list-wrapper">
          <div className="img-wrapper">
            <img src="/assets/images/upcoming.png" alt="Review image" />
          </div>
          <div className="details-list">
            <p className="font-medium mb-2">
              Review the course schedule for upcoming courses!
            </p>
            <span className="custom-p-14 grey-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHorizentalImage;
