// _model/category.ts

export class Category {
    category_id: number;
    category: string;
    tag: string;
    status: boolean;
  
    constructor(category_id: number, category: string, tag: string, status: boolean) {
      this.category_id = category_id;
      this.category = category;
      this.tag = tag;
      this.status = status;
    }
  }
  