/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2014 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a spring, connecting two bodies.
*
* @class Phaser.Physics.P2.Spring
* @classdesc Physics Spring Constructor
* @constructor
* @param {Phaser.Physics.P2} world - A reference to the P2 World.
* @param {p2.Body} bodyA - First connected body.
* @param {p2.Body} bodyB - Second connected body.
* @param {number} [restLength=1] - Rest length of the spring. A number > 0.
* @param {number} [stiffness=100] - Stiffness of the spring. A number >= 0.
* @param {number} [damping=1] - Damping of the spring. A number >= 0.
* @param {Array} [worldA] - Where to hook the spring to body A, in world coordinates, i.e. [32, 32].
* @param {Array} [worldB] - Where to hook the spring to body B, in world coordinates, i.e. [32, 32].
* @param {Array} [localA] - Where to hook the spring to body A, in local body coordinates.
* @param {Array} [localB] - Where to hook the spring to body B, in local body coordinates.
*/
Phaser.Physics.P2.Spring = function (world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property {Phaser.Physics.P2.World} world - Local reference to P2 World.
    */
    this.world = world;

    if (typeof restLength === 'undefined') { restLength = 1; }
    if (typeof stiffness === 'undefined') { stiffness = 100; }
    if (typeof damping === 'undefined') { damping = 1; }

    var options = {
        restLength: restLength,
        stiffness: stiffness,
        damping: damping
    };

    if (typeof worldA !== 'undefined' && worldA !== null)
    {
        options.worldAnchorA = [ world.pxm(worldA[0]), world.pxm(worldA[1]) ];
    }

    if (typeof worldB !== 'undefined' && worldB !== null)
    {
        options.worldAnchorB = [ world.pxm(worldB[0]), world.pxm(worldB[1]) ];
    }

    if (typeof localA !== 'undefined' && localA !== null)
    {
        options.localAnchorA = [ world.pxm(localA[0]), world.pxm(localA[1]) ];
    }

    if (typeof localB !== 'undefined' && localB !== null)
    {
        options.localAnchorB = [ world.pxm(localB[0]), world.pxm(localB[1]) ];
    }

    p2.Spring.call(this, bodyA, bodyB, options);

}

Phaser.Physics.P2.Spring.prototype = Object.create(p2.Spring.prototype);
Phaser.Physics.P2.Spring.prototype.constructor = Phaser.Physics.P2.Spring;
