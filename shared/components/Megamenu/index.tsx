import { useState, useRef } from 'react';
import Link from 'next/link';
import './SinglePageMenu.scss';
import useOutsideAlerter from '../CustomHooks';
import TabsHorizontal from '../TabsHorizontal';

const mainHeaderItems: any = [
  {
    name: 'Product',
    link: '/product',
    active: false,
    id: '1',
    navItems: [
      {
        name: 'Product Demensions',
        link: '/',
      },
      {
        name: 'Product Variants',
        link: '/masterVariants',
      },
      {
        name: 'Product Categories',
        link: '/productVariant',
      },
      {
        name: 'UOM Conversions',
        link: '/',
      },
      {
        name: 'Financial Demensions',
        link: '/',
      },
      {
        name: 'Product Attributes',
        link: '/',
      },
      {
        name: 'Shelf Label',
        link: '/',
      },
      {
        name: 'Product Label',
        link: '/',
      },
      {
        name: 'Barcodes',
        link: '/',
      },
    ],
  },
  {
    name: 'Purchase Order',
    link: '/purchaseOrders',
    active: false,
    id: '2',
    navItems: [
      {
        name: 'Purchase Order',
        link: '/purchaseOrders',
      },
    ],
  },
];

export const SubHeaderNavbar = ({ item, itemKey, index, setIndex }: any) => {
  return (
    // <li className="nav-item dropdown dropdown-mega-menu position-static">
    //   <Link
    //     data-bs-toggle="dropdown"
    //     data-bs-close-target="outside"
    //     to={item.link}
    //     className="nav-link dropdown-toggle"
    //     onClick={() => {
    //       if (index === itemKey) setIndex(-1);
    //       else setIndex(itemKey);
    //     }}
    //   >
    //     {item?.name}
    //   </Link>
    <li className="nav-item" role="presentation">
      <Link
        className={`nav-link ${index === item.id ? 'active' : ''}`}
        id={`pills-${item.id}`}
        data-bs-toggle="pill"
        data-bs-target={item.id}
        type="button"
        role="tab"
        aria-controls={`pills- ${item.id}`}
        aria-selected={index === item.id ? 'true' : 'false'}
        href={item.link}
        onClick={() => {
          if (index === itemKey) setIndex(-1);
          else setIndex(itemKey);
        }}
      >
        {item.name}
      </Link>
    </li>

    /* <div
      className={`dropdown-menu mega-menu-content dropdown  ${index === itemKey ? "show" : "hide"
        }`}
      key={itemKey}
    >
      <div className="row">
        {item?.navItems.map((navName: any, index: any) => {
          return (
            <div className="col-12 col-sm-4 col-md-3 col-xxl-2" key={index}>
              <ul className="mega-menu-content__group">
                <li className="mega-menu-content__item">
                  <Link
                    to={navName?.link}
                    className="mega-menu-content__link"
                  >
                    {navName?.name}
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div> */
    // </li>
  );
};

const SinglePageMenu = ({ headerItems = mainHeaderItems, ...props }) => {
  const [index, setIndex] = useState<number>(0);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIndex(-1);
  });
  return <>{/* <TabsHorizontal Tabs={mainHeaderItems} /> */}</>;
};
export default SinglePageMenu;
