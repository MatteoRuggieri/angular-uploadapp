import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  myFiles: any = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  submit() {
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }
    this.http
      .post('http://localhost:8001/upload.php', formData) // post verso lato backend //
      .subscribe((res) => {
        console.log(res);
        alert('Upload avvenuto con successo!');
      });
  }
}
