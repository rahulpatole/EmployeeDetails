import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  nameSortAsc: boolean = true; 
  dateSortAsc: boolean = true;
  candidate_data: any[] = [ {
    "id": 11,
    "name": "Ash",
    "department": "Finance",
    "joining_date": moment("8/10/2016", "DD-MM-YYYY")
},
{"id": 12,"name": "John","department": "HR","joining_date": moment("18/1/2011", "DD-MM-YYYY")},
{ "id": 13, "name": "Zuri", "department": "Operations", "joining_date": moment("28/11/2019", "DD-MM-YYYY")},
{"id": 14,  "name": "Vish",  "department": "Development",   "joining_date": moment("7/7/2017", "DD-MM-YYYY")},
{ "id": 15, "name": "Barry",  "department": "Operations", "joining_date":  moment("19/8/2014", "DD-MM-YYYY")},
{"id": 16,"name": "Ady",  "department": "Finance",  "joining_date":  moment("5/10/2014", "DD-MM-YYYY")}, 
{ "id": 17,"name": "Gare","department": "Development",  "joining_date":  moment("6/4/2014", "DD-MM-YYYY")},
{ "id": 18,  "name": "Hola",  "department": "Development",  "joining_date": moment("8/12/2010", "DD-MM-YYYY")}, 
{"id": 19,  "name": "Ola",  "department": "HR",  "joining_date": moment("7/5/2011", "DD-MM-YYYY")},
{ "id": 20,  "name": "Kim",  "department": "Finance",  "joining_date": moment("20/10/2010", "DD-MM-YYYY")}]
searchvalue: any = '';
dummyData: any[] = [...this.candidate_data];
originalData: any[] = [...this.candidate_data];
departmentData: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  sortByName(){
    let comparison = 0;
    this.nameSortAsc = !this.nameSortAsc;
      this.candidate_data.sort((a, b) => {
        if (a?.name > b?.name) {
          comparison = 1;
        } else if (a?.name < b?.name) {
          comparison = -1;
        }
        return (
          (!this.nameSortAsc) ? (comparison * -1) : comparison
        );
      });
  }

  sortByDate(){
    let comparison = 0;
    this.dateSortAsc = !this.dateSortAsc;
      this.candidate_data.sort((a, b) => {
        if (a?.joining_date > b?.joining_date) {
          comparison = 1;
        } else if (a?.joining_date < b?.joining_date) {
          comparison = -1;
        }
        return (
          (!this.dateSortAsc) ? (comparison * -1) : comparison
        );
      });
  }

  applyFilter() {
    let searchData = [];
    this.candidate_data = this.dummyData;
    let searchText = this.searchvalue.trim();  // Remove whitespace
    console.log(this.searchvalue) 
    if(searchText != ''){
      searchData = this.candidate_data.filter(function(arr){return arr?.name.includes(searchText)});
      if(searchData.length > 0){
        this.candidate_data = searchData  
      }else{
        this.candidate_data = [];
      }
    }else{
      this.candidate_data = this.dummyData
    }
    
  }  

  calculateExp(){
    
    //let currentTime = moment(currTime, "DD-MM-YYYY");
    
    let expCandidate = [];
    let currentTime = new Date().getTime();


    for(let i=0; i < this.candidate_data.length; i++){
      let joining_date = new Date(this.candidate_data[i].joining_date).getTime();;
      let difference = (currentTime - joining_date);
      let exp = Math.round(difference/(1000*60*60*24*365));
      console.log(exp);
      if(exp > 2){
        expCandidate.push(this.candidate_data[i]);
      }
    }
    this.candidate_data = expCandidate;
    // let joini = moment(row?.wms_updated_date, "DD-MM-YYYY HH:mm:ss");
  }

  showDepartmentWise(){
    const groups = this.originalData.reduce((groups, data) => {
			if (!groups[data.department]) {
				groups[data.department] = [];
			}
			groups[data.department].push(data);
			return groups;
		}, {});

		// Edit: to add it in the array format instead
		this.departmentData = Object.keys(groups).map((department) => {
			return {
				department,
				employee: groups[department]
			};
		});
    console.log(this.departmentData);
  }

  removeDevDepartment(){
    this.candidate_data = this.originalData.filter(function(arr){return arr?.department != 'Development'});
  }

  resetData(){
    this.departmentData = [];
    this.candidate_data = this.originalData;
  }

}
