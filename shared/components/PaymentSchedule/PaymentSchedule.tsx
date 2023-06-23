import "./PaymentSchedule.scss";

const PaymentSchedule = (props: any) => {
  return (
    <div>
      <header className="friday-page-header">
        <div className="friday-page-header__body">
          <div>
            <div className="d-flex align-items-center">
              <a href="/products" className="circle-icon-secondary me-2">
                <span className="material-icons-outlined">west</span>
              </a>
              <h1 className="friday-page-header__title">Payment Schedule</h1>
            </div>
            <p className="friday-page-header__sub-title">
              Add, view and edit your products all in one place.
            </p>
          </div>
          <div className="friday-buttons-container">
            <button className="friday-btn friday-btn-secondary friday-btn-md">
              <span className="btn-text">Add Payment schedule</span>
            </button>

            <button className="friday-btn friday-btn-delete friday-btn-md">
              <span className="btn-text">Delete</span>
            </button>
          </div>
        </div>
      </header>

      <div className="row">
        <div className="col-lg-3 col-md-3 col-xxl-2">
          <div className="friday-card h-100 card-shadow-1 border-radius-10">
            <div className="friday-card-body">
              <div className="fact-pane">
                <ul>
                  <li>
                    <a href="" className="item">
                      Weekly
                    </a>
                  </li>
                  <li>
                    <a href="" className="item">
                      Monthly
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9 col-xxl-10">
          <div className="friday-tabs-container mb-4">
            <div className="tab-head">
              <ul className="nav nav-pills" id="pills-tab">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    id="pills-header-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-header"
                    type="button"
                  >
                    Header
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-liner-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-liner"
                    type="button"
                  >
                    Liner
                  </button>
                </li>
              </ul>

              <div className="friday-icons-container">
                <button className="icon-wrap circle-icon-transparent">
                  <span className="material-icons-outlined">delete</span>
                </button>
                <button className="icon-wrap circle-icon-transparent">
                  <span className="material-icons-outlined">edit</span>
                </button>
              </div>
            </div>

            <div className="friday-card card-shadow-1 border-radius-10">
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-header">
                  <div className="friday-card-body">
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Payment Schedule
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Selection Allocation{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Select Payment Per{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Number of Payments{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Day{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Fixed Plan?
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="switch-container">
                            <input className="friday-switch" type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="pills-liner">
                  <div className="friday-card-body">
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Terms of Payment
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Payment Method{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-select-dropdown">
                            <select className="form-select">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Description{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-input-container">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Months{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-input-container">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Day{" "}
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="friday-input-container">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                          Default Term of Payment ?
                        </label>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                          <div className="switch-container">
                            <input className="friday-switch" type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="friday-card card-shadow-1 border-radius-10">
            <div className="friday-card-header no-border">
              <div className="friday-icons-container w-100 justify-content-end">
                <button className="icon-wrap circle-icon-transparent">
                  <span className="material-icons-outlined">delete</span>
                </button>
                <button className="icon-wrap circle-icon-transparent">
                  <span className="material-icons-outlined">edit</span>
                </button>
              </div>
            </div>

            <div className="friday-card-body">
              <div className="form-group">
                <div className="row">
                  <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label form-label-required">
                    Country/Region/State
                  </label>
                  <div className="col-lg-6 col-md-6 col-xxl-4">
                    <div className="friday-input-container">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                    Name{" "}
                  </label>
                  <div className="col-lg-6 col-md-6 col-xxl-4">
                    <div className="friday-input-container">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                    Purpose
                  </label>
                  <div className="col-lg-6 col-md-6 col-xxl-4">
                    <div className="friday-input-container">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label form-label-required">
                    Rounding By
                  </label>
                  <div className="col-lg-6 col-md-6 col-xxl-4">
                    <div className="friday-select-dropdown">
                      <select className="form-select">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label className="col-lg-3 col-md-4 col-xxl-2 col-form-label">
                    Description{" "}
                  </label>
                  <div className="col-lg-6 col-md-6 col-xxl-4">
                    <textarea
                      className="form-control form-control-textarea textarea-height-100"
                      placeholder="Enter Purpose"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;
