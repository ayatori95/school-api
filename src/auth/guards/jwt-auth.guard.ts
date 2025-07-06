import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Este guarda simplesmente verifica se um token JWT válido foi enviado.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
