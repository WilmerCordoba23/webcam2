import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  trigger: Subject<void> = new Subject<void>();
  previewImage: string = '';
  WebcamImage: any;
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  constructor() {
  }

  ngOnInit() {
    this.initCamera(); // Solicitar permisos de cámara al iniciar el componente
  }

  initCamera() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        if (mediaDevices && mediaDevices.length > 0) {
          // Solicitar permisos de cámara solo si hay dispositivos disponibles.
          this.trigger.next();
        } else {
          console.error('No se encontraron dispositivos de cámara disponibles.');
        }
      })
      .catch((error: WebcamInitError) => {
        console.error('Error al inicializar la cámara: ', error);
      });
  }

  snapshot(event: WebcamImage) {
    this.WebcamImage = event;
    this.previewImage = event.imageAsDataUrl;
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
/*     console.log(this.WebcamImage);
 */    // Aquí puedes realizar acciones adicionales con la imagen capturada.
  }
}
