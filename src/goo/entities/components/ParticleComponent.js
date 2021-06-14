"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleComponent = undefined;

var _Component = require("../../entities/components/Component");

var _Particle = require("../../particles/Particle");

var _ParticleEmitter = require("../../particles/ParticleEmitter");

var _MeshData = require("../../renderer/MeshData");

var mod_ParticleComponent = ParticleComponent;

/**
 * Creates and modifies {@link MeshData} to simulate particle effects.<br /><br />ParticleComponents may have one or
 * more emitters. Each emitter spawns particles, controlling spawn rate, lifetime, initial velocity vector and
 * position of each particle. Each Particle System also contains a timeline describing changes each particle should
 * perform over its lifetime, including:
 * <ul>
 * <li>Size of particle</li>
 * <li>Color of particle</li>
 * <li>Orientation of particle (rotation on screen plane)</li>
 * <li>Texture coords used.</li>
 * <li>Other user defined params.</li>
 * </ul><br />
 * External influences can exert on particles via a defined callback function system.<br /><br />
 * Particles billboard toward the screen using a provided Camera as reference.
 * @param {Object} [settings]
 * @param {Array} [settings.emitters] Array of emitter settings
 * @param {Array} [settings.timeline]
 * @param {number} [settings.uRange=1]
 * @param {number} [settings.vRange=1]
 * @param {number} [settings.particleCount=100]
 * @extends Component
 */
function ParticleComponent(settings) {
  _Component.Component.apply(this, arguments);

  this.type = 'ParticleComponent';

  _Component.Component.call(this);

  settings = settings || {};

  this.emitters = [];
  if (settings.emitters) {
    for (var i = 0, max = settings.emitters.length; i < max; i++) {
      this.emitters.push(new _ParticleEmitter.ParticleEmitter(settings.emitters[i]));
    }
  }

  this.timeline = settings.timeline ? settings.timeline : [];

  this.uRange = isNaN(settings.uRange) ? 1 : settings.uRange;
  this.vRange = isNaN(settings.vRange) ? 1 : settings.vRange;

  var particleCount = isNaN(settings.particleCount) ? 100 : settings.particleCount;
  this.recreateParticles(particleCount);

  this.enabled = true;

  // @ifdef DEBUG
  Object.seal(this);
  // @endif
}

ParticleComponent.type = 'ParticleComponent';

ParticleComponent.prototype = Object.create(_Component.Component.prototype);
ParticleComponent.prototype.constructor = ParticleComponent;

ParticleComponent.prototype.generateMeshData = function () {
  var attributeMap = _MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION, _MeshData.MeshData.COLOR, _MeshData.MeshData.TEXCOORD0]);
  this.meshData = new _MeshData.MeshData(attributeMap, this.particleCount * 4, this.particleCount * 6);
  this.meshData.vertexData.setDataUsage('DynamicDraw');

  // setup texture coords
  var uvBuffer = this.meshData.getAttributeBuffer(_MeshData.MeshData.TEXCOORD0);
  var indexBuffer = this.meshData.getIndexBuffer();
  for (var i = 0, max = this.particleCount; i < max; i++) {
    uvBuffer.set([1.0, 0.0], i * 8 + 0);
    uvBuffer.set([1.0, 1.0], i * 8 + 2);
    uvBuffer.set([0.0, 1.0], i * 8 + 4);
    uvBuffer.set([0.0, 0.0], i * 8 + 6);

    indexBuffer.set([i * 4 + 0, i * 4 + 3, i * 4 + 1, i * 4 + 1, i * 4 + 3, i * 4 + 2], i * 6);
  }
};

ParticleComponent.prototype.recreateParticles = function (particleCount) {
  this.particleCount = particleCount;
  this.particles = [];
  for (var i = 0; i < this.particleCount; i++) {
    this.particles[i] = new _Particle.Particle(this, i);
  }
  this.generateMeshData();
};

/**
 * Creates and modifies {@link MeshData} to simulate particle effects.<br /><br />ParticleComponents may have one or
 * more emitters. Each emitter spawns particles, controlling spawn rate, lifetime, initial velocity vector and
 * position of each particle. Each Particle System also contains a timeline describing changes each particle should
 * perform over its lifetime, including:
 * <ul>
 * <li>Size of particle</li>
 * <li>Color of particle</li>
 * <li>Orientation of particle (rotation on screen plane)</li>
 * <li>Texture coords used.</li>
 * <li>Other user defined params.</li>
 * </ul><br />
 * External influences can exert on particles via a defined callback function system.<br /><br />
 * Particles billboard toward the screen using a provided Camera as reference.
 * @param {Object} [settings]
 * @param {Array} [settings.emitters] Array of emitter settings
 * @param {Array} [settings.timeline]
 * @param {number} [settings.uRange=1]
 * @param {number} [settings.vRange=1]
 * @param {number} [settings.particleCount=100]
 * @extends Component
 */
exports.ParticleComponent = mod_ParticleComponent;