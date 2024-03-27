import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  program: any;

  constructor(private dataServise: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const programId = this.route.snapshot.paramMap.get('id');
    this.dataServise.getProgramById(programId as string).subscribe(program => {
      this.program = program;
      
    });
    
  }

}
