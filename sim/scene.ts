/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object3d.ts'/>

namespace pxsim {
    export abstract class GenericScene extends Object3d<THREE.Scene> {
        private _physicsworld: PhysicsWorld = new PhysicsWorld();

        private _ambientlight: AmbientLight = new AmbientLight();

        public get physicsWorld(): PhysicsWorld {
            return this._physicsworld;
        }

        public get ambientLight(): AmbientLight {
            return this._ambientlight;
        }

        constructor(id?: rt.ObjId) {
            super(new THREE.Scene(), id);

            this.reference.background = new THREE.Color(Palette.lightgray);
            this.add(this._ambientlight);
        }

        public setBackgroundColor(color: Color)  {
            if (!color) {
                return;
            }

            this.reference.background = color;
        }

        public setAmbientLight(color: Color)  {
            if (!color) {
                return;
            }

            this.ambientLight.reference.color = color;
        }

        public add(object3d: GenericObject3d, position?: Vector) {
            if (!object3d) {
                return;
            }

            if (position) {
                object3d.setPosition(position);
            }

            this.reference.add(object3d.reference);
            object3d.onAdded(this);
        }

        public remove(object3d: GenericObject3d) {
            if (!object3d) {
                return;
            }

            object3d.onRemoved(this);
            this.reference.remove(object3d.reference);
        }

        public animate(timeStep: number) {
            super.animate(timeStep);

            this._physicsworld.animate(timeStep);

            WorldBoard.events.queue(ScopeId.Scene, EventId.Animate, timeStep);
        }

        protected _onDispose() {
            this._physicsworld.dispose();

            super._onDispose();
        }
    }

    export class Scene extends GenericScene {
    }
}

namespace pxsim.scene {
    export function onAnimate(handler: RefAction) {
        WorldBoard.events.listen(ScopeId.Scene, EventId.Animate, handler);
    }
}
