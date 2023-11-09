import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isWaitTimeExpired!: boolean;
  url!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isWaitTimeExpired = false;
    // If the data is not loaded after 5 seconds, then prompt error
    setTimeout(() => {
      this.isWaitTimeExpired = true;
      this.url = this.router.url;
    }, 1000 * 5);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
