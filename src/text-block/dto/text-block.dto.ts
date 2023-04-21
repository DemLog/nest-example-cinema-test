import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateTextBlockDto } from "./create-text-block.dto";
import { IsOptional } from "class-validator";

export class TextBlockDto extends OmitType(CreateTextBlockDto, ["image"] as const) {
  @ApiProperty({ description: "Изображение" })
  @IsOptional()
  image: string;
}