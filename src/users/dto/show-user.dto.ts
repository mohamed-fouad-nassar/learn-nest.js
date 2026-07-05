import { Expose } from 'class-transformer';

export class ShowUserDto {
  @Expose()
  id!: string;

  @Expose()
  email!: string;
}
