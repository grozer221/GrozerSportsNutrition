import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
import { join } from 'path';

config();

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: process.env.MAIL_HOST,
					port: parseInt(process.env.MAIL_PORT),
					secure: false,
					auth: {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASSWORD,
					},
				},
				defaults: {
					from: `${process.env.MAIL_FROM}>`,
				},
				template: {
					dir: join(__dirname, '../src/mail/templates/'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	providers: [
		MailService,
	],
	exports: [
		MailService,
	],
})
export class MailModule {
}
