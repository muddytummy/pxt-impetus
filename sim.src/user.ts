/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as PxtCloudClient from 'pxt-cloud-client';

import { cloudAPI, worldBoard } from './_board';
import {
    CloudEvent_Internal,
    ScopeId,
} from './_events';

export class User implements PxtCloudClient.UserData {
    private static _singleton = new User(true /* is self */);

    public name: string = 'Anonymous';

    public static get singleton(): User {
        return this._singleton;
    }

    constructor(protected _isSelf = false) { }

    public async setName(name_: string) {
        if (!this._isSelf) {
            return;
        }

        const cldapi = cloudAPI();

        if (cldapi) {
            await cldapi.users.addSelf({ name: name_ });
            this.name = name_;
        }
    }
}

namespace pxsimImpetus.user {
    export function currentUser(): User {
        return User.singleton;
    }

    export async function messageEveryone(message: string) {
        const cldapi = cloudAPI();

        if (cldapi) {
            await cldapi.chat.newMessage(message);
        }
    }

    export function onNewMessage(handler: pxsim.RefAction) {
        worldBoard().events!.listen(ScopeId.CloudObject, CloudEvent_Internal.NewMessage, handler);
    }
}
