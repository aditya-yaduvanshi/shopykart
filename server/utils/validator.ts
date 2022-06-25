import { UserRole } from "../models";

export class Validator {
	static isEmail(email: string) {
		let mail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return mail.test(String(email).toLowerCase());
	}

	static isPassword(password: string) {
		let word =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
		return word.test(password);
	}

	static isUrl(url: string){
		let link = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return link.test(String(url).toLowerCase());
	}

	static isUserRole(role: UserRole){
		return Object.values(UserRole).includes(role);
	}
}
