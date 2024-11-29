import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

type ButtonKey = 'menu' | 'notifications' | 'profile';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('buttonClick', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('clicked', style({
        transform: 'scale(0.9)'
      })),
      transition('normal <=> clicked', animate('100ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
  buttonStates: Record<ButtonKey, string> ={
    menu: 'normal',
    notifications: 'normal',
    profile: 'normal'
  };

  toggleButton(button: ButtonKey) {
    // Set the clicked button to 'clicked' state
    this.buttonStates[button] = 'clicked';
    
    // Reset the state back to 'normal' after a short delay
    setTimeout(() => {
      this.buttonStates[button] = 'normal';
    }, 100);
  }
}
