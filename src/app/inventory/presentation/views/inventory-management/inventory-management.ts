import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';
import { InventoryItem } from '../../../domain/model/inventory-item';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * InventoryManagement is a standalone Angular component that orchestrates
 * the inventory management system for BakeryManager.
 *
 * Component Responsibilities:
 * - Serves as a container for inventory-related components and views
 * - Manages the communication between the InventoryItemForm and InventoryItemList components
 * - Maintains the state of inventory items in memory
 * - Handles the creation of new inventory items through form submission
 * - Provides toggle functionality for the form visibility
 *
 * Component Structure:
 * - Header with translated title
 * - FAB button to toggle form visibility
 * - Conditional form section: Contains the InventoryItemForm for adding new items
 * - List section: Contains the InventoryItemList displaying all items
 *
 * Future Enhancements:
 * - Integration with backend API for persistence
 * - Search and filter functionality
 * - Edit and delete operations for existing items
 * - Real-time synchronization with server
 */
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
export class InventoryManagement {
  /**
   * Array to store all inventory items currently managed by the system.
   * This will be populated from user input via the form component.
   */
  inventoryItems: InventoryItem[] = [];

  /**
   * Controls the visibility of the inventory item form.
   * When true, the form is displayed; when false, it's hidden.
   */
  isFormVisible = false;

  /**
   * Toggles the visibility of the inventory item form.
   * This method is called when the FAB button is clicked.
   */
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  /**
   * Adds a new inventory item to the collection.
   * This method is called when the InventoryItemForm emits an itemAdded event.
   *
   * @param item - The new inventory item to add (without id, as it will be assigned)
   */
  addItem(item: Omit<InventoryItem, 'id'>): void {
   const newItem: InventoryItem = {
      ...item,
      id: Date.now(),    };

    this.inventoryItems = [...this.inventoryItems, newItem];
  }
}
