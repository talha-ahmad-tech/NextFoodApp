/* eslint-disable @typescript-eslint/no-explicit-any */
export type ADD_UPDATE_INGREDIENTS = {
  imageUrl?: string;
  ingredientTaxes?: string;
  purchaseUomId?: string;
  saleUomId?: string;
  purchaseUomName?: string;
  saleUomName?: string;
  purchaseUomDetail?: string;
  saleUomDetail?: string;
  id?: number;
  externalId?: string;
  categoryId?: string | number | null;
  categoryName?: string;
  category: { name?: string; id?: string };
  itemGroup: { name?: string; id?: string };
  itemGroupId?: string | number | null;
  itemGroupName?: string;
  code?: string;
  productId?: string;
  name?: string;
  productName?: string;
  description?: string;
  purchaseUom?: any;
  saleUom?: any;
  cost?: number;
  enableDiscount?: boolean;
  active?: boolean;
  featuredProduct?: boolean;
  productType?: number;
  ingredientsDetails?: ADD_UPDATE_INGREDIENTS[];
  callBack?: () => void;
};

export type INGREDIENTS_FORM_TAB = {
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

export type INGREDIENTS_VIEW = {
  code?: string;
  id?: string;
  ingredientsDetails?: INGREDIENTS_DETAILS;
};

export type INGREDIENTS_DETAILS = {
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
  ingredientsDetails?: Array<ADD_UPDATE_INGREDIENTS>;
  id?: string;
};
