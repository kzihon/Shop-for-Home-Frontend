import { Component } from '@angular/core'
import { GeneralFormComponent } from '../general-form/general-form.component'
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog'

@Component({
  standalone: true,
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrl: './product-operations.component.scss'
})
export class ProductOperationsComponent {
  constructor (
    private dialog: MatDialog // private dialogRef: MatDialogRef<GeneralFormComponent>
  ) {}

  openCreateProduct () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.data = {
      formType: 'Create Product'
    }
    this.dialog.open(GeneralFormComponent, dialogConfig)
  }
  openDeleteProduct () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.data = {
      formType: 'Delete Product'
    }
    this.dialog.open(GeneralFormComponent, dialogConfig)
  }
}
