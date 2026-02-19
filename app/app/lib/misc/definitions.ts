export type FormState = {
  data?: { [field: string]: [value: any] };
  fieldErrors?: { [field: string]: [error: string] };
  formError?: string;
  success?: boolean;
}

// Dtos are used in requests to the backend.

export type ProductDto = {};

export type RawMaterialDto = {};

export type ProductRawMaterialDto = {};

export type Dto = ProductDto | RawMaterialDto | ProductRawMaterialDto;

// Views come from backend responses.

export type ProductView = {};

export type RawMaterialView = {};

export type ProductRawMaterialView = {};

export type View = ProductView | RawMaterialView | ProductRawMaterialView;

