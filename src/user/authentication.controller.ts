
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';

import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthService } from 'src/auth/auth.service';
import { AccountFloidWidgetDto } from './dto/floid-widget.dto';

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
    @Post('callbackurl')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Auth Floid user' })
    @ApiCreatedResponse({})
    async authFloidWidget(@Body() authFloid: AccountFloidWidgetDto) {
        try {

            // Llama al método del servicio y pasa el DTO como argumento
            await this.authService.createAccountFloidWidget(authFloid);

            // Si el método del servicio se ejecuta correctamente, retorna un mensaje de éxito
            return { success: true, message: 'Autenticación exitosa' };
        } catch (error) {
            // Manejo de errores
            console.error('Error en la autenticación Floid:', error);
            throw error;
        }
    }


    @Post('send-code')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'A private route for send verification code', })
    async sendCode(@Body('phoneNumber') phoneNumber: string): Promise<string> {
        console.log(phoneNumber)
        const code = '123456'; // Aquí deberías generar un código aleatorio o de alguna manera
        await this.authService.sendVerificationCode(phoneNumber, code);
        return 'Código de verificación enviado.';
    }


}
