import Link from 'next/link';

const Megamenu = (props: any) => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light mega-menu-cont">
        <div className="container-fluid">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-content"
          >
            <div className="hamburger-toggle">
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="navbar-nav">
              <li className="nav-item dropdown dropdown-mega-menu position-static">
                <Link
                  className="nav-link dropdown-toggle"
                  href={'/products'}
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Product
                </Link>

                <div className="dropdown-menu mega-menu-content">
                  {/* <!--  <div className="menu-overlay"></div> --> */}
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <Link href={'/'} className="mega-menu-content__link">
                            Product Demensions
                          </Link>
                        </li>
                        <li className="mega-menu-content__item">
                          <Link
                            href={'/masterVariants'}
                            className="mega-menu-content__link"
                          >
                            Product Variants
                          </Link>
                        </li>
                        <li className="mega-menu-content__item">
                          <Link
                            href={'/productVariant'}
                            className="mega-menu-content__link"
                          >
                            Product Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            UOM Conversions
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Financial Demensions
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Product Attributes
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Shelf Label
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Product Label
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Barcodes
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-mega-menu position-static">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Purchase
                </a>
                <div className="dropdown-menu mega-menu-content">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Purchase Price List
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Purchase Single discount
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Purchase multi discount
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            Purchase total discount
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            royality
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            approved vendors
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            open purchase order
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-mega-menu position-static">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Sell
                </a>
                <div className="dropdown-menu mega-menu-content">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            sale price list
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            sale single discount
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            sale multi discount
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            sale total discount
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            commission
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            approved customers
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            open sale orders
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-mega-menu position-static">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  inventory
                </a>
                <div className="dropdown-menu mega-menu-content">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-3 col-xxl-2">
                      <ul className="mega-menu-content__group">
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            on-hand inventory
                          </a>
                        </li>
                        <li className="mega-menu-content__item">
                          <a href="" className="mega-menu-content__link">
                            transactions
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- <div className="menu-overlay"></div> --> */}
    </div>
  );
};

export default Megamenu;
