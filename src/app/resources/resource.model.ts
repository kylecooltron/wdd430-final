import { Tag } from "../tags/tag.model";


export class Resource {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public url: string,
        public tags: Tag[] | null,
    ) { }
}
