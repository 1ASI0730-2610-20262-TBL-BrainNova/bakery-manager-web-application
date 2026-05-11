import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly API_URL = 'https://6a01e5cc36fb6ad04de1f2b1.mockapi.io/api/v1/inventory';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.API_URL, item);
  }
}
