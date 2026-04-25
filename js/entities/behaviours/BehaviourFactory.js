import {SeekBehaviour} from "./SeekBehaviour.js";
import {DriftBehaviour} from "./DriftBehaviour.js";

export class BehaviourFactory {
    static create(behaviours) {
        return behaviours.map(behaviour => {
            switch (behaviour) {
                case 'drift':
                    return new DriftBehaviour();
                case 'seek':
                    return new SeekBehaviour();
                default:
                    console.log(`Unknown behaviourType: ${behaviour}`);
                    return new SeekBehaviour();
            }
        });
    }
}