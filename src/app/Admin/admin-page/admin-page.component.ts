import { Component } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { ProductOperationsComponent } from '../product-operations/product-operations.component'
import { UserOperationsComponent } from '../user-operations/user-operations.component'

@Component({
  standalone: true,
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  imports: [MatTabsModule, ProductOperationsComponent, UserOperationsComponent]
})
export class AdminPageComponent {}
