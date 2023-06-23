export type ADD_CATEGORY_TYPE = {
  itemGroup: { name?: string; id?: number; label?: string };
  itemGroupId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemGroupIdName?: any;
  code?: string;
  categoryId: string;
  categoryCode?: string;
  name: string;
  description: string;
  position: string | number;
  active: boolean;
  featured: boolean;
  defaultImage: string;
  uploadImage: string;
  hideOnline: boolean;
  hideOnPos: boolean;
  id?: string | number;
};

export type ADD_UPDATE_FROM_PROPS = {
  itemGroup: { name?: string; id?: number; label?: string };
  itemGroupId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemGroupIdName?: any;
  code?: string;
  categoryId: string;
  categoryCode?: string;
  name: string;
  description: string;
  position: string | number;
  active: boolean;
  featured: boolean;
  defaultImage: string;
  uploadImage: string;
  hideOnline: boolean;
  hideOnPos: boolean;
  id?: string | number;
  CategoryDetails: CATEGORY_DETAILS;
};

export type CATEGORY_FORM = {
  itemGroup: { name?: string; id?: number };
  categoryCode?: { name?: string; label?: string };
  itemGroupId?: { name: string; label: string; id?: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemGroupIdName?: any;

  code?: string;
  name?: { name?: string; label?: string };
  categoryId?: string;
  description?: { name?: string; label?: string };
  status?: { name?: string; label?: string };
  position?: { name?: string | number; label?: string };
  active?: { [key: string]: string };
  featured?: { [key: string]: string };
  defaultImage?: { name: string; label?: string };
  uploadImage?: { name: string; label?: string };
  hideOnline?: { [key: string]: string };
  hideOnPos?: { [key: string]: string };
  id?: number | string;
};

export type CATEGORY_DETAILS = {
  itemGroup: { name?: string; id?: number; label?: string };
  code?: string;
  categoryId: string | number;
  itemGroupId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemGroupIdName?: any;

  categoryCode: string;
  externalId?: string | number;
  name?: string;
  description?: string;
  position?: string | number;
  active?: boolean;
  featured?: boolean;
  defaultImage?: string;
  uploadImage?: string;
  hideOnline?: boolean;
  hideOnPOS?: boolean;
  id?: string | number;
  hideOnPos?: boolean;
};
