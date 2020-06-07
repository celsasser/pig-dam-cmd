/**
 * Date: 6/3/20
 * Time: 11:02 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {
	HttpHeadersType,
	HttpMethod,
	HttpParamsType, HttpProgressHandler,
	HttpRequest,
	HttpResponseType
} from "../../../types";


export const DEFAULTS = {
	responseType: HttpResponseType.JSON,
	timeout: undefined
};

/**
 * Creates an HTTP GET request configuration
 */
export function createHttpGetRequest({headers, params, onDownloadProgress, url,
	responseType = DEFAULTS.responseType,
	timeout = DEFAULTS.timeout
}: {
	headers?: HttpHeadersType,
	onDownloadProgress?: HttpProgressHandler,
	params?: HttpParamsType,
	responseType?: HttpResponseType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		headers,
		method: HttpMethod.GET,
		onDownloadProgress,
		params,
		responseType,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}

/**
 * Creates an HTTP DELETE request configuration
 */
export function createHttpDeleteRequest({headers, params, url,
	responseType = DEFAULTS.responseType,
	timeout = DEFAULTS.timeout
}: {
	headers?: HttpHeadersType,
	params?: HttpParamsType,
	responseType?: HttpResponseType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		headers,
		method: HttpMethod.DELETE,
		params,
		responseType,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}

/**
 * Creates an HTTP HEAD request configuration
 */
export function createHttpHeadRequest({headers, params, url,
	timeout = DEFAULTS.timeout
}: {
	headers?: HttpHeadersType,
	params?: HttpParamsType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		headers,
		method: HttpMethod.HEAD,
		params,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}

/**
 * Creates an HTTP OPTIONS request configuration
 */
export function createHttpOptionsRequest({headers, params, url,
	timeout = DEFAULTS.timeout
}: {
	headers?: HttpHeadersType,
	params?: HttpParamsType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		headers,
		method: HttpMethod.OPTIONS,
		params,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}

/**
 * Creates an HTTP POST request configuration
 */
export function createHttpPostRequest({data, headers, onDownloadProgress, onUploadProgress, params, url,
	responseType = DEFAULTS.responseType,
	timeout = DEFAULTS.timeout
}: {
	data?: any,
	headers?: HttpHeadersType,
	onDownloadProgress?: HttpProgressHandler,
	onUploadProgress?: HttpProgressHandler,
	params?: HttpParamsType,
	responseType?: HttpResponseType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		data,
		headers,
		method: HttpMethod.POST,
		onDownloadProgress,
		onUploadProgress,
		params,
		responseType,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}

/**
 * Creates an HTTP PUT request configuration
 */
export function createHttpPutRequest({data, headers, onDownloadProgress, onUploadProgress, params, url,
	responseType = DEFAULTS.responseType,
	timeout = DEFAULTS.timeout
}: {
	data?: any,
	headers?: HttpHeadersType,
	onDownloadProgress?: HttpProgressHandler,
	onUploadProgress?: HttpProgressHandler,
	params?: HttpParamsType,
	responseType?: HttpResponseType,
	timeout?: number,
	url: string
}): HttpRequest {
	return _.omitBy<HttpRequest>({
		data,
		headers,
		method: HttpMethod.PUT,
		onDownloadProgress,
		onUploadProgress,
		params,
		responseType,
		timeout,
		url
	}, _.isUndefined) as HttpRequest;
}
