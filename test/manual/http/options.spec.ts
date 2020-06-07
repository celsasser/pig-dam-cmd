/**
 * Date: 6/5/20
 * Time: 11:22 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRequest, createHttpOptionsRequest} from "../../../src/command";
import {logResponse} from "./support";

describe("http.OPTIONS", function() {
	it("we just want to make sure options is supported. test is nonsense otherwise", async function() {
		const request = createHttpOptionsRequest({
			url: "http://localhost:9000/reflect"
		});
		const command = new CommandHttpRequest({request});
		const result = await command.execute();
		logResponse(`OPTIONS success`, result);
		expect(result.request.method).toEqual("OPTIONS");
		expect(result.status).toEqual(200);
	});
});
