export type ADD_TABLEORDERING = {
  allowTableOrder?: boolean;
  noOfTable?: string;
};

export type ADD_UPDATE_TABLEORDERING = {
  allowTableOrder?: boolean;
  noOfTable?: string;
  id?: string | number;
  tableorderingDetails?: TABLEORDERING_DETAILS;
};

export type TABLEORDERING_DETAILS = {
  allowTableOrder?: boolean;
  name?: string;
  noOfTable?: string;
  tableorderingDetails?: Array<ADD_TABLEORDERING>;
  id?: string;
};
