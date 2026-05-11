import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { InventoryItem } from '../../../domain/model/inventory-item';

/**
 * InventoryItemList is a standalone Angular component responsible for displaying
 * a tabular view of all inventory items in the bakery's inventory management system.
 *
 * Component Features:
 * - Displays inventory items in a Material Data Table with sortable columns
 * - Shows four key pieces of information: name, quantity, unit, and stock status
 * - Provides visual indicators for low stock items using chips
 * - Responsive design that adapts to different screen sizes
 * - Read-only display component (viewing only, no editing capabilities at this level)
 *
 * Inputs:
 * - `dataSource`: An array of InventoryItem objects to be displayed in the table.
 *   This input is bound from the parent InventoryManagement component.
 *
 * Visual Indicators:
 * - The 'status' column uses color-coded chips to indicate stock levels:
 *   - Green: Adequate stock (quantity > minStock)
 *   - Red/Warning: Low stock (quantity <= minStock)
 *
 * Methods:
 * - `isLowStock()`: Utility method to determine if an item's quantity has fallen
 *   below the minimum stock threshold, triggering special UI treatment.
 *
 * Future Enhancements:
 * - Modify button for editing items
 * - Delete button with confirmation dialog
 * - Sort and filter capabilities
 * - Pagination for large datasets
 */
@Component({
  selector: 'app-inventory-item-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, TranslateModule],
  templateUrl: './inventory-item-list.html',
  styleUrl: './inventory-item-list.css',
})
export class InventoryItemList {
  @Input() dataSource: InventoryItem[] = [];

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'status'];

  /**
   * Determines if an item's current quantity has dropped below or equals the minimum stock level.
   *
   * @param item - The inventory item to check
   * @returns {boolean} True if the item's quantity is less than or equal to minStock, false otherwise
   *
   * Logic:
   * - This method is used to visually highlight items that need immediate replenishment
   * - Triggered when item.quantity <= item.minStock
   */
  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= item.minStock;
  }
}
