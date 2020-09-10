import { NzFormControlStatusType } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

export class Registry<T> {

    private registries: { [key: string]: T } = {};

    constructor(private defaultRegistry: T) { }

    register(key: string, obj: T): void {
        this.registries[key] = obj;
    }

    unregister(key: string): void {
        this.registries[key] = null;
    }

    get(key: string): T {
        return this.registries[key] || this.defaultRegistry;
    }
}

export interface Message {

    status: NzFormControlStatusType;
    text: string | Observable<string>;
}

export interface InputOption<T> {
    value: T;
    label: string;
}

export function createInputOption<T>(label: string, value: T): InputOption<T> {
    return { label, value };
}

export type NzValidateStatus = 'success' | 'warning' | 'validating' | 'error';
