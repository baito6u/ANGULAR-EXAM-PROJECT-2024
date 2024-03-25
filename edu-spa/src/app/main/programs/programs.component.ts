import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
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


  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllPrograms();
  }

  getAllPrograms() {
    this.data.getAllPrograms().subscribe(res => {
      this.programList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
          return data;
      });
    }, (err) => {
      alert('Error while fetching course data');
    });
  }
}
