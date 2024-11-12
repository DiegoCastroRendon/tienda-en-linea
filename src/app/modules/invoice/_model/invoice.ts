/* REQUERIMIENTO 5. Implementar modelo Invoice */
import { Item } from "./item";

export class Invoice{
    // YOUR CODE GOES HERE!
    invoice_id: number = 0;
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
    created_at: Date = new Date();
    items: Item[] = [];
}