import BrandModel, { Brand } from './Brand';
import CreateBrandDTO from './dto/CreateBrandDTO';

export default class BrandService {
  static async createBrand(input: CreateBrandDTO): Promise<Brand> {
    const newBrand = new BrandModel(input);
    await newBrand.validate();
    return newBrand;
  }
}
