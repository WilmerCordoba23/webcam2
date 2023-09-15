import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  WebcamImage: any;
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    this.WebcamImage = event
    this.previewImage = event.imageAsDataUrl;
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
    console.log(this.WebcamImage)
  }

}
