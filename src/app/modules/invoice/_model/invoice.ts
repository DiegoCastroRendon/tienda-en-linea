/* REQUERIMIENTO 5. Implementar modelo Invoice */

import { Item } from "./item";

export class Invoice {
    constructor(
        public invoice_id: number = 0,
        public created_at: Date = new Date(),
        public items: Item[] = [],
        public rfc: string = '',
        public subtotal: number = 0,
        public taxes: number = 0,
        public total: number = 0
    ) {}
}