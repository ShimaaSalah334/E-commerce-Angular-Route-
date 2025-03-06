import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'E-commerce';
  constructor(private flowbiteService: FlowbiteService, private router: Router) { }

  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        initFlowbite();
      }
    });
  }

}
