export class Role {
    id?: number;
    label: string;

    constructor(params: any) {
        Object.assign(this, params);
    }
}