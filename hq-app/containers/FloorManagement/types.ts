export type ADD_REGION_TYPE = {
  name: string;
  width: string | number;
  height: string | number;
  noOfTables: string | number;
  noOfSeats: string | number;
  vacant: string;
  serving: string;
  reserved: string;
  floorArea: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  id: number | string;
  name: string;
  width: string | number;
  height: string | number;
  noOfTables: string | number;
  noOfSeats: string | number;
  vacant: string;
  serving: string;
  reserved: string;
  floorArea: string;
};

export type FLOOR_DETAILS = {
  id: number | string;
  name: string;
  width: string | number;
  height: string | number;
  noOfTables: string | number;
  noOfSeats: string | number;
  vacant: string;
  serving: string;
  reserved: string;
  floorArea: string;
  props?: any;
};
