/**
 * Date: 6/5/20
 * Time: 9:49 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {HttpResponse} from "../../../../src/types";

/**
 * Finds the response body in the specified stub
 */
export function findResponseBody(method: string, path: string): any {
	const api = require("../beetle-api.json");
	const stub = _.find(api.stubs, stub => (stub.route.path === path)
		&& (stub.route.method === method || _.includes(stub.route.method, method)));
	return stub.actions[1].response.body;
}

/**
 * Logs the response (from which we pick and choose what we want to see)
 */
export function logResponse(message: string, response: HttpResponse): void {
	console.log(`${message}:`, _.pick(response, [
		"data",
		"status",
		"statusText",
		"headers"
	]));
}

