import { Vector3 } from "../math/Vector3";
var functionObject_applyTimeline;
var functionObject_applyEntityTransformVector;
var functionObject_applyEntityTransformPoint;
var functionObject_createConstantForce;
var functionObject_randomPointInCube;
var functionObject_getRandomVelocityOffY;

/**
 * Various helper utils for particle systems.
 */
function ParticleUtils() {}

functionObject_getRandomVelocityOffY = function(store, minOffsetAngle, maxOffsetAngle, scale, particleEntity) {
    var randomAngle = minOffsetAngle + Math.random() * (maxOffsetAngle - minOffsetAngle);
    var randomDir = Math.PI * 2 * Math.random();

    store.x = Math.cos(randomDir) * Math.sin(randomAngle);
    store.y = Math.cos(randomAngle);
    store.z = Math.sin(randomDir) * Math.sin(randomAngle);

    if (particleEntity) {
        functionObject_applyEntityTransformVector(store, particleEntity);
    }

    store.scale(scale);
    return store;
};

functionObject_randomPointInCube = function(store, xRadius, yRadius, zRadius, center) {
    store.x = Math.random() * 2 * xRadius - xRadius + ((center ? center.x : 0));
    store.y = Math.random() * 2 * yRadius - yRadius + ((center ? center.y : 0));
    store.z = Math.random() * 2 * zRadius - zRadius + ((center ? center.z : 0));
    return store;
};

functionObject_createConstantForce = function(force) {
    var applyForce = new Vector3(force);
    return {
        enabled: true,

        /* Was: function (particleEntity, emitter) */
        prepare: function() {},

        /* Was: function (tpf, particle, particleIndex) */
        apply: function(tpf, particle) {
            particle.velocity.x += applyForce.x * tpf;
            particle.velocity.y += applyForce.y * tpf;
            particle.velocity.z += applyForce.z * tpf;
        }
    };
};

functionObject_applyEntityTransformPoint = function(vec3, entity) {
    if (!entity.transformComponent || !entity.transformComponent.worldTransform) {
        return vec3;
    }

    return entity.transformComponent.sync().worldTransform.applyForward(vec3, vec3);
};

functionObject_applyEntityTransformVector = function(vec3, entity) {
    if (!entity.transformComponent || !entity.transformComponent.worldTransform) {
        return vec3;
    }

    return entity.transformComponent.sync().worldTransform.applyForwardVector(vec3, vec3);
};

functionObject_applyTimeline = function(particle, timeline) {
    var age = particle.age, lifeSpan = particle.lifeSpan;
    var prevCAge = 0, prevMAge = 0, prevSiAge = 0, prevSpAge = 0;
    var nextCAge = lifeSpan, nextMAge = lifeSpan, nextSiAge = lifeSpan, nextSpAge = lifeSpan;
    var trAge = 0, ratio;
    var prevCEntry = null, prevMEntry = null, prevSiEntry = null, prevSpEntry = null, prevUVEntry = null;
    var nextCEntry = null, nextMEntry = null, nextSiEntry = null, nextSpEntry = null;

    for (var i = 0, max = timeline.length; i < max; i++) {
        var entry = timeline[i];
        trAge += ((entry.timeOffset ? entry.timeOffset : 0)) * lifeSpan;
        // Color
        if (nextCEntry === null && entry.color !== undefined) {
            if (trAge > age) {
                nextCAge = trAge;
                nextCEntry = entry;
            } else {
                prevCAge = trAge;
                prevCEntry = entry;
            }
        }

        // mass
        if (nextMEntry === null && entry.mass !== undefined) {
            if (trAge > age) {
                nextMAge = trAge;
                nextMEntry = entry;
            } else {
                prevMAge = trAge;
                prevMEntry = entry;
            }
        }

        // uvIndex
        if (trAge <= age && entry.uvIndex !== undefined) {
            prevUVEntry = entry;
        }

        // size
        if (nextSiEntry === null && entry.size !== undefined) {
            if (trAge > age) {
                nextSiAge = trAge;
                nextSiEntry = entry;
            } else {
                prevSiAge = trAge;
                prevSiEntry = entry;
            }
        }

        // spin
        if (nextSpEntry === null && entry.spin !== undefined) {
            if (trAge > age) {
                nextSpAge = trAge;
                nextSpEntry = entry;
            } else {
                prevSpAge = trAge;
                prevSpEntry = entry;
            }
        }
    }

    // color
    ratio = (age - prevCAge) / (nextCAge - prevCAge);
    var start = (prevCEntry !== null ? prevCEntry.color : [1, 1, 1, 1]);
    var end = (nextCEntry !== null ? nextCEntry.color : start);
    particle.color.x = (1 - ratio) * start[0] + ratio * end[0];
    particle.color.y = (1 - ratio) * start[1] + ratio * end[1];
    particle.color.z = (1 - ratio) * start[2] + ratio * end[2];
    particle.color.w = (1 - ratio) * start[3] + ratio * end[3];

    // mass
    ratio = (age - prevMAge) / (nextMAge - prevMAge);
    var start = (prevMEntry !== null ? prevMEntry.mass : 1);
    var end = (nextMEntry !== null ? nextMEntry.mass : start);
    particle.mass = (1 - ratio) * start + ratio * end;

    // uvIndex
    particle.uvIndex = (prevUVEntry !== null ? prevUVEntry.uvIndex : 0);

    // Size
    ratio = (age - prevSiAge) / (nextSiAge - prevSiAge);
    var start = (prevSiEntry !== null ? prevSiEntry.size : 1);
    var end = (nextSiEntry !== null ? nextSiEntry.size : start);
    particle.size = (1 - ratio) * start + ratio * end;

    // Spin
    ratio = (age - prevSpAge) / (nextSpAge - prevSpAge);
    var start = (prevSpEntry !== null ? prevSpEntry.spin : 0);
    var end = (nextSpEntry !== null ? nextSpEntry.spin : start);
    particle.spin = (1 - ratio) * start + ratio * end;
};

export { functionObject_applyEntityTransformPoint as applyEntityTransformPoint, functionObject_applyEntityTransformVector as applyEntityTransformVector, functionObject_applyTimeline as applyTimeline };