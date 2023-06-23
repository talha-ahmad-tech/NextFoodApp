import ProjectsListing from "../ProjectsListing";
import { Icon } from "../Icon";

const FavWrapper = (props:any) => {
    return(
        <div className="custom-card-wrapper">
        <h5 className="font-medium custom-title-card">{props.title}</h5>
        <div className="card-wrapper-inner-list pb-0 fav-wrapper">
            <ProjectsListing  title="Accounts Payable "   />
            {/* <ProjectsListing  title="Accounts Payable "   /> */}

            {/* <ProjectsListing  title="Accounts Receivable" /> */}
            <div className="img-wrapper one-img">
               <Icon variant="SecondImg" />
                {/* <Icon variant="SingleImg" /> */}
            </div>
            <button className="blue-link">View All Workspaces</button>
        </div>
      </div>
    )
}
export default FavWrapper;