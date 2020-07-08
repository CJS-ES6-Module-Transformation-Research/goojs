var LogicNodeTransformComponent_LogicNodeTransformComponent = LogicNodeTransformComponent;

import {
    writeValue as LogicLayerjs_writeValue,
    resolveEntityRef as LogicLayerjs_resolveEntityRef,
} from "./LogicLayer";

import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../math/Matrix3";
function LogicNodeTransformComponent() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeTransformComponent.logicInterface;
	this.type = 'TransformComponent';
}

LogicNodeTransformComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeTransformComponent.editorName = 'TransformComponent';

LogicNodeTransformComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef; //
};

LogicNodeTransformComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayerjs_resolveEntityRef(instDesc, this.entityRef);
	var transformComponent = entity.transformComponent;

	if (portID === LogicNodeTransformComponent.inportPos) {
		transformComponent.setTranslation(value);
	} else if (portID === LogicNodeTransformComponent.inportRot) {
		transformComponent.setRotation(value[0], value[1], value[2]);
	} else if (portID === LogicNodeTransformComponent.inportScale) {
		transformComponent.setScale(value);
	}
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeTransformComponent.outportPos, entity.transformComponent.transform.translation.clone());
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeTransformComponent.outportRot, entity.transformComponent.transform.rotation.clone());
};

LogicNodeTransformComponent.logicInterface = new LogicInterface_LogicInterfacejs('Transform');
LogicNodeTransformComponent.inportPos = LogicNodeTransformComponent.logicInterface.addInputProperty('position', 'Vector3', new mathVector3_Vector3js(0, 0, 0));
LogicNodeTransformComponent.inportRot = LogicNodeTransformComponent.logicInterface.addInputProperty('rotation', 'Vector3', new mathVector3_Vector3js(0, 0, 0));
LogicNodeTransformComponent.inportScale = LogicNodeTransformComponent.logicInterface.addInputProperty('scale', 'Vector3', new mathVector3_Vector3js(1, 1, 1));
LogicNodeTransformComponent.outportPos = LogicNodeTransformComponent.logicInterface.addOutputProperty('outpos', 'Vector3', new mathVector3_Vector3js());
LogicNodeTransformComponent.outportRot = LogicNodeTransformComponent.logicInterface.addOutputProperty('rotmat', 'Matrix3', new mathMatrix3_Matrix3js());
LogicNodeTransformComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});


LogicNodesjs_registerType('TransformComponent', LogicNodeTransformComponent);

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
export { LogicNodeTransformComponent_LogicNodeTransformComponent as LogicNodeTransformComponent };