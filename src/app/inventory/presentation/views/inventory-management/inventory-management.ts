import { Component } from '@angular/core';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';

@Component({
  selector: 'app-inventory-management-management',
  standalone: true,
  imports: [InventoryItemForm, InventoryItemList],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement {
  /**
   * This variable will store the data that travels from the form to the list.
   * For now, we'll leave it empty to proceed step by step.
   */
  inventoryItems: any[] = [];

  constructor() {}
}
