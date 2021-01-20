import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }

}
