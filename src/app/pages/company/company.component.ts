import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  
 

  constructor() { }

  ngOnInit() {
  }

  selectizeConfig: any = {
    labelField: 'label',
    valueField: 'value',
    searchField: ['label']
};

cityOptions: any = [
  {
      label: 'Mumbai',
      value: 'mumbai',
      code: 'MUM'
  }, {
      label: 'Pune',
      value: 'pune',
      code: 'PUNE'
  }, {
      label: 'New Delhi',
      value: 'newdelhi',
      code: 'DEL'
  }
];

}
