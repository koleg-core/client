import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';
import { Group } from '../../../models/group' ;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public group: Group = null;
  public isLoading = true;
  public id = null;

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) { }
  
  ionViewDidEnter() {
    this.id = parseInt(this.router.url.split('groups/')[1]);
    this.groupsService.getGroup(this.id)
      .then(group => {
        this.group = group;
      })
      .finally(() => this.isLoading = false);
  }

  public isGroup(): Group {
    return this.group;
  }

}
