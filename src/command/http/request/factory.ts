/**
 * Date: 6/3/20
 * Time: 11:02 PM
 * @license MIT (see project's LICENSE file)
 */
import {
	HttpHeadersType,
	HttpMethod,
	HttpParamsType,
	HttpRequest,
	HttpResponseType
} from "../../../types";


/**
 * Creates an HTTP GET request configuration
 */
export function createHttpGetRequest({headers, params, responseType, timeout, url}: {
	headers?: HttpHeadersType,
	params?: HttpParamsType,
	responseType?: HttpResponseType,
	timeout?: number,
	url: string
}): HttpRequest {
	return {
		headers,
		method: HttpMethod.GET,
		params,
		responseType,
		timeout,
		url
	};
}
