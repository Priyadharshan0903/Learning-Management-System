import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Department } from 'src/app/models';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent implements OnInit {
  user = JSON.parse(String(localStorage.getItem('user')));

  uploadUrl = `${environment.apiUrl}/files/upload`;

  files: any[];

  departments: Department[] = [{ id: -1, name: 'All' }];
  selectedDepartment = -1;

  trustedUrl = (url: string) =>
    this.sanitizer.bypassSecurityTrustResourceUrl(url);

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/departments`).subscribe({
      next: (data: any) => {
        this.departments = [...this.departments, ...data];
      },
    });
    this.getFiles();
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.getFiles();
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getFiles() {
    this.http
      .get(`${environment.apiUrl}/files?deptId=${this.selectedDepartment}`)
      .subscribe({
        next: (data: any) => {
          this.files = data;
        },
      });
  }
}
