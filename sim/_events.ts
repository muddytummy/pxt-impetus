/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../shared/enums.ts"/>

namespace pxsim {
    export const enum ScopeId {
        WorldObject = 0,

        SceneObject = 100,

        KeyboardDevice = 200,

        MouseDevice = 300,

        MouseDeviceButton = 400,

        MouseDeviceButton_Main = MouseDeviceButton + MouseButton.Main,
        MouseDeviceButton_Auxiliary= MouseDeviceButton + MouseButton.Auxiliary,
        MouseDeviceButton_Secondary = MouseDeviceButton + MouseButton.Secondary,
        MouseDeviceButton_Fourth = MouseDeviceButton + MouseButton.Fourth,
        MouseDeviceButton_Fifth = MouseDeviceButton + MouseButton.Fifth,
    }

    export type EventId = number;

    export const enum SceneEvent_Internal {
        Animate,
    }

    export const enum MouseEvent_Internal {
        Enter,
        Move,
        Leave,
    }

    export abstract class EventValue {
        public abstract toActionArgs(): any[];
    }

    export class EventCoordValue extends EventValue {
        constructor(public x: number, public y: number) {
            super();
        }

        public toActionArgs(): any[] {
            return [this.x, this.y];
        }
    }

    export class EventKeyValue extends EventValue {
        constructor(public key: KeyboardKey) {
            super();
        }

        public toActionArgs(): any[] {
            return [this.key];
        }
    }

    export class WorldEventBus extends EventBusGeneric<EventValue | string | number> {
        constructor(runtime: Runtime) {
            super(runtime, value => value ? (typeof value === 'object' ? value.toActionArgs() : [value]) : []);
        }
    }
}
