'use strict';

describe('Actions', function () {
	it('Every action has a key', function () {
		var allActions = srcgoofsmpackstatemachineactionsActions_Actionsjs.allActionsArray();
		for (var i = 0; i < allActions.length; i++) {
			expect(allActions[i]).toBeTruthy();
		}
	});
});