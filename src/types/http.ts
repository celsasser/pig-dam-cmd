/**
 * Date: 6/3/20
 * Time: 11:04 PM
 * @license MIT (see project's LICENSE file)
 */


export enum HttpMethod {
	DELETE = "DELETE",
	GET = "GET",
	HEAD = "HEAD",
	LINK = "LINK",
	OPTIONS = "OPTIONS",
	PATCH = "PATCH",
	POST = "POST",
	PUT = "PUT",
	UNLINK = "UNLINK"
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
 * Describes a request.
 */
export interface HttpRequest {
	data?: any;
	headers?: HttpHeadersType;
	method: HttpMethod;
	params?: HttpParamsType;
	responseType?: HttpResponseType,
	timeout?: number;
	url: string;

	onUploadProgress?: (event: ProgressEvent) => void;
	onDownloadProgress?: (event: ProgressEvent) => void;
}

export interface HttpResponse<T = any> {
	data: T;
	status: number;
	statusText: string;
	headers: any;
}
