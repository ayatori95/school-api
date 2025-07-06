import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use uma chave secreta do .env
    });
  }

  // O Passport injeta o payload decodificado do JWT aqui
  async validate(payload: any) {
    // O payload é o que definimos no service: { sub: user.id, email: user.email, role: user.role }
    // O objeto retornado aqui será anexado ao objeto `request`
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}