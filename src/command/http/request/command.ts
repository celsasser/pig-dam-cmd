/**
 * Date: 6/3/20
 * Time: 11:02 PM
 * @license MIT (see project's LICENSE file)
 */

import * as assert from "assert";
import axios from "axios";
import {HttpRequest, HttpResponse, HttpResponseType} from "../../../types";
import {CommandBase} from "../../base";

/**
 * Makes an HTTP request and returns the response
 */
export class CommandHttpRequest<T = any> extends CommandBase<HttpResponse<T>> {
	public readonly request: HttpRequest;
	/**
	 * What do we want to do when we receive error statuses?
	 * Unknown errors will always be thrown
	 */
	public readonly throwOnErrorStatus: boolean;

	/**
	 * Construction
	 */
	constructor({
		id, request, traceId,
		throwOnErrorStatus = true
	}: {
		id?: string,
		request: HttpRequest,
		throwOnErrorStatus?: boolean,
		traceId?: string
	}) {
		super({id, traceId});
		this.request = request;
		this.throwOnErrorStatus = throwOnErrorStatus;
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


	/********************
	 * Protected Interface
	 ********************/
	protected async _execute(): Promise<HttpResponse<T>> {
		try {
			return await axios(this.request) as HttpResponse<T>;
		} catch(error) {
			if(this.throwOnErrorStatus) {
				throw error;
			} else if("response" in error) {
				return error.response;
			} else {
				// not really much we can here
				throw error;
			}
		}
	}
}

/**
 * Makes a HTTP request and returns the response with a readable stream as the data property
 */
export class CommandHttpStreamRequest extends CommandHttpRequest<ReadableStream> {
	/**
	 * Construction
	 */
	constructor({id, request, traceId}: {
		id?: string,
		request: HttpRequest,
		traceId?: string
	}) {
		assert.strictEqual(request.responseType, HttpResponseType.STREAM);
		super({id, request, traceId});
	}
}
