import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { Dispatch, SetStateAction } from 'react';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  // (props?: boolean) => void;
}) => {
  return (
    <>
      <ModalCustom
        show={open}
        saveButtonType={'button'}
        // handleSave={() => {}}
        close={() => setOpen(false)}
        noAction
        modalWidth="custom-small-modal"
        title="Select Type of Product"
      >
        <div className="row m-0 pt-2 pb-4">
          <div className="col-sm-12 col-md-6 mb-4">
            <Link
              href={'/menumanagement/products/ingredients/add'}
              className="link-card-btn"
            >
              <Image
                src="/assets/svgs/icon-ingredients.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">Ingredients</span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 mb-4">
            <Link
              href={'/menumanagement/products/packagingmaterial/add'}
              className="link-card-btn"
            >
              <Image
                src="/assets/svgs/icon-packaging-material.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">Packaging Material</span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <Link
              href={'/menumanagement/products/finishedproduct/add'}
              className="link-card-btn"
            >
              <Image
                src="/assets/svgs/icon-finished-product.svg"
                alt="no"
                width={60}
                height={60}
              />

              <span className="font-medium ps-4"> Finished Products</span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <Link
              href={'/menumanagement/products/productsdeal/add'}
              className="link-card-btn"
            >
              <Image
                src="/assets/svgs/icon-deal.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">Deal</span>
            </Link>
          </div>
        </div>
      </ModalCustom>
    </>
  );
};

export default ProductsModal;
