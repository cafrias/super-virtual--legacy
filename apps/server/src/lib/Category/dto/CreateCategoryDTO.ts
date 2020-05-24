import CreateGroupDTO from '../../Group/dto/CreateGroupDTO';
import { Category } from '../Category';

export default interface CreateCategoryDTO extends CreateGroupDTO {
  parent?: Category;
}
