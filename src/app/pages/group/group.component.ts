import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';
import { Group } from '../../models/group' ;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public group: Group = null;
  public isLoading = true;
  private _id = null;

  constructor(
    private groupsService: GroupsService,
    private route: ActivatedRoute
  ) { }
  
  ionViewDidEnter() {     
    this._id = parseInt(this.route.snapshot.params.id);

    this.groupsService.getGroup(this._id)
      .then(group => {
        this.group = group;
      })
      .finally(() => this.isLoading = false);
  }

  public isGroup(): Group {
    return this.group;
  }

}
