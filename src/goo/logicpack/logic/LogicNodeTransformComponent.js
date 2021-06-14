var mod_LogicNodeTransformComponent = LogicNodeTransformComponent;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3 } from "../../math/Matrix3";

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
function LogicNodeTransformComponent() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeTransformComponent.logicInterface;
	this.type = 'TransformComponent';
}

LogicNodeTransformComponent.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeTransformComponent.editorName = 'TransformComponent';

LogicNodeTransformComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef; //
};

LogicNodeTransformComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayer_LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	var transformComponent = entity.transformComponent;

	if (portID === LogicNodeTransformComponent.inportPos) {
		transformComponent.setTranslation(value);
	} else if (portID === LogicNodeTransformComponent.inportRot) {
		transformComponent.setRotation(value[0], value[1], value[2]);
	} else if (portID === LogicNodeTransformComponent.inportScale) {
		transformComponent.setScale(value);
	}
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeTransformComponent.outportPos, entity.transformComponent.transform.translation.clone());
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeTransformComponent.outportRot, entity.transformComponent.transform.rotation.clone());
};

LogicNodeTransformComponent.logicInterface = new LogicInterface_LogicInterface('Transform');
LogicNodeTransformComponent.inportPos = LogicNodeTransformComponent.logicInterface.addInputProperty('position', 'Vector3', new Vector3_Vector3(0, 0, 0));
LogicNodeTransformComponent.inportRot = LogicNodeTransformComponent.logicInterface.addInputProperty('rotation', 'Vector3', new Vector3_Vector3(0, 0, 0));
LogicNodeTransformComponent.inportScale = LogicNodeTransformComponent.logicInterface.addInputProperty('scale', 'Vector3', new Vector3_Vector3(1, 1, 1));
LogicNodeTransformComponent.outportPos = LogicNodeTransformComponent.logicInterface.addOutputProperty('outpos', 'Vector3', new Vector3_Vector3());
LogicNodeTransformComponent.outportRot = LogicNodeTransformComponent.logicInterface.addOutputProperty('rotmat', 'Matrix3', new Matrix3_Matrix3());
LogicNodeTransformComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});


LogicNodes_LogicNodes.registerType('TransformComponent', LogicNodeTransformComponent);

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
export { mod_LogicNodeTransformComponent as LogicNodeTransformComponent };