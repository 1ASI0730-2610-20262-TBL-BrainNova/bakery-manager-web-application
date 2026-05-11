import { Component, OnInit } from '@angular/core'; // Unificamos los imports de core
import { CommonModule } from '@angular/common';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';
import { InventoryItem } from '../../../domain/model/inventory-item';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../../infrastructure/inventory.services';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    InventoryItemForm,
    InventoryItemList,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement implements OnInit {
  inventoryItems: InventoryItem[] = [];
  isFormVisible = false;

  constructor(private inventoryService: InventoryService) {}

  /**
   * When the component starts, we retrieve the data from the cloud.
   */
  ngOnInit(): void {
    this.loadInventory();
  }

  /**
   * Call the service to get the list of supplies.
   */
  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.inventoryItems = items;
        console.log('Inventario cargado:', items);
      },
      error: (err) => console.error('Error cargando el inventario:', err),
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addItem(item: Omit<InventoryItem, 'id'>): void {
    this.inventoryService.createItem(item).subscribe({
      next: () => {
        this.loadInventory();
        this.isFormVisible = false;
      },
      error: (err) => alert('No se pudo registrar en la nube, bb. Revisa el endpoint.'),
    });
  }
}
