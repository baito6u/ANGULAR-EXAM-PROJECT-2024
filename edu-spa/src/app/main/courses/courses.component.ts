import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { Program } from 'src/app/shared/types/program-type';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  coursesList: Program[] = [];
  courseObj: Program = {
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
    this.getAllCorsesPage();
  }

  getAllCorsesPage() {
    this.data.getAllCorsesPage()
      .pipe(
        tap((res: any[]) => {
          this.coursesList = res.map((e: any) => {
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
