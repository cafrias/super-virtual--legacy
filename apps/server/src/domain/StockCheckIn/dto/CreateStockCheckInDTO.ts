import CreateStockMovementDTO from '../../StockMovement/dto/CreateStockMovementDTO';
import { StockCheckInReason } from '../StockCheckInReason';

export default interface CreateStockCheckInDTO extends CreateStockMovementDTO {
  reason: StockCheckInReason;
}
