import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { Program } from 'src/app/shared/types/program-type';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit{

  programList: Program[] = [];
  programObj: Program = {
    id: '',
    title: '',
    description: '',
    image: '',
  };

  id: string = '';
  title: string = '';
  description: string= '';
  image: string = '';


  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getAllPrograms();
  }

  getAllPrograms() {
    this.data.getAllPrograms()
      .pipe(
        tap((res: any[]) => {
          this.programList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          });
        })
      )
      .subscribe({
        error: (err) => {
          alert('Error while fetching course data');
        }
      });
  }
}
