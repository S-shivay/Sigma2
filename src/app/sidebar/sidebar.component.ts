import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  dropdowns: { [key: string]: boolean } = {
    dropdown1: false,
    dropdown2: false,
  };

  toggleDropdown(dropdown: string): void {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }
}
