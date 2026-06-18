import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
