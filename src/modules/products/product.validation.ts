import type { IProducts } from "./product.types";

export const ProductValidation = (data: IProducts) => {
  const {
    ProductName,
    ProductDesc,
    ProductBrand,
    ProductPrice,
    ProductVariants,
    ProductWarrantyDuration,
  } = data;

  if (
    !ProductName ||
    !ProductDesc ||
    !ProductBrand ||
    !ProductPrice ||
    !ProductVariants ||
    !ProductWarrantyDuration
  ) {
    throw new Error("Please fill in the respected fields");
  }

  if (ProductPrice <= 0.0) {
  }
  return;
};
