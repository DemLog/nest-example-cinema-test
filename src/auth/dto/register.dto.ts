import { IntersectionType } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";

export class RegisterDto extends IntersectionType(
  LoginDto,
  CreateProfileDto
) {}