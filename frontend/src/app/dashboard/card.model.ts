import { Type } from "@angular/core";
import { Widget } from "./widget.model";

export class Card {
    constructor(public title: string,
                public cols: number, 
                public rows: number,
                public position: number, 
                public widget: Widget,
                public id: string) {}
}