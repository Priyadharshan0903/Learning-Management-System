import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { Staff } from 'src/app/models';

interface Filter {
  id: number;
  name: string;
}

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent implements OnInit {
  user = JSON.parse(String(localStorage.getItem('user')));

  @ViewChild(NzPopoverDirective, { static: false }) popover: NzPopoverDirective;

  uploadUrl = `${environment.apiUrl}/files/upload`;

  files: any[];

  departments: Filter[] = [{ id: -1, name: 'All' }];
  users: Filter[] = [{ id: -1, name: 'All' }];

  tempFilter = {
    department: -1,
    user: -1,
  };

  selectedDepartment: any = -1;
  selectedUser = -1;

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  log(value: object[]): void {
    console.log(value);
  }

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/departments`).subscribe({
      next: (data: any) => {
        this.departments = [...this.departments, ...data];
      },
    });
    this.http.get<Staff[]>(`${environment.apiUrl}/users`).subscribe({
      next: (data: Staff[]) => {
        data.forEach((user) => {
          this.users.push({
            id: user.id,
            name: user.name,
          });
        });
      },
    });
    this.getFiles();
  }

  getFiles() {
    this.http
      .get(
        `${environment.apiUrl}/files?deptId=${this.selectedDepartment}&userId=${this.selectedUser}`
      )
      .subscribe({
        next: (data: any) => {
          this.files = data;
        },
      });
  }

  upload(info: NzUploadChangeParam): void {
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

  saveFilter() {
    this.popover.hide();
    this.selectedDepartment = this.tempFilter.department;
    this.selectedUser = this.tempFilter.user;
    this.getFiles();
  }

  cancelFilter() {
    this.tempFilter.department = this.selectedDepartment;
    this.tempFilter.user = this.selectedUser;
    this.popover.hide();
  }

  downloadPdf(fileName: string) {
    const url = 'http://localhost:3000/' + fileName;
    this.http
      .get(url, {
        responseType: 'blob',
      })
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      });
  }
}
