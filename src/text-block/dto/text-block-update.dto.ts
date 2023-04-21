import { PartialType } from "@nestjs/swagger";
import { TextBlockDto } from "./text-block.dto";

export class TextBlockUpdateDto extends PartialType(TextBlockDto) {}