import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly API_URL = 'https://6a0b015f21e4456256970d96.mockapi.io/api/v1/InventoryItem ';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los insumos desde MockAPI
   */
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  /**
   * Crea un nuevo insumo y lo sube a la nube de MockAPI
   */
  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.API_URL, item);
  }
}
