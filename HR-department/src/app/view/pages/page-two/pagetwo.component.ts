import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pagetwo',
  templateUrl: './pagetwo.component.html',
  styleUrls: ['./pagetwo.component.scss']
})
export class PagetwoComponent implements AfterViewInit {

  returnedCards = ELEMENT_DATA;
  countries = [
    {value: 'saudi arabia', label: 'Saudi Arabia'},
    {value: 'us', label: 'US'},
    {value: 'oman', label: 'Oman'},
  ]
  formGroup!: FormGroup;
  name: any;
  phone: any;
  email: any;
  date: any;
  power: any;
  country: any;
  company: any;

  constructor(private api: ApiService, 
    private _liveAnnouncer: LiveAnnouncer, 
    private fb: FormBuilder) {
      this.formGroup = this.fb.group({
        name: '',
        phone: '',
        email: '',
        date: '',
        power: 0,
        country: '',
        company: '',
      });
    }

  ngAfterViewInit() {
    this.getCountries();
  }

  getCountries(){
    this.api.get('https://github.com/fabian7593/CountryAPI').subscribe(res => {
      this.countries = res;
      console.log('data response', this.countries);
    });
  }
}


export interface PeriodicElement {
  name: string;
  phone: string;
  email: string;
  date: string;
  power: number;
  country: string;
  company: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Name', phone: '(874) 123-4560', email: 'hero@hero.com', date: '10/6/1992', power: 23000, country: 'Saudi Arabia', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '11/2/1982', power: 1200, country: 'Saudi Arabia', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '1/8/1995', power: 15500, country: 'US', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '11/1/1992', power: 12200, country: 'Saudi Arabia', company: 'company'},
  {name: 'Anbcgf', phone: '(874) 123-4560', email: 'hero@hero.com', date: '1/9/1993', power: 1100, country: 'Oman', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '1/2/2001', power: 19000, country: 'Saudi Arabia', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '6/2/2014', power: 1970, country: 'Oman', company: 'company'},
  {name: 'Hero Nmae', phone: '(874) 123-4560', email: 'hero@hero.com', date: '10/3/1988', power: 32300, country: 'Saudi Arabia', company: 'company'},
];
