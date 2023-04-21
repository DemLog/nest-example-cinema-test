import { TokenDto } from "./token.dto";
import { IntersectionType } from "@nestjs/swagger";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";

export class RegisterResponseDto extends IntersectionType(
  CreateProfileDto,
  TokenDto
) {}