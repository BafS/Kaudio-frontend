import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { MessageService } from '../../services/api/message.service';
import { User } from '../../models/user';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UserService, MessageService ]
})
export class ProfileComponent implements OnInit {
  public stateCtrl: FormControl = new FormControl();
  private _messages: any[] = [];
  private userId: string;
  public user: User;
  public myForm: FormGroup = new FormGroup({
    state: this.stateCtrl
  });
  public selected: string = '';
  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  constructor(
    private _userService: UserService,
  ) {
    this.dataSource = Observable.create((observer: any) => {
      // Permet de mettre à jour l'auto-complétion de la liste d'amis
      // Est exécuté à chaque fois qu'une lettre est tappée
      if (this.asyncSelected.length > 0) {
        this._userService.find({
          query: {
            email: {
              $search: this.asyncSelected
            }
          }
        }).then(res => {
          observer.next(res.data);
        });
      }
    }).mergeMap((res: any) => Observable.of(res));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  // Appelé lorsque l'utilisateur clique sur une entrée
  // de l'auto-complétion.
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    let already_in = false;

    // Permet de déterminer si l'ami sélectionné fait déjà parti
    // de la liste d'amis de l'utilisateur.
    for (let key in this.user.friends_refs)
      if (this.user.friends_refs[key] === e.value) {
        already_in = true;
        break;
      }
    
    // Ajout de l'ami s'il n'est pas déjà dans la liste.
    if (!already_in)
      this.user.friends_refs.push(e.value);
    
    // Vide le champ d'auto-complétion.
    this.asyncSelected = null;
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');
    if (this.userId) {
      this._userService.get(this.userId).then(user => {
        this.user = <User>{
          email: user.email,
          friends: user.friends_ref
        };
      });
    }
  }

  // Met à jour l'utilisateur dans la base de données.
  onSubmit(event) {
    this._userService.update(this.userId, this.user);
    return false;
  }

  // Est appelé lorsque l'utilisateur veut supprimer un ami de sa liste d'amis.
  onRemove(user) {
    // Parcourt la liste d'amis et supprime l'ami sélectionné.
    for (var i = 0; i < this.user.friends_refs.length; i++)
      if (this.user.friends_refs[i] === user)
        this.user.friends_refs.splice(i, 1);
    
    this._userService.update(this.userId, this.user);
    return false;
  }
}
