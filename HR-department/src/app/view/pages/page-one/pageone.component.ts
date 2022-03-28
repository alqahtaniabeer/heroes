import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pageone',
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.scss']
})
export class PageoneComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'date', 'power', 'country', 'company', 'manage'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  isShowing!: boolean;
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
    this.dataSource.sort = this.sort;
    this.getCountries();
  }

  getCountries(){
    this.api.get('https://github.com/fabian7593/CountryAPI').subscribe(res => {
      this.countries = res;
      console.log('data response', this.countries);
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /** Search */
  applySearch(event: Event) {
    let searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      // console.log(data);
      return data.name.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter)
      ||  data.country.toLowerCase().includes(filter) || data.company.toLowerCase().includes(filter)
      ||  data.date.toLowerCase().includes(filter) || data.phone.toLowerCase().includes(filter) || data.power.toString().toLowerCase().includes(filter)
    };
    searchValue = searchValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = searchValue;
  }

  /** Filter */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
