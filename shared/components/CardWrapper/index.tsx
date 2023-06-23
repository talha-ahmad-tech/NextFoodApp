import "./style.scss";
import ProductSvg from "../Svgs/ProductSvg";
import ProjectsListing from "../ProjectsListing";

const CardWrapper = (props: any) => {
//   const { headerButtonShow = false, onClickHeaderButton = () => { }, headerButtonLabel } = props || {}
  return (
    <div className="custom-card-wrapper">
    <h5 className="font-medium mb-2">{props.title}</h5>
    <div className="card-wrapper-inner-list">
        <ProjectsListing  title="Business Process Unassigned Step Audit"  timeSpend="Just Know" icon={<ProductSvg />}/>
        <ProjectsListing  title="Create Purchase Order"  timeSpend="2 hours ago" icon={<ProductSvg />}/>
        <ProjectsListing  title="Approved Vendor Payments"  timeSpend="8 hours ago" icon={<ProductSvg />}/>
        <ProjectsListing  title="Receive Pending GRN"  timeSpend="Yesterday" icon={<ProductSvg />}/>
        <button className="blue-link">See All Inbox Items (67)</button>
    </div>

  </div>
  );
};

export default CardWrapper;
