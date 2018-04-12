// @flow
import { Container } from 'unstated';
import consecutive from 'consecutive';

export type StoreState = {
    uuid: string | number,
};

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

class ItemContainer extends Container<StoreState> {
    state = {
        uuid: nextUuid(),
    };
}

export default ItemContainer;
