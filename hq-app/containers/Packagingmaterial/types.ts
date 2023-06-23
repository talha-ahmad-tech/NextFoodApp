/* eslint-disable @typescript-eslint/no-explicit-any */
export type ADD_UPDATE_PACKAGINGMATERIAL = {
  imageUrl?: string;
  ingredientTaxes?: string;
  purchaseUomId?: string;
  saleUomId?: string;
  purchaseUomName?: string;
  saleUomName?: string;
  purchaseUomDetail?: string;
  saleUomDetail?: string;
  purchaseUom?: any;
  saleUom?: any;
  id?: number;
  externalId?: string;
  categoryId?: string | number | null;
  categoryName?: string;
  category: { name?: string; id?: string };
  itemGroup: { name?: string; id?: string };
  itemGroupId?: string | number | null;
  itemGroupName?: string;
  code?: string | number | undefined;
  productId?: string | number;
  name?: string;
  productName?: string;
  description?: string;
  cost?: number;
  enableDiscount?: boolean;
  active?: boolean;
  featuredProduct?: boolean;
  productType?: number;
  ingredientsDetails?: ADD_UPDATE_PACKAGINGMATERIAL[];
  callBack?: () => void;
};

export type ADD_UPDATE_PACKAGINGMATERIAL_DETAILS = {
  code?: string | number | undefined;
  id?: string;
  ingredientsDetails?: PACKAGINGMATERIAL_DETAILS;
};

export type PACKAGINGMATERIAL_FORM_TAB = {
  productId?: { name?: string; label?: string };
  productName?: { name?: string; label?: string };
  description?: { name?: string; label?: string };
  categoryId?: { name?: string; label?: string };
  itemGroupId: {
    label: string;
    name?: string;
    id?: string;
  };
  purchaseUom?: { name?: string; label?: string };
  uploadImage?: { name?: string; label?: string };

  saleUom?: { name?: string; label?: string };
  cost?: { [key: string]: string };
  active?: { [key: string]: string };
  enableDiscount?: { [key: string]: string };
  featuredProduct?: { [key: string]: string };
  id?: number | string;
};
export type PACKAGINGMATERIAL_DETAILS = {
  code?: string;
  kitName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  status?: 0 | 1;
  approvalStatus?: 0 | 1;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string;
  purchaseTaxGroupName?: string;
  saleTaxGroupId?: string;
  saleTaxGroupName?: string;
  ingredientsDetails?: Array<ADD_UPDATE_PACKAGINGMATERIAL>;
  id?: string;
};
