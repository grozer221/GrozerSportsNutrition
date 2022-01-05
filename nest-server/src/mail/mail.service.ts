import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '../users/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class MailService {
	origin: string;

	constructor(
		private mailerService: MailerService,
		@Inject(REQUEST) private readonly request: Request,
	) {
		// @ts-ignore
		const rawHeaders: string[] = this.request.req.rawHeaders;
		// @ts-ignore
		this.origin = this.request.req.protocol + '://' + rawHeaders[rawHeaders.indexOf('Host') + 1];
	}

	async sendConfirmationEmail(user: User, token: string) {
		const url = `${this.origin}/confirmEmail/${token}`;
		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Welcome to Grozer Sports Nutrition! Confirm your Email',
			template: 'confirmationEmail',
			context: {
				name: `${user.firstName} ${user.lastName}`,
				url: url,
			},
		});

	}
}
