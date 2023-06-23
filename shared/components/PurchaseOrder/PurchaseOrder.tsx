import "./PurchaseOrder.scss";

const PurchaseOrder = (props: any) => {
  return (
    <div>
      <header className="friday-page-header">
        <div className="friday-page-header__body">
          <div>
            <div className="d-flex">
              <a href="/products" className="circle-icon-secondary me-3">
                <span className="material-icons-outlined">west</span>
              </a>
              <div className="d-flex flex-column">
                <h1 className="friday-page-header__title">Purchase Order</h1>
                <p className="friday-page-header__sub-title">
                  Add, view and edit your products all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="purchase-items-row">
        <div className="purchase-items-row__col">
          <span>Total Unit:</span>
          <h5>321</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Net Amount:</span>
          <h5>321</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Charges Amount:</span>
          <h5>321</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Line Discount:</span>
          <h5>10%</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Total Discount:</span>
          <h5>10%</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Tax Amount:</span>
          <h5>321</h5>
        </div>
        <div className="purchase-items-row__col">
          <span>Total Amount:</span>
          <h5>321</h5>
        </div>
      </div>

      <div className="friday-vertical-tabs-container">
        <div className="row">
          <div className="col-md-4 col-lg-3  col-xxl-2">
            <div className="nav flex-column nav-pills vertical-nav-pills">
              <button
                className="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#general"
                type="button"
              >
                General
              </button>

              <button
                className="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#delivery-address"
                type="button"
              >
                Delivery Address
              </button>

              <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#price-discounts"
                type="button"
              >
                Price and Discounts
              </button>

              <button
                className="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#financial-dimensions"
                type="button"
              >
                Financial Dimensions
              </button>
            </div>
          </div>
          <div className="col-md-8 col-lg-9 col-xxl-10">
            <div className="tab-content" id="v-pills-tabContent">
              {/* <!-- genral --> */}
              <div className="tab-pane fade show active" id="general">
                <div className="w-100 no-wrap general">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">General</h2>
                    <div className="friday-icons-container icons-before">
                      <button className="icon-wrap circle-icon-transparent edit-view">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>
                  <div className="friday-card-body">
                    <div className="row">
                      {/* <!-- .was-validated --> */}
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Account
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Email
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Order
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Type
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Contact
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Warehouse
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Name
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Invoice Account
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Approval Status
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Order Status
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Credit Limit{" "}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              RMA No.
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Credit Availble
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- delivery address --> */}
              <div className="tab-pane fade" id="delivery-address">
                <div className="w-100 no-wrap">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">delivery address</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      {/* <!-- .was-validated --> */}
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Company Name
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Contact Person
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container mb-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Shipping Carrier
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Mode of Delivery
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Address
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Receiving Schedule
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Delivery Date
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="date"
                                  className="form-control"
                                  value="31-12-2021"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Price and Discounts --> */}
              <div className="tab-pane fade" id="price-discounts">
                <div className="w-100 no-wrap">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Price and Discounts</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      {/* <!-- .was-validated --> */}
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Terms of Payment
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Royalty Group{" "}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Corporate Tax
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Rebate Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Withholding Tax Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Charges Group{" "}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Tax Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Method of Payment
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Price List
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-input-container">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- invventory --> */}
              <div className="tab-pane fade" id="financial-dimensions">
                <div className="w-100 no-wrap">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Financial Dimensions</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
