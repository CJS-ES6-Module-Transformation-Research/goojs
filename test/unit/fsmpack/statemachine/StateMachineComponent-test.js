"use strict";

var _Machine = require("../../../../src/goo/fsmpack/statemachine/Machine");

var _State = require("../../../../src/goo/fsmpack/statemachine/State");

var _StateMachineComponent = require("../../../../src/goo/fsmpack/statemachine/StateMachineComponent");

describe('StateMachineComponent', function () {
		var stateMachineComponent;
		beforeEach(function () {
				stateMachineComponent = new _StateMachineComponent.StateMachineComponent();
		});

		it('can run enter on initialisation on all machines', function () {
				var gotData1 = 0,
				    gotData2 = 0;

				// set up machine 1
				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				stateMachineComponent.addMachine(machine1);

				var state1 = new _State.State('entry');
				machine1.addState(state1);

				state1.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData1 += 123;
						},
						exit: function exit() {},
						update: function update() {}
				});

				// set up machine 2
				var machine2 = new _Machine.Machine();
				machine2.asyncMode = true;
				stateMachineComponent.addMachine(machine2);

				var state2 = new _State.State('entry');
				machine2.addState(state2);

				state2.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData2 += 234;
						},
						exit: function exit() {},
						update: function update() {}
				});

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				expect(gotData1).toBe(123);
				expect(gotData2).toBe(234);
		});

		it('can run enter on initialisation only on the initial state', function () {
				var gotData1 = 0,
				    gotData2 = 0;

				// set up machine 1
				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;

				var state1 = new _State.State('first');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData1 += 123;
						},
						exit: function exit() {},
						update: function update() {}
				});

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData2 += 234;
						},
						exit: function exit() {},
						update: function update() {}
				});

				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				expect(gotData1).toBe(123);
				expect(gotData2).toBe(0);
		});

		it('can run update', function () {
				var gotData1 = 0,
				    gotData2 = 0;

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {},
						update: function update() {
								gotData1 += 123;
						}
				});

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);

				// set up machine 2
				var state2 = new _State.State('entry');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {},
						update: function update() {
								gotData2 += 234;
						}
				});
				var machine2 = new _Machine.Machine();
				machine2.asyncMode = true;
				machine2.addState(state2);

				stateMachineComponent.addMachine(machine1);
				stateMachineComponent.addMachine(machine2);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// do update
				stateMachineComponent.update();

				expect(gotData1).toBe(123);
				expect(gotData2).toBe(234);
		});

		it('can transition on the same level', function () {
				var gotData1 = 0,
				    gotData2 = 0,
				    gotData3 = 0;

				// set up machine 1
				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;

				var state1 = new _State.State('entry');
				machine1.addState(state1);
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData1 += 123;
						},
						update: function update(proxy) {
								proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');

				var state2 = new _State.State('second');
				machine1.addState(state2);
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData2 += 234;
						},
						exit: function exit() {},
						update: function update() {
								gotData3 += 345;
						}
				});

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData1).toBe(123);
				expect(gotData2).toBe(234);
				expect(gotData3).toBe(345);
		});

		it('can transition down', function () {
				var gotData1 = 0,
				    gotData2 = 0,
				    gotData3 = 0,
				    gotData4 = 0,
				    gotData5 = 0;

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData1 += 123;
						},
						update: function update(proxy) {
								proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData2 += 234;
						},
						exit: function exit() {},
						update: function update() {
								gotData3 += 345;
						}
				});

				var state21 = new _State.State('third');
				state21.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData4 += 456;
						},
						exit: function exit() {},
						update: function update() {
								gotData5 += 567;
						}
				});

				var machine11 = new _Machine.Machine();
				machine11.asyncMode = true;
				machine11.addState(state21);

				state2.addMachine(machine11);

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData1).toBe(123);
				expect(gotData2).toBe(234);
				expect(gotData3).toBe(345);
				expect(gotData4).toBe(456);
				expect(gotData5).toBe(567);
		});

		it('can transition up', function () {
				var gotData1 = 0,
				    gotData2 = 0,
				    gotData3 = 0,
				    gotData4 = 0;

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData1 += 123;
						},
						exit: function exit() {},
						update: function update(proxy) {
								proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData2 += 234;
						},
						update: function update() {}
				});

				var state21 = new _State.State('third');
				state21.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData3 += 345;
						},
						exit: function exit() {
								gotData4 += 456;
						},
						update: function update(proxy) {
								proxy.send('toEntry');
						}
				});
				state21.setTransition('toEntry', 'entry');

				var machine11 = new _Machine.Machine();
				machine11.asyncMode = true;
				machine11.addState(state21);

				state2.addMachine(machine11);

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData1).toBe(123 * 2);
				expect(gotData2).toBe(234);
				expect(gotData3).toBe(345);
				expect(gotData4).toBe(456);
		});

		it('cancels execution of update on transition', function () {
				var gotData = [0, 0, 0, 0, 0, 0];

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[0] += 123;
						},
						update: function update() {
								gotData[1] += 234;
						}
				});
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[2] += 345;
						},
						update: function update(proxy) {
								gotData[3] += 456;proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[4] += 567;
						},
						update: function update() {
								gotData[5] += 678;
						}
				});

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {},
						update: function update() {}
				});

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData[0]).toBe(123);
				expect(gotData[1]).toBe(234);
				expect(gotData[2]).toBe(345);
				expect(gotData[3]).toBe(456);
				expect(gotData[4]).toBe(567);
				expect(gotData[5]).toBe(0);
		});

		it('can transition down 2 levels', function () {
				var gotData = [0, 0, 0, 0, 0, 0, 0];

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[0] += 123;
						},
						update: function update(proxy) {
								proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData[1] += 234;
						},
						exit: function exit() {},
						update: function update() {
								gotData[2] += 345;
						}
				});
				// {
				var state21 = new _State.State('third');
				state21.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData[3] += 456;
						},
						exit: function exit() {},
						update: function update() {
								gotData[4] += 567;
						}
				});
				// {
				var state211 = new _State.State('fourth');
				state211.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData[5] += 678;
						},
						exit: function exit() {},
						update: function update() {
								gotData[6] += 789;
						}
				});

				var machine111 = new _Machine.Machine();
				machine111.asyncMode = true;
				machine111.addState(state211);
				state21.addMachine(machine111);

				var machine11 = new _Machine.Machine();
				machine11.asyncMode = true;
				machine11.addState(state21);
				state2.addMachine(machine11);

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData[0]).toBe(123);
				expect(gotData[1]).toBe(234);
				expect(gotData[2]).toBe(345);
				expect(gotData[3]).toBe(456);
				expect(gotData[4]).toBe(567);
				expect(gotData[5]).toBe(678);
				expect(gotData[6]).toBe(789);
		});

		it('can transition up 2 levels', function () {
				var gotData = [0, 0, 0, 0, 0, 0, 0];

				// set up machine 1
				var state1 = new _State.State('entry');
				state1.addAction({
						ready: function ready() {},
						enter: function enter() {
								gotData[0] += 123;
						},
						exit: function exit() {
								gotData[1] += 234;
						},
						update: function update(proxy) {
								proxy.send('toSecond');
						}
				});
				state1.setTransition('toSecond', 'second');

				var state2 = new _State.State('second');
				state2.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[2] += 345;
						},
						update: function update() {
								gotData[3] += 456;
						}
				});
				// {
				var state21 = new _State.State('third');
				state21.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[4] += 567;
						},
						update: function update() {
								gotData[5] += 678;
						}
				});
				// {
				var state211 = new _State.State('fourth');
				state211.addAction({
						ready: function ready() {},
						enter: function enter() {},
						exit: function exit() {
								gotData[6] += 789;
						},
						update: function update(proxy) {
								proxy.send('toEntry');
						}
				});
				state211.setTransition('toEntry', 'entry');

				var machine111 = new _Machine.Machine();
				machine111.asyncMode = true;
				machine111.addState(state211);
				state21.addMachine(machine111);

				var machine11 = new _Machine.Machine();
				machine11.asyncMode = true;
				machine11.addState(state21);
				state2.addMachine(machine11);

				var machine1 = new _Machine.Machine();
				machine1.asyncMode = true;
				machine1.addState(state1);
				machine1.addState(state2);

				stateMachineComponent.addMachine(machine1);

				// init
				stateMachineComponent.init();
				stateMachineComponent.doEnter();

				// jump to second state
				stateMachineComponent.update();

				// second state update
				stateMachineComponent.update();

				expect(gotData[0]).toBe(123 * 2);
				expect(gotData[1]).toBe(234);
				expect(gotData[2]).toBe(345);
				expect(gotData[3]).toBe(456);
				expect(gotData[4]).toBe(567);
				expect(gotData[5]).toBe(678);
				expect(gotData[6]).toBe(789);
		});
});
