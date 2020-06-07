/**
 * Date: 6/3/20
 * Time: 11:04 PM
 * @license MIT (see project's LICENSE file)
 */


export enum HttpMethod {
	DELETE = "DELETE",
	GET = "GET",
	HEAD = "HEAD",
	OPTIONS = "OPTIONS",
	POST = "POST",
	PUT = "PUT"
}

export enum HttpResponseType {
	ARRAYBUFFER = "arraybuffer",
	BLOB = "blob",
	DOCUMENT = "document",
	JSON = "json",
	STREAM = "stream",
	TEXT = "text"
}

/**
 * Description of a set of HTTP headers
 */
export type HttpHeadersType = {
	[key: string]: string
};

/**
 * URL Params that will be serialized at request time
 */
export type HttpParamsType = {
	[key: string]: string
};

/**
 * So your mom won't wait up watching the late late show not knowing where you are.
 */
export type HttpProgressHandler = (event: ProgressEvent) => void;

/**
 * Describes a request.
 */
export interface HttpRequest {
	data?: any;
	headers?: HttpHeadersType;
	method: HttpMethod;
	params?: HttpParamsType;
	responseType?: HttpResponseType;
	timeout?: number;
	url: string;

	onDownloadProgress?: HttpProgressHandler;
	onUploadProgress?: HttpProgressHandler;
}

export interface HttpResponse<T = any> {
	data: T;
	request: HttpRequest;
	status: number;
	statusText: string;
	headers: any;
}
