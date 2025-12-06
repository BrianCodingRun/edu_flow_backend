import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/generated/prisma/client';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard) // Toutes les routes nécessitent une authentification
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Seuls les ADMIN peuvent voir tous les utilisateurs
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN) // Seuls les ADMIN peuvent supprimer
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
