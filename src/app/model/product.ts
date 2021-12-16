//////////////////////////////////////////////////////////////////
///purpose:creating a product model to send and recive the product object
//Author:Kumar Vivek
/////////////////////////////////////////////////////////////////
export interface Product {
  sellerId: number;
  productBrandName: string;
  productType: string;
  productSubType: string;
  productName: string;
  productQuantity: number;
  deliveryTime: string;
  productsSold: number;
  productPrice: number;
  deliveryCharge: number;
  productDescription: string;
  productionCountryOrigin: string;
  productTermsAndCondition: string;
}
