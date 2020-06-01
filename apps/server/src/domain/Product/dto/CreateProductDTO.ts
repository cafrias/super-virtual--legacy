import { Brand } from '../../Brand/Brand';
import { Units } from '../../Units/Units';
import { StockCheckInReason } from '../../StockCheckIn/StockCheckInReason';

export default interface CreateProductDTO {
  picture: string;
  name: string;
  brand: Brand;
  measurementUnits: Units;
  amount: number;
  creationReason: StockCheckInReason;
}
