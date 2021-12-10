export interface IProperty {
  Id: number;
  Name: string;
  InGallery: number;
  Type: string;
  Price: number;
  Image?: string;
  Brand: number;
  sub_type: string;
  country: String;
  Title_of_product: string;
  quantity: number;
  terms_and_condition: string;
  desc: {
    ram: String;
    processor: string;
    display: string;
  };
}
