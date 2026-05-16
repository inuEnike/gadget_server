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

  if (Number(ProductPrice) < 0.0) {
    throw new Error("Product price shoud not be less than 1 naira");
  }
  return;
};
