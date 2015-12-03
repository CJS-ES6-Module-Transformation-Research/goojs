goo.Box2DComponent=function(t,o){"use strict";function e(e){t.apply(this,arguments),this.type="Box2DComponent",this.body=null,this.world=null,this.mass=1,o.copyOptions(this,e,{shape:"box",width:1,height:1,radius:1,vertices:[0,1,2,2,0,2],movable:!0,friction:1,restitution:0,offsetX:0,offsetY:0})}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}(goo.Component,goo.ObjectUtil),goo.Box2DSystem=function(t){"use strict";function o(){t.call(this,"Box2DSystem",["Box2DComponent","MeshDataComponent"]),this.SCALE=.5,this.world=new Box2D.b2World(new Box2D.b2Vec2(0,-9.81)),this.sortVertexesClockWise=function(t,o){var e=Math.atan2(t.get_y(),t.get_x()),n=Math.atan2(o.get_y(),o.get_x());return e>n?1:-1},this.velocityIterations=8,this.positionIterations=3;var o=4;this.createPolygonShape=function(t){for(var e=new Box2D.b2PolygonShape,n=Box2D.allocate(t.length*o*2,"float",Box2D.ALLOC_STACK),r=0,s=0;s<t.length;s++)Box2D.setValue(n+r,t[s].get_x(),"float"),Box2D.setValue(n+(r+o),t[s].get_y(),"float"),r+=2*o;var i=Box2D.wrapPointer(n,Box2D.b2Vec2);return e.Set(i,t.length),e}}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.inserted=function(t){var o=t.box2DComponent,e=0,n=0,r=new Box2D.b2PolygonShape;if("box"===o.shape)r.SetAsBox(o.width*this.SCALE,o.height*this.SCALE);else if("circle"===o.shape)r=new Box2D.b2CircleShape,r.set_m_radius(o.radius);else if("mesh"===o.shape){for(var s=t.meshDataComponent.meshData,i=s.getAttributeBuffer("POSITION"),a=0,p=[],h=1/0,l=-(1/0),f=1/0,c=-(1/0);a<=i.length-3;){var y=i[a],m=i[++a];h>m&&(h=m),m>l&&(l=m),f>y&&(f=y),y>c&&(c=y),++a,t.transformComponent.updateWorldTransform();var d=new Box2D.b2Vec2(y,m);p.push(d)}r=this.createPolygonShape(p),e=l-h,n=c-f}else if("polygon"===o.shape){for(var p=[],a=0;a<=o.vertices.length-2;){var d=new Box2D.b2Vec2(o.vertices[a],o.vertices[++a]);p.push(d),++a}r=this.createPolygonShape(p)}var x=new Box2D.b2FixtureDef;x.set_shape(r),x.set_density(1),x.set_friction(o.friction),x.set_restitution(o.restitution);var u=new Box2D.b2BodyDef;o.movable===!0&&u.set_type(Box2D.b2_dynamicBody),u.set_position(new Box2D.b2Vec2(t.transformComponent.transform.translation.x+o.offsetX,t.transformComponent.transform.translation.y+o.offsetY));var g=t.transformComponent.transform.rotation.toAngles();u.set_angle(g.z);var D=this.world.CreateBody(u);D.CreateFixture(x),D.SetLinearDamping(.95),D.SetAngularDamping(.6),o.body=D,o.world=this.world,t.body=D,t.body.h=e,t.body.w=n},o.prototype.deleted=function(t){this.world.DestroyBody(t.body)},o.prototype.process=function(t,o){this.world.Step(o,this.velocityIterations,this.positionIterations);for(var e=0;e<t.length;e++){var n=t[e],r=n.transformComponent,s=r.transform,i=n.body.GetPosition(),a=i.get_x(),p=i.get_y();-10>p?n.removeFromWorld():(s.translation.x=a-n.box2DComponent.offsetX,s.translation.y=p-n.box2DComponent.offsetY,r.setRotation(0,0,n.body.GetAngle()),r.setUpdated())}},o}(goo.System),"function"==typeof require&&(define("goo/addons/box2dpack/components/Box2DComponent",[],function(){return goo.Box2DComponent}),define("goo/addons/box2dpack/systems/Box2DSystem",[],function(){return goo.Box2DSystem}));