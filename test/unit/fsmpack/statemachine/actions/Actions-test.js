import { allActionsArray as Actionsjs_allActionsArray } from "../../../../../src/goo/fsmpack/statemachine/actions/Actions";

describe('Actions', function () {
	it('Every action has a key', function () {
		var allActions = Actionsjs_allActionsArray();
		for (var i=0; i<allActions.length; i++) {
			expect(allActions[i]).toBeTruthy();
		}
	});
});
