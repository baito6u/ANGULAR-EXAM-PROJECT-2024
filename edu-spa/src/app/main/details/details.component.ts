import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { Program } from 'src/app/shared/types/program-type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  //program = {} as Program;
  program$!: Observable<any>;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  
  ngOnInit(): void {
    this.getProgramsDetails();
    
  }

  getProgramsDetails() {
    const programId = this.route.snapshot.paramMap.get('id');
    if(programId) {
      this.program$ = this.dataService.getProgramById(programId);
    }
  }

}
