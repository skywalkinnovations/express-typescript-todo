import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TodoModel {
    private _id: number;
    private _name: string;
    private _completed: boolean;

    @Expose()
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    @Expose()
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
    @Expose()
    public get completed(): boolean {
        return this._completed;
    }
    public set completed(v: boolean) {
        this._completed = v;
    }

}
