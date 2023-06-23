import "./NewSalesTaxGroup.scss";

const NewSalesTaxGroup = (props: any) => {
  return (
    <div>
      <header className="friday-page-header">
        <div className="friday-page-header__body">
          <div>
            <div className="d-flex align-items-center">
              <a href="/products" className="circle-icon-secondary me-2">
                <span className="material-icons-outlined">west</span>
              </a>
              <h1 className="friday-page-header__title">New Sales Tax Group</h1>
            </div>
            <p className="friday-page-header__sub-title">
              Add, view and edit your products all in one place.
            </p>
          </div>
        </div>
      </header>

      <div className="friday-card card-shadow-1 border-radius-10 mb-4">
        <div className="friday-card-header">
          <h2 className="friday-card-title">General</h2>
          <div className="friday-icons-container">
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
              <label className="col-md-4 col-lg-3  col-xxl-2 col-form-label form-label-required">
                Country/Region/State
              </label>
              <div className="col-lg-4 col-md-5 col-xxl-3">
                <div className="friday-input-container">
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <label className="col-md-4 col-lg-3  col-xxl-2 col-form-label">
                Name{" "}
              </label>
              <div className="col-lg-4 col-md-5 col-xxl-3">
                <div className="friday-input-container">
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <label className="col-md-4 col-lg-3  col-xxl-2 col-form-label">
                Purpose
              </label>
              <div className="col-lg-4 col-md-5 col-xxl-3">
                <div className="friday-input-container">
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <label className="col-md-4 col-lg-3  col-xxl-2 col-form-label form-label-required">
                Rounding By
              </label>
              <div className="col-lg-4 col-md-5 col-xxl-3">
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
              <label className="col-md-4 col-lg-3  col-xxl-2 col-form-label">
                Description{" "}
              </label>
              <div className="col-lg-4 col-md-5 col-xxl-3">
                <textarea
                  className="form-control form-control-textarea textarea-height-100"
                  placeholder="Enter Purpose"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="friday-card card-shadow-1 border-radius-10">
        <div className="friday-card-header">
          <h2 className="friday-card-title">Setup</h2>

          <div className="friday-icons-container">
            <button type="button" className="icon-wrap circle-icon-transparent">
              <span className="material-icons-outlined">delete</span>
            </button>
            <button type="button" className="icon-wrap circle-icon-transparent">
              <span className="material-icons-outlined">edit</span>
            </button>
          </div>
        </div>

        <div className="friday-card-body">
          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-1 col-lg-1 col-xxl-1 text-center">
              <div className="friday-checkboxes">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-1"
                  name="checkbox-1"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-2 text-center">
              <div className="friday-radios">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radio-1"
                  name="radio"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2 offset-xxl-1">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-1 offset-xxl-1">
              <div className="switch-container">
                <input className="friday-switch" type="checkbox" />
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-1 col-lg-1 col-xxl-1 text-center">
              <div className="friday-checkboxes">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-2"
                  name="checkbox-2"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-2 text-center">
              <div className="friday-radios">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radio-2"
                  name="radio"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2 offset-xxl-1">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-1 offset-xxl-1">
              <div className="switch-container">
                <input className="friday-switch" type="checkbox" />
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-1 col-lg-1 col-xxl-1 text-center">
              <div className="friday-checkboxes">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-3"
                  name="checkbox-3"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-2 text-center">
              <div className="friday-radios">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radio-3"
                  name="radio"
                />
                <label className="form-check-label"></label>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xxl-2 offset-xxl-1">
              <div className="friday-input-container">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xxl-1 offset-xxl-1">
              <div className="switch-container">
                <input className="friday-switch" type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSalesTaxGroup;
