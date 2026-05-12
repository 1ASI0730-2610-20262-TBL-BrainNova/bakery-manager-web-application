import { Component } from '@angular/core';
import { TopSummary } from '../../components/top-summary/top-summary';

@Component({
  selector: 'app-dashboard',
  imports: [TopSummary],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
