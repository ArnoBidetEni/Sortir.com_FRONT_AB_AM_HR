import { Component, OnInit, Input } from '@angular/core';
import { Excursion } from 'src/app/shared/interfaces/excursion';
import { Status } from 'src/app/shared/interfaces/status';
import { CampusService } from 'src/app/core/campus/data-access/campus.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { PlaceService } from 'src/app/shared/services/place.service';
import { ExcursionAddForm, getExcursionAddForm } from '../../utils/excursion-add.form';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-excursion-add[excursion]',
  templateUrl: './excursion-add.component.html',
  styleUrls: ['./excursion-add.component.scss']
})
export class ExcursionAddComponent implements OnInit {

  @Input('excursion') excursion: Excursion | null = null;

  form: ExcursionAddForm = getExcursionAddForm();

  campuses$ = this.campusService.getCampuses().pipe(switchMap(val=>of(val.filter(el=>el.campusId !== this.form?.value.campus?.campusId))));
  places$ = this.placeService.getPlaces().pipe(switchMap(val=>of(val.filter(el=>el.placeId !== this.form?.value.excursionPlace?.placeId))));

  constructor(private campusService: CampusService, private placeService: PlaceService, private loginService: LoginService) { }

  ngOnInit(): void {
    if (!this.excursion) {
      this.form?.patchValue({
        organisator: this.loginService.loggedUser$.value,
        status : Status.IN_CREATION,
      })
    } else {
      this.form?.patchValue({
        ...this.excursion
      });
    }
  }
}
