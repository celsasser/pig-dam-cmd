/**
 * Date: 6/4/20
 * Time: 11:22 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	CommandHttpRequest,
	createHttpPostRequest,
	createHttpPutRequest
} from "../../../src/command";
import {HttpMethod} from "../../../src/types";
import {findResponseBody, logResponse} from "./support";

[
	HttpMethod.POST,
	HttpMethod.PUT
].forEach(function(method) {
	describe(`http.${method}`, function() {
		/**
		 * Creates an instance of a command and returns it and the expected result
		 */
		function createCommand(path: string, throwOnErrorStatus: boolean = false): {
			command: CommandHttpRequest,
			expected: any
		} {
			const request = (method === HttpMethod.POST)
				? createHttpPostRequest({url: `http://localhost:9000${path}`})
				: createHttpPutRequest({url: `http://localhost:9000${path}`});
			return {
				command: new CommandHttpRequest({request, throwOnErrorStatus}),
				expected: findResponseBody(method.toLowerCase(), path)
			};
		}

		it(`should successfully ${method} JSON success`, async function() {
			const {command, expected} = createCommand("/shelter/update/success");
			const result = await command.execute();
			logResponse(`${method} JSON success`, result);
			expect(result.request.method).toEqual(method);
			expect(result.status).toEqual(200);
			expect(result.data).toEqual(expected);

		});

		it(`should successfully ${method} JSON failure`, async function() {
			const {command, expected} = createCommand("/shelter/update/failure");
			const result = await command.execute();
			logResponse(`${method} JSON failure`, result);
			expect(result.status).toEqual(500);
			expect(result.data).toEqual(expected);
		});
	});
});
