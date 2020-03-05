import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../math/Matrix3";
var LogicNodeTransformComponent_outportRot;
var LogicNodeTransformComponent_outportPos;
var LogicNodeTransformComponent_inportScale;
var LogicNodeTransformComponent_inportRot;
var LogicNodeTransformComponent_inportPos;
var LogicNodeTransformComponent_editorName;
var LogicNodeTransformComponent_logicInterface;
function LogicNodeTransformComponent() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeTransformComponent_logicInterface = LogicNodeTransformComponent_logicInterface;;
	this.type = 'TransformComponent';
}

LogicNodeTransformComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeTransformComponent_editorName = "TransformComponent";;

LogicNodeTransformComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef; //
};

LogicNodeTransformComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var transformComponent = entity.transformComponent;

	if (portID === LogicNodeTransformComponent_inportPos) {
		transformComponent.setTranslation(value);
	} else if (portID === LogicNodeTransformComponent_inportRot) {
		transformComponent.setRotation(value[0], value[1], value[2]);
	} else if (portID === LogicNodeTransformComponent_inportScale) {
		transformComponent.setScale(value);
	}
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeTransformComponent_outportPos, entity.transformComponent.transform.translation.clone());
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeTransformComponent_outportRot, entity.transformComponent.transform.rotation.clone());
};

LogicNodeTransformComponent_logicInterface = new LogicInterface_LogicInterfacejs('Transform');
LogicNodeTransformComponent_inportPos = LogicNodeTransformComponent_logicInterface.addInputProperty("position", "Vector3", new Vector3_Vector3js(0, 0, 0));;
LogicNodeTransformComponent_inportRot = LogicNodeTransformComponent_logicInterface.addInputProperty("rotation", "Vector3", new Vector3_Vector3js(0, 0, 0));;
LogicNodeTransformComponent_inportScale = LogicNodeTransformComponent_logicInterface.addInputProperty("scale", "Vector3", new Vector3_Vector3js(1, 1, 1));;
LogicNodeTransformComponent_outportPos = LogicNodeTransformComponent_logicInterface.addOutputProperty("outpos", "Vector3", new Vector3_Vector3js());;
LogicNodeTransformComponent_outportRot = LogicNodeTransformComponent_logicInterface.addOutputProperty("rotmat", "Matrix3", new Matrix3_Matrix3js());;
LogicNodeTransformComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});


LogicNodes_LogicNodesjs.registerType('TransformComponent', LogicNodeTransformComponent);

var exported_LogicNodeTransformComponent = LogicNodeTransformComponent;

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
export { exported_LogicNodeTransformComponent as LogicNodeTransformComponent };