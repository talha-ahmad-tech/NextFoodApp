import './ViewItem.scss';
import { ItemTable, CardWithLabel, Breadcrumb } from '@fridayfood/ui-toolkit';
import Tabs from './data';

const ViewItem = (props: any) => {
  return (
    <div>
      <Breadcrumb
        icon="west"
        title="Product"
        subtitle="Add, view and edit your products all in one place."
        link="/product"
      />
      <div className="friday-vertical-tabs-container">
        <div className="row">
          <div className="col-md-4 col-lg-3  col-xxl-2">
            <div className="nav flex-column nav-pills vertical-nav-pills">
              {/* Buttons */}
              {Tabs.map(item => {
                return (
                  <button
                    key={item.id}
                    className={'nav-link ' + item.classes}
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target={'#' + item.id}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-md-8 col-lg-9 col-xxl-10">
            <div className="tab-content" id="v-pills-tabContent">
              {Tabs.map(item => {
                return (
                  <CardWithLabel
                    key={item.id}
                    classes={item.classes}
                    id={item.id}
                    label={item.label}
                    action={item.actions}
                  >
                    <ItemTable
                      classes={item.classes}
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      tableData={item.tableData}
                      image={item.image}
                    />
                  </CardWithLabel>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="friday-action-bar">
        <div className="container-fluid">
          <div className="friday-action-bar-content">
            <button className="friday-btn friday-btn-outline-secondary friday-btn-md">
              <span className="btn-text">Back</span>
            </button>

            <button className="friday-btn friday-btn-primary friday-btn-md">
              <span className="btn-text">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
