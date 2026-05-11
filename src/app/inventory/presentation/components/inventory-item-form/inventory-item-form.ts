import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { InventoryItem } from '../../../domain/model/inventory-item.model';

@Component({
  selector: 'app-inventory-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './inventory-item-form.html',
  styleUrl: './inventory-item-form.css',
})
export class InventoryItemForm {
  @Output() itemAdded = new EventEmitter<Omit<InventoryItem, 'id'>>();

  inventoryForm: FormGroup;
  unitOptions = ['kg', 'litres', 'unidades', 'gramos'];

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      minStock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formValue = this.inventoryForm.value;

      const newItem: Omit<InventoryItem, 'id'> = {
        ...formValue,
        lastUpdated: new Date(),
      };

      this.itemAdded.emit(newItem);
      this.inventoryForm.reset({ unit: 'kg', quantity: 0, minStock: 0 });
    }
  }
}
