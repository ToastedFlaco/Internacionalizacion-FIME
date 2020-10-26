import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor( public firebase: AngularFireDatabase ) { }

  universityList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    career: new FormControl(0, Validators.required),
    careerFocus: new FormControl(''),
    agreement: new FormControl(0, Validators.required),
    curriculum: new FormControl('', Validators.required),
    webpage: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      country: '',
      career: 0,
      careerFocus: '',
      agreement: 0,
      curriculum: '',
      webpage: ''
    });

  }

  getUniversities() {
    this.universityList =  this.firebase.list('Universities');
    return this.universityList.snapshotChanges();
  }

  addUniversity(university) {
    this.universityList.push({
      name: university.name,
      country: university.country,
      career: university.career,
      careerFocus: university.careerFocus,
      agreement: university.agreement,
      curriculum: university.curriculum,
      webpage: university.webpage
    });
  }

  updateUniversity(university) {
    this.universityList.update(university.$key,{
      name: university.name,
      country: university.country,
      career: university.career,
      careerFocus: university.careerFocus,
      agreement: university.agreement,
      curriculum: university.curriculum,
      webpage: university.webpage
    });
  }

  deleteUniversity($key: string) {
    this.universityList.remove($key);
  }

  populateForm(university) {
    this.form.setValue(university);
  }

}
