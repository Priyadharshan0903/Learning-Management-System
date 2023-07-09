import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { Department, Staff, Subject } from 'src/app/models';
import { StaggerAnimation, FadeOut } from 'src/app/animations';

interface Filter {
  id: number;
  name: string;
}

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  animations: [StaggerAnimation, FadeOut],
})
export class NotesManagerComponent implements OnInit {
  user = JSON.parse(String(localStorage.getItem('user')));
  isAdmin = this.user.role === 'ADMIN';

  @ViewChild(NzPopoverDirective, { static: false }) popover: NzPopoverDirective;

  uploadUrl = `${environment.apiUrl}/files/upload`;
  isUpload = false;
  uploading = false;
  subjects: Subject[] = [];
  fileList: NzUploadFile[] = [];
  files: any[] = [];

  departments: Department[] = [];
  filterDepartments: Filter[] = [{ id: -1, name: 'All' }];
  users: Filter[] = [{ id: -1, name: 'All' }];

  tempFilter = {
    department: -1,
    user: -1,
    sem: -1,
  };

  filterSelectedDept: any = -1;
  filterSelectedUser = -1;
  filterSelectedSemester = -1;

  selectedSubject = -1;
  selectedDepartment = -1;
  selectedSemester = -1;

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  fileUrl = (deptName: string, sem: string, fileName: string) =>
    'http://localhost:3000/' + deptName + '/Semester' + sem + '/' + fileName;

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/departments`).subscribe({
      next: (data: any) => {
        this.departments = data;
        this.filterDepartments = [...this.filterDepartments, ...data];
      },
    });
    this.http.get(`${environment.apiUrl}/subjects`).subscribe({
      next: (data: any) => {
        this.subjects = [...this.subjects, ...data];
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
      .get<any[]>(
        `${environment.apiUrl}/files?deptId=${this.filterSelectedDept}&sem=${this.filterSelectedSemester}&userId=${this.filterSelectedUser}`
      )
      .subscribe({
        next: (data: any[]) => {
          this.files = [...data.filter((d) => !this.files.includes(d))];
        },
      });
  }

  uploadPdf(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    this.http
      .post(
        `${this.uploadUrl}?subjectId=${this.selectedSubject}${
          this.isAdmin ? '&deptId=' + this.selectedDepartment : ''
        }&sem=${this.selectedSemester}`,
        formData
      )
      .subscribe((event: any) => {
        let newFiles = this.fileList.map((file) => {
          return {
            fileName: file.name,
            departmentName: this.isAdmin
              ? this.departments.find((d) => d.id == this.selectedDepartment)
                  ?.name
              : this.user.departmentName,
            userName: this.user.name,
            subjectName: this.subjects.find((s) => s.id == this.selectedSubject)
              ?.name,
            semester: this.selectedSemester,
          };
        });
        this.selectedSubject = -1;
        this.files = [...this.files, ...newFiles];
        this.isUpload = false;
        this.fileList = [];
      });
  }

  deletePdf(id: number) {
    this.http
      .delete(
        `${environment.apiUrl}/files/${this.files[id].id}?fileName=${this.files[id].fileName}&dept=${this.files[id].departmentName}&sem=${this.files[id].semester}`
      )
      .subscribe({
        next: (data: any) => {
          this.files.splice(id, 1);
        },
      });
  }

  saveFilter() {
    this.popover.hide();
    this.filterSelectedDept = this.tempFilter.department;
    this.filterSelectedUser = this.tempFilter.user;
    this.filterSelectedSemester = this.tempFilter.sem;
    this.getFiles();
  }

  cancelFilter() {
    this.tempFilter.department = this.filterSelectedDept;
    this.tempFilter.user = this.filterSelectedUser;
    this.tempFilter.sem = this.filterSelectedSemester;
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
