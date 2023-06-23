import './style.scss';
import SectionWrapper from '../SectionWrapper';

const NoRecordWrapper = () => {
  return (
    <SectionWrapper className="medium-card-wrapper">
      <h5 className="font-medium">Lets start a Project</h5>
      <div className="row py-4">
        <div className="col-xl-7">
          <div className="projects-wrapper">
            <p>
              Knowing everyone is a plus, will guide you to understand your
              network. Knowing everyone is a plus, will guide you to understand
              your network.
            </p>
            <p className="py-4">
              Knowing everyone is a plus, will guide you to understand your
              network.
            </p>
            <div className="custom-flex-start mt-5">
              <button className="custom-btn-primary-new">How it works?</button>
              <button className="custom-btn-secondary-new ms-4">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-5 text-right image-wrapper">
          <img src="/assets/images/start-project.png" alt="" />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default NoRecordWrapper;
