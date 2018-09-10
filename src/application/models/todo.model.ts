import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@Exclude()
export class TodoModel {
    private _id: number;
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name should be a string" })
    @MinLength(1, {
        message: "Name is too short"
    })
    @MaxLength(50, {
        message: "Name is too long"
    })
    private _name: string;
    @IsNotEmpty({ message: "Completed is required" })
    @IsBoolean({ message: "Completed should be boolean" })
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
