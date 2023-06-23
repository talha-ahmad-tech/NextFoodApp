import React from 'react';
import { JsxElement } from 'typescript';

export type ADD_UPDATE_FROM_PROPS = {
  id?: number | string;
  name: string;
  description: string;
  position: string;
  modifier: string;
  compulsory: boolean;
  optional: boolean;
  className?: string;
  maxSelectionAllowed: string;
};

//////////////////////////////////
export type ADD_UOM = {
  uomName?: string;
  description?: string;
  classType?: string;
  uomDetails?: string;
  className?: string;
  id?: number | string;
};

export type ADD_UPDATE_UOM = {
  uomName?: string;
  name?: string;
  id?: number | string;
  description?: string;
  class?: string;
  uomDetails?: UOM_DETAILS;
};

export type UOM_DETAILS = {
  uomName?: string;
  name?: string;
  description?: string;
  classType?: string;
  fromUnit?: string;
  toUnit?: string;
  fromQTY?: string | number;
  toQTY?: string | number;
  uomDetails?: Array<ADD_UOM>;
  activeTab?: string;
  id?: number | string;
  data?: UOM_LIST[];
  ErrorComponent?: JsxElement | React.ReactNode;

  hasError?: boolean;
  statusCode?: number;
  message?: string;
  className?: string;
};

export type ADD_UPDATE_UOM_LINES = {
  fromUnit?: string;
  toUnit?: string;
  fromQTY?: number;
  toQTY?: number;
  id?: string | number;
  zero?: number;
  className?: string;
};

export type VIIEW_RESPONSE = {
  description?: string;
  externalId?: string;
  id?: number | string;
  name?: string;
  symbol?: string;
  details?: string[];
  className?: string;
};

export type UOM_LIST = {
  id?: number | string;
  name: string;
  symbol?: string;
  description?: string;
  externalId?: string;
  className?: string;
};
