import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { InventoryItem } from '../../domain/model/inventory-item.model';
import { Observable } from 'rxjs';

/**
 * Service for interacting with the inventory API.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService extends BaseApi {
  /**
   * Base path for inventory API resources.
   * @private
   */
  private readonly resourcePath = 'http://localhost:8080/api/v1/inventory';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Retrieves all inventory items.
   * @returns Observable of InventoryItem[]
   */
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.resourcePath);
  }

  /**
   *  Creates a new inventory item.
   * @param item
   */
  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.resourcePath, item);
  }

  /**
   *  Updates an existing inventory item.
   * @param id
   * @param item
   */
  updateItem(id: number, item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.http.patch<InventoryItem>(`${this.resourcePath}/${id}`, item);
  }
}
