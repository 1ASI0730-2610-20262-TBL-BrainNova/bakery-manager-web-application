import { Component } from '@angular/core';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';
import { InventoryItem } from '../../../domain/model/inventory-item';

/**
 * InventoryManagement is a standalone Angular component that orchestrates
 * the inventory management system for BakeryManager.
 *
 * Component Responsibilities:
 * - Serves as a container for inventory-related components and views
 * - Manages the communication between the InventoryItemForm and InventoryItemList components
 * - Maintains the state of inventory items in memory
 * - Handles the creation of new inventory items through form submission
 *
 * Component Structure:
 * - Left section: Contains the InventoryItemForm for adding new items
 * - Right section: Contains the InventoryItemList displaying all items
 *
 * Future Enhancements:
 * - Integration with backend API for persistence
 * - Search and filter functionality
 * - Edit and delete operations for existing items
 * - Real-time synchronization with server
 */
@Component({
  selector: 'app-inventory-management-management',
  standalone: true,
  imports: [InventoryItemForm, InventoryItemList],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement {
  /**
   * Array to store all inventory items currently managed by the system.
   * This will be populated from user input via the form component.
   */
  inventoryItems: InventoryItem[] = [];

  constructor() {}
}
