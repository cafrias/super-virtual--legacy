import { Product } from '../../Product/Product';
import { StockMovement } from '../../StockMovement/StockMovement';
import { Units } from '../../Units/Units';

export default interface CreateStockDTO {
  movements: StockMovement[];
  units: Units;
  product: Product;
}
