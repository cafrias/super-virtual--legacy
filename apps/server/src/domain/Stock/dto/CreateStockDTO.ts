import { Product } from '../../Product/Product';
import { Units } from '../../Units/Units';

export default interface CreateStockDTO {
  units: Units;
  product: Product;
}
