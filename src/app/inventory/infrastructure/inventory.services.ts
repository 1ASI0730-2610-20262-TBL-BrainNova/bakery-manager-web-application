import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private readonly URL_DIRECTA = 'https://6a0b015f21e4456256970d96.mockapi.io/api/v1/inventory';

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.URL_DIRECTA);
  }

  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.URL_DIRECTA, item);
  }
}
