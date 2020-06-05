/**
 * Date: 6/5/20
 * Time: 11:22 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRequest, createHttpHeadRequest} from "../../../src/command";
import {logResponse} from "./support";

describe("http.HEAD", function() {
	it("we just want to make sure options is supported. test is nonsense otherwise", async function() {
		const request = createHttpHeadRequest({
			url: "http://localhost:9000/reflect"
		});
		const command = new CommandHttpRequest({request});
		const result = await command.execute();
		logResponse(`HEAD success`, result);
		expect(result.request.method).toEqual("HEAD");
		expect(result.status).toEqual(200);
	});
});
