import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent {
  public uploadUrl = `${environment.apiUrl}/upload`;
  isLoading = false;
  http: any;
  files: any[];

  constructor(private msg: NzMessageService) {}

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getFiles() {
    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/files`).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.files = data;
      },
    });
    console.log(this.files);
  }
}
