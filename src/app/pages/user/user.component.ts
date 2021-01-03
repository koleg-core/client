import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public user: User;
  public isLoading = false;

  private _id: string;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private navController: NavController
  ) { }

  ionViewDidEnter() {
    this._id = this.route.snapshot.params.id;

    this.isLoading = true;
    this.usersService.getUser(this._id)
      .then(user => this.user = user)
      .finally(() => this.isLoading = false);
  }

  onClickBackButton() {
    this.navController.navigateBack(['main','users']);
  }

}
