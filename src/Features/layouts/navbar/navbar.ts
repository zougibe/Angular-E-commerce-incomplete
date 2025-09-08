import { Component, Input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() showlinks: boolean = true



}
