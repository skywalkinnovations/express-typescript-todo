export class TodoModel {
    private _id: number;
    private _name: string;
    private _completed: boolean;

    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    public get completed(): boolean {
        return this._completed;
    }
    public set completed(v: boolean) {
        this._completed = v;
    }

}
