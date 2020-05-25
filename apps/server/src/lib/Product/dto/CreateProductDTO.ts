import { Brand } from '../../Brand/Brand';

export default interface CreateProductDTO {
  picture: string;
  name: string;
  brand: Brand;
}
