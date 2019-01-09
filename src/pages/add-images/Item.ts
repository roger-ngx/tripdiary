
export class Item{
    private description: string;
    private image_url: string;

    constructor(image_url: string, des : string){
        this.image_url = image_url;
        this.description = des;
    }

    get ImageUrl(){
        return this.image_url;
    }

    get Description(){
        return this.description;
    }
}


export class Items{
    id: string;
    name: string;
    items: Item[];

    constructor(id: string, name: string, items: Item[]){
        this.id = id;
        this.name = name;
        this.items = items;
    }
}