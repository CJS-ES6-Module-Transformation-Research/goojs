Object.defineProperty(exports, "__esModule", {
  value: true
});
var LogicInterface__portID;
var LogicInterface_assignPortDataName;
var LogicInterface_makePortDataName;
var LogicInterface_makeDynamicId;
var LogicInterface_isDynamicPortName;
var LogicInterface_createDynamicOutput;
var LogicInterface_createDynamicInput;
function LogicInterface(name) {
  this.ports = [];
  this.configOpts = [];

  // Name builds the data name prefix
  if (name === undefined) {
    this.dn_pfx = '';
  } else {
    this.dn_pfx = name + '-';
  }
}

LogicInterface.prototype.addInputProperty = function (name_, valueType, defaultValue) {
  this.ports.push({
    id: ++LogicInterface__portID,
    input: true,
    property: true,
    event: false,
    name: this.dn_pfx + name_,
    type: valueType,
    def: defaultValue
  });
  return LogicInterface__portID;
};

LogicInterface.prototype.addOutputProperty = function (name_, valueType) {
  this.ports.push({
    id: ++LogicInterface__portID,
    input: false,
    property: true,
    event: false,
    name: this.dn_pfx + name_,
    type: valueType
  });
  return LogicInterface__portID;
};

LogicInterface.prototype.addInputEvent = function (name_) {
  this.ports.push({
    id: ++LogicInterface__portID,
    input: true,
    property: false,
    event: true,
    name: this.dn_pfx + name_
  });
  return LogicInterface__portID;
};

LogicInterface.prototype.addOutputEvent = function (name_) {
  this.ports.push({
    id: ++LogicInterface__portID,
    input: false,
    property: false,
    event: true,
    name: this.dn_pfx + name_
  });
  return LogicInterface__portID;
};

exports.createDynamicInput = LogicInterface_createDynamicInput = function LogicInterface_createDynamicInput(name_) {
  return {
    id: LogicInterface_makeDynamicId(),
    input: true,
    property: true,
    event: true,
    dynamic: true,
    name: name_
  };
};;

exports.createDynamicOutput = LogicInterface_createDynamicOutput = function LogicInterface_createDynamicOutput(name_) {
  return {
    id: LogicInterface_makeDynamicId(),
    input: false,
    property: true,
    event: true,
    dynamic: true,
    name: name_
  };
};;

/*
 * The config entry here is an object containing all the parameters that go into the automatically
 * generated goo-property-edit when editing the schematics
 */
LogicInterface.prototype.addConfigEntry = function (conf) {
  this.configOpts.push(conf);
};

LogicInterface.prototype.getConfigEntries = function () {
  return this.configOpts;
};

LogicInterface.prototype.getPorts = function () {
  return this.ports;
};

exports.isDynamicPortName = LogicInterface_isDynamicPortName = function LogicInterface_isDynamicPortName(name) {
  return name[0] === "$";
};;

LogicInterface_makeDynamicId = function LogicInterface_makeDynamicId() {
  return ++LogicInterface__portID;
};;

/**
 * Computes a name for the port that can be saved in the data model without having it confused when (other) ports are added/removed
 * @param port Port description object as returned by createDynamicInput/Output or from the getPorts() array.
 */
exports.makePortDataName = LogicInterface_makePortDataName = function LogicInterface_makePortDataName(port) {
  if (port.dataname !== undefined) {
    return port.dataname;
  } else {
    var prefix = port.input ? "in-" : "out-";
    if (port.property) {
      prefix += "prop-";
    }
    if (port.event) {
      prefix += "event-";
    }

    // tag dynamic ports with $ at the start so they can be routed
    // properly.
    var dyn = port.dynamic === true ? "$" : "";
    return dyn + prefix + port.name;
  }
};;

LogicInterface_assignPortDataName = function LogicInterface_assignPortDataName(port, dataname) {
  port.dataname = dataname;
};;

/**
 * Globally unique port id counter
 */
LogicInterface__portID = 0;;

exports.createDynamicInput = LogicInterface_createDynamicInput;
exports.createDynamicOutput = LogicInterface_createDynamicOutput;
exports.isDynamicPortName = LogicInterface_isDynamicPortName;
exports.makePortDataName = LogicInterface_makePortDataName;

var exported_LogicInterface = LogicInterface;

/**
 * @private
 * Describes all the inputs / outputs for this logic interface. Typically one instance of this class exists for every class that
 *        implements logic.
 */
exports.LogicInterface = exported_LogicInterface;
