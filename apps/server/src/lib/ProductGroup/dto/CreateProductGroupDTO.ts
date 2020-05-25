import CreateGroupDTO from '../../Group/dto/CreateGroupDTO';
import { Category } from '../../Category/Category';

export default interface CreateProductGroupDTO extends CreateGroupDTO {
  parent?: Category;
}
