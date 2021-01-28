export class Township {
    inseeCode: string;
    name: string;
    population: number;

    constructor(params: any) {
        Object.assign(this, params);
    }
}