import CardHeaderIConText from '../CardHeaderIconText';
import NoItem from '../NoItems';
import SectionWrapper from '../SectionWrapper';
import ProductSvg from '../Svgs/ProductSvg';
import ListWrapper from '../ListWrapper';
import './style.scss';

interface IModuleDashboardCard {
  items: any[];
  title: string;
  icon?: JSX.Element;
  onViewAll?: any;
}

const ModuleDashboardCard = ({
  items = [],
  title,
  icon = <ProductSvg />,
  onViewAll = () => {},
}: IModuleDashboardCard) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 custom-grid-breakpoint pb-4">
      <SectionWrapper className="all-cards-wrapper">
        <CardHeaderIConText
          icon={icon}
          title={title}
          pagelisting={`${items.length}${
            items.length < 1 ? ' Item' : ' Items'
          }`}
        />
        {items.length ? (
          <div className="pb-3 custom-padding-x">
            {items.map(({ id, title, time }: any) => (
              <ListWrapper key={id} title={title} id={id} time={time} />
            ))}
          </div>
        ) : (
          <NoItem itemImage="/assets/images/no-item.png" />
        )}

        {items.length > 0 && (
          <div className="custom-flex-end pe-3">
            <button className="view-all-btn custom-p-10" onClick={onViewAll}>
              VIEW ALL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.968"
                height="9.206"
                viewBox="0 0 5.968 9.206"
                className="ms-1"
              >
                <path
                  id="Path_2068"
                  data-name="Path 2068"
                  d="M151.05,240.368a.885.885,0,0,1,.25-.613.871.871,0,0,1,1.226,0l2.625,2.617,2.625-2.625A.867.867,0,0,1,159,240.972l-3.238,3.238a.855.855,0,0,1-.613.25.892.892,0,0,1-.613-.25l-3.238-3.23A.9.9,0,0,1,151.05,240.368Z"
                  transform="translate(-239.493 159.256) rotate(-90)"
                  fill="#aac0de"
                />
              </svg>
            </button>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export default ModuleDashboardCard;
