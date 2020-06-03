/**
 * Date: 6/3/20
 * Time: 11:02 PM
 * @license MIT (see project's LICENSE file)
 */

import axios from "axios";
import {HttpRequest, HttpResponse} from "../../../types";
import {CommandBase} from "../../base";

/**
 * Makes an HTTP request and returns the response
 */
export class CommandHttpRequest<T = any> extends CommandBase<HttpResponse<T>> {
	public readonly request: HttpRequest;

	/**
	 * Construction
	 */
	constructor({id, request, traceId}: {
		id?: string,
		request: HttpRequest,
		traceId?: string
	}) {
		super({id, traceId});
		this.request = request;
	}

	/********************
	 * Public interface
	 ********************/
	/**
	 * Fundamental data that describes this object. To be included with logging and
	 * as error details.  Should not include recursive references.
	 * @immutable
	 */
	get metadata(): object {
		return Object.assign(super.metadata, {
			request: this.request
		});
	}


	async execute(): Promise<HttpResponse<T>> {
		return axios(this.request);
	}
}
