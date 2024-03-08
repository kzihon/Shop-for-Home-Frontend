import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';

@Component({
  standalone: true,
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrl: './user-operations.component.scss',
})
export class UserOperationsComponent implements OnInit {
  constructor(private authorizedHttpService: AuthorizedHttpService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.authorizedHttpService.get('/customer/').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      },
    });
  }
}
