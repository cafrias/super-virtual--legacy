import { Stock } from '../../Stock/Stock';

export default interface CreateStockMovementDTO {
  absoluteAmount: number;
  stock: Stock;
}
