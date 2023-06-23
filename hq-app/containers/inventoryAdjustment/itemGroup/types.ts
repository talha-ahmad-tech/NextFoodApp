export type ADD_ITEM_GROUP_TYPE = {
  name: string;
  description: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  name?: string;
  description?: string;
  id?: string;
  ItemGroupDetails?: ITEM_GROUP_DETAILS;
};

export type ITEM_GROUP_DETAILS = {
  name: string;
  description: string;
  id: string;
};
