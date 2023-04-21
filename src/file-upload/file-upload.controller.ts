import { Controller, Delete } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { UnusedFilesRemoveDto } from "./dto/unused-files-remove.dto";

@ApiBearerAuth()
@ApiTags("Сохранение файлов")
@Controller('file-upload')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService
  ) {}

  // Удаление неиспользуемых файлов
  @ApiOperation({ summary: "Удалить неиспользуемые файлы, созданные не менее 1 часа назад" })
  @ApiNoContentResponse({ description: "Файлы были удалены.", type: UnusedFilesRemoveDto })
  @Roles('admin')
  @Delete('unused-files')
  async deleteUnusedFiles() {
    // Вызываем метод сервиса для удаления неиспользуемых файлов
    return await this.fileUploadService.deleteUnusedFiles();
  }
}
