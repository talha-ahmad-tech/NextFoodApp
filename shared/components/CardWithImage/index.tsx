import './style.scss';
const CardWithImage = (props: any) => {
  //   const { headerButtonShow = false, onClickHeaderButton = () => { }, headerButtonLabel } = props || {}
  return (
    <div className="custom-card-wrapper">
      <div className="custom-flex-between mb-2">
        <h5 className="font-medium ">Reccomendation</h5>
        <button className="light-blue-link">
          VIEW ALL
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5.596"
            height="10.065"
            viewBox="0 0 5.596 10.065"
          >
            <path
              id="Chevron"
              d="M1.148,9.86,5.46,5.374a.5.5,0,0,0,0-.683L1.148.2A.655.655,0,0,0,.2.2a.721.721,0,0,0,0,.99L3.885,5.033.2,8.87a.722.722,0,0,0,0,.99.655.655,0,0,0,.952,0"
              fill="#0b77e3"
              opacity="0.5"
            />
          </svg>
        </button>
      </div>
      <div className="row desktop-only">
        <div className="col-sm-6 col-md-4 col-xl-3 py-2">
          <div className="card-image-wrapper-main">
            <div className="image-wrapper">
              <img src="/assets/images/welcome.png" alt="Welcome Image" />
            </div>
            <div className="card-body">
              <p className="font-medium mb-2">
                How to say Hello to <br />
                community
              </p>
              <span className="custom-p-14 grey-text d-block">
                Learn how to say hello when you join new community
              </span>
              <button className="custom-primary-btn mt-3">
                Manage Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 py-2">
          <div className="card-image-wrapper-main">
            <div className="image-wrapper">
              <img
                src="/assets/images/people-network.png"
                alt="Welcome Image"
              />
            </div>
            <div className="card-body">
              <p className="font-medium mb-2">
                Understand Your People <br />
                Network
              </p>
              <span className="custom-p-14 grey-text d-block">
                Knowing everyone is a plus, will guide you to understand your
                network.
              </span>
              <button className="custom-primary-btn mt-3">
                Manage Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 py-2 hide-below-laptop">
          <div className="card-image-wrapper-main">
            <div className="image-wrapper">
              <img src="/assets/images/teammates.png" alt="Welcome Image" />
            </div>
            <div className="card-body">
              <p className="font-medium mb-2">
                How work with your <br />
                Teammates
              </p>
              <span className="custom-p-14 grey-text d-block">
                Learn how to say hello when you join new community.{' '}
              </span>
              <button className="custom-primary-btn mt-3">
                Manage Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 py-2 hide-below-desktop">
          <div className="card-image-wrapper-main">
            <div className="image-wrapper">
              <img src="/assets/images/teammates.png" alt="Welcome Image" />
            </div>
            <div className="card-body">
              <p className="font-medium mb-2">
                How to say Hello to <br />
                community
              </p>
              <span className="custom-p-14 grey-text d-block">
                Learn how to say hello when you join new community
              </span>
              <button className="custom-primary-btn mt-3">
                Manage Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithImage;
