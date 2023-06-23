import React, { useState } from 'react';
import SingleDropdown from '@fridayfood/ui-toolkit/src/SingleDropdown/SingleDropdown';
import MultiDropdown from '@fridayfood/ui-toolkit/src/MultiDropdown/MultiDropdown';
import FormInput from '@fridayfood/ui-toolkit/src/FormInput/FormInput';
import Button from '@fridayfood/ui-toolkit/src/Button/index';
import ErrorModal from '@fridayfood/ui-toolkit/src/ErrorModal/ErrorModal';
import ErrorBubbleMesage from '@fridayfood/ui-toolkit/src/ErrorBubbleMesage/ErrorBubbleMesage';

import './Summary.scss';

const options = [
  { label: 'Mobile Phones', value: 'Mobile' },
  { label: 'Gaming', value: 'game' },
  { label: 'LED', value: 'LED' },
  { label: 'Air Conditioner', value: 'AC' },
  { label: 'Household', value: 'Household' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Cloth', value: 'Cloth' },
  { label: 'Accessories', value: 'Accessories' },
];
const errorObject = {
  title: 'Error',
  errors: [
    { label: 'Error', message: 'This Field is Required' },
    { label: 'Error', message: 'This Field is Required' },
    { label: 'Error', message: 'This Field is Required' },
    { label: 'Error', message: 'This Field is Required' },
    { label: 'Error', message: 'This Field is Required' },
    { label: 'Error', message: 'This Field is Required' },
  ],
};
const Summary = (props: any) => {
  const [singleDropdownValue, setSingleDropdownValue] = useState(null);
  const [multiDropdownValue, setMultiDropdownValue] = useState([]);

  const handleSingleDropdown = (result: any) => {
    setSingleDropdownValue(result);
  };
  const handleMultiDropdown = (result: any) => {
    setMultiDropdownValue(result);
  };
  const handleTextInputChange = (event: any) => {
    console.log(event);
  };
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
                <h1 className="friday-page-header__title">Summary</h1>
                <p className="friday-page-header__sub-title">
                  Add, view and edit your products all in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <ErrorBubbleMesage totalErrors={errorObject.errors.length} />
            {/* <div className="bubble-message-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <a href="" data-bs-toggle="modal" data-bs-target="#errors-modal">
                {errorObject.errors.length} errors
              </a>
            </div> */}
          </div>
        </div>
      </header>
      <div className="friday-vertical-tabs-container">
        <div className="row">
          <div className="col-md-4 col-lg-3  col-xxl-2">
            <div className="nav flex-column nav-pills vertical-nav-pills">
              <Button
                classes="nav-link"
                id="v-pills-home-tab"
                toggle="pill"
                target="#general"
                type="button"
                label="General"
              />
              <Button
                classes="nav-link"
                id="v-pills-profile-tab"
                toggle="pill"
                target="#purchase"
                type="button"
                label="Purchase"
              />
              <Button
                classes="nav-link"
                id="v-pills-messages-tab"
                toggle="pill"
                target="#sell"
                type="button"
                label="Sell"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#inventory"
                type="button"
                label="Inventory"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#attributes"
                type="button"
                label="Attributes"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#product-variants"
                type="button"
                label="Product Variants"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#uom-conversion"
                type="button"
                label="UOM Conversion"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#financial-dimension"
                type="button"
                label="Financial Dimension"
              />
              <Button
                classes="nav-link"
                id="v-pills-settings-tab"
                toggle="pill"
                target="#summary"
                type="button"
                label="Summary"
              />
            </div>
          </div>
          <div className="col-md-8 col-lg-9 col-xxl-10">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade" id="general">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4 general">
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
                      <div className="col-lg-6">
                        <FormInput
                          classes="form-control"
                          required={true}
                          placeholder="Product Id"
                          label="Product ID"
                          type="text"
                          onValueChange={handleTextInputChange}
                        />
                        <FormInput
                          classes="form-control"
                          required={true}
                          placeholder="Product model"
                          type="text"
                          label="Product Model"
                          onValueChange={handleTextInputChange}
                        />
                        <FormInput
                          classes="form-control"
                          label="Product Model"
                          type="select"
                          multi={true}
                          options={options}
                          value={multiDropdownValue}
                          onValueChange={handleMultiDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Inventory Costing"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Product Active Status"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Auxiliary Category"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />

                        <FormInput
                          classes="form-control"
                          required={true}
                          placeholder="Vendor Product ID"
                          label="Vendor Product ID"
                          type="text"
                          onValueChange={handleTextInputChange}
                        />
                        <FormInput
                          classes="form-control"
                          required={true}
                          placeholder="Location Group"
                          label="Location Group"
                          type="text"
                          onValueChange={handleTextInputChange}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Product Group"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                      </div>
                      <div className="col-lg-6">
                        <FormInput
                          classes="form-control"
                          required={true}
                          placeholder="Product Name"
                          label="Product Name"
                          type="text"
                          onValueChange={handleTextInputChange}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label=" Product Type"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />

                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Tracking Group"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />

                        <FormInput
                          classes="form-control"
                          type="select"
                          label="HS Code 1"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Procurement Category"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label="Retail Category"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="select"
                          label=" PCT Code 1"
                          multi={false}
                          options={options}
                          value={singleDropdownValue}
                          onValueChange={handleSingleDropdown}
                        />
                        <FormInput
                          classes="form-control"
                          type="file"
                          label=" Upload Image"
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="purchase">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">purchase</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Unit
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Latest Purchase Price
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
                              Purchase Single Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Approved Vendors
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Rebate
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Base Purchase Price{' '}
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
                              Purchase Multi Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Total Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              Purchase Sales Tax Group{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Single Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Multi Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Approval Check{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Price Included Tax{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Price Group{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                                {/* <ng-select>
                              <ng-option *ngFor="let country of countries">{{country.name}}
                              </ng-option> 
                            </ng-select> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Installments
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

              <div className="tab-pane fade" id="sell">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Sell</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Unit
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Latest Sale Price
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
                              Sale Single Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Approved Customers
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Customer Rebate
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Base sale Price
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
                              Sale Multi Charges
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Total Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              {' '}
                              Sale Tax Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Single Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Multi Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              {' '}
                              Customer Approval Check{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Price Included Tax{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Price Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Installments
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

              <div className="tab-pane fade" id="inventory">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Inventory</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Inventory Unit
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Inventory Valuation{' '}
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
                              Sale Single Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Minimum Quantity to reserve on POS
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
                              Latest Cost Price
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
                              Sale Multi Charges
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              {' '}
                              Base Cost Price
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
                              Sale Single Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Product Rating By user{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              {' '}
                              Blocked at Register{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Product Rating By System{' '}
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
                              Counting Interval
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

              <div className="tab-pane fade" id="attributes">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Attributes</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Model
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Model{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Model{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Material{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Material{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              Brand
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Brand
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Brand
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Material{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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

              <div className="tab-pane fade" id="product-variants">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Product Variants</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    {/* <ag-grid-angular style="width: 100%; height: 350px;" className="ag-theme-alpine" [rowData]="rowData"
                  [columnDefs]="columnDefs">
                </ag-grid-angular> */}
                    AG grid Here
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="uom-conversion">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">UOM Conversion</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Serial Number
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              From Unit{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Denominator
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
                              {' '}
                              Numerator
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              To Unit{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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

              <div className="tab-pane fade" id="financial-dimension">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Financial Dimension</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Product{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Customer{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Employee{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Wareouse{' '}
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
                              {' '}
                              Store{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Ledger Account
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Bank{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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

              <div className="tab-pane fade  show active" id="summary">
                <div className="friday-card card-shadow-1 border-radius-10 mb-4 general">
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
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Product ID
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
                              Product model
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
                              Variant Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                {/* <ng-multiselect-dropdown [settings]="dropdownSettings" [data]="dropdownList"
                              [(ngModel)]="selectedItems" (onSelect)="onItemSelect($event)"
                              (onSelectAll)="onSelectAll($event)">
                            </ng-multiselect-dropdown> */}
                                <MultiDropdown
                                  options={options}
                                  value={multiDropdownValue}
                                  onValueChange={handleMultiDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Inventory Costing
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Product Active Status{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Auxiliary Category
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Product ID
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
                              Location Group
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
                              Product Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              Product Name
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
                              Product Type
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Tracking Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              HS Code 1{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Procurement Category{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Retail Category
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              PCT Code 1
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Upload Image
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <form>
                                <div
                                  className="file-upload-wrapper"
                                  data-text="No File Choosen"
                                >
                                  <input
                                    name="file-upload-field"
                                    type="file"
                                    className="file-upload-field"
                                    value=""
                                    onChange={handleMultiDropdown}
                                  />
                                </div>
                                <p>Only Jpej, PNG, PDF, ppt</p>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">purchase</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Unit
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Latest Purchase Price
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
                              Purchase Single Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Approved Vendors
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Rebate
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Base Purchase Price{' '}
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
                              Purchase Multi Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Total Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              Purchase Sales Tax Group{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Single Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Multi Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Vendor Approval Check{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Price Included Tax{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Purchase Price Group{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Installments
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
                <div className="friday-card card-shadow-1 border-radius-10 mb-4">
                  <div className="friday-card-header">
                    <h2 className="friday-card-title">Sell</h2>
                    <div className="friday-icons-container">
                      <button className="icon-wrap circle-icon-transparent">
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="friday-card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Unit
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Latest Sale Price
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
                              Sale Single Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Approved Customers
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Customer Rebate
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Base sale Price
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
                              Sale Multi Charges
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Total Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
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
                              {' '}
                              Sale Tax Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Single Charges{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Multi Discount{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              {' '}
                              Customer Approval Check{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Price Included Tax{' '}
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Sale Price Group
                            </label>
                            <div className="col-lg-6 col-md-6 col-xxl-6 ">
                              <div className="friday-select-dropdown">
                                <SingleDropdown
                                  options={options}
                                  value={singleDropdownValue}
                                  onValueChange={handleSingleDropdown}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
                              Installments
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
            </div>
          </div>
        </div>
      </div>
      <ErrorModal title={errorObject.title} errors={errorObject.errors} />

      <div className="friday-action-bar">
        <div className="container-fluid">
          <div className="friday-action-bar-content">
            <button className="friday-btn friday-btn-outline-secondary friday-btn-md">
              <span className="btn-text">Cancel</span>
            </button>

            <button className="friday-btn friday-btn-primary friday-btn-md">
              <span className="btn-text">Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
