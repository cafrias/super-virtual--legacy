import CreateUserDTO from '../../User/dto/CreateUser.dto';

export default interface CreateCustomerDTO extends CreateUserDTO {
  address?: string;
}
