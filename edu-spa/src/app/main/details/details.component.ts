import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  program$!: Observable<any>;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }
  
  ngOnInit(): void {
    this.getProgramsDetails();
    
  }

  getProgramsDetails() {
    const programId = this.route.snapshot.paramMap.get('id');
    if(programId) {
      this.program$ = this.dataService.getProgramById(programId);
    }
  }

  navigateToProfile(program: any) {
    this.dataService.setSelectedProgram(program);
    this.router.navigate(['/profile']);
  }


}
