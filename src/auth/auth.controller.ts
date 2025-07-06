import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  // --- Endpoint de Login ---
  @UseGuards(AuthGuard('local')) // Usa a LocalStrategy para validar
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // Se chegou aqui, o usuário foi validado pela LocalStrategy.
    // O objeto 'user' foi anexado ao 'req'.
    return this.authService.login(req.user);
  }

  // --- Endpoint de Perfil (para Alunos e Professores) ---
  // Este é um exemplo de rota protegida.
  @UseGuards(JwtAuthGuard) // Protege a rota com a JwtStrategy
  @Get('profile')
  getProfile(@Request() req) {
    // Graças ao JwtStrategy, o 'req.user' contém o payload do token.
    // Agora podemos buscar os dados completos do usuário.
    return this.usersService.findOne(req.user.userId);
  }
}