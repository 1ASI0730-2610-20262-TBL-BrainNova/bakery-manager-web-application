import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Displays localized footer text.
 */
@Component({
  selector: 'app-footer-content',
  imports: [TranslateModule],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css',
})
export class FooterContent {}
