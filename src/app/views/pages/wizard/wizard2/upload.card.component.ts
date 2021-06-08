import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { IImageToText } from '../../../../interface/image.text';
import { AppConstants } from '../../../../app.constants';
import { IDateProperties } from '../../../../interface/date.properties';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'kt-upload-card',
  templateUrl: './upload.card.component.html',
})
export class UploadCardComponent implements OnInit, AfterViewInit {


  private trigger: Subject<void> = new Subject<void>();
  selectedFiles: any;
  tabIndex = 0;
  imageSrc: string | ArrayBuffer;
  webcamImage: WebcamImage;
  @Input() public lastInputText: string;
  @Input() public firstInputText: string;
  @Input() public firstClinicName: string;
  @Input() public secondClinicName: string;

  @Input() lastNameInputControl: FormControl;
  @Input() firstNameInputControl: FormControl;
  @Input() firstClinicNameInputControl: FormControl;
  @Input() secondClinicNameInputControl: FormControl;

  @Input() uploadCardForm: FormGroup;
  @Input() tooltipJson: any;
  @Input() showWebcam: boolean;
  @Input() isControlHasError: (controlName: string, validationType: string) => boolean;
  @Input() imageToTextResponse: IImageToText;
  @Input() tab3Pressed: boolean;

  @Output() firstEditedText = new EventEmitter<string>();
  @Output() lastEditedText = new EventEmitter<string>();
  @Output() firstEditedClinic = new EventEmitter<string>();
  @Output() secondEditedClinic = new EventEmitter<string>();
  @Output() updateImageSrc = new EventEmitter<string | ArrayBuffer>();
  @Output() updateWebImage = new EventEmitter<File>();

  constructor(private cd: ChangeDetectorRef) {
  }
  hasError(controlName: string, validationType: string) {
    return this.isControlHasError(controlName, validationType);
  }

  ngOnInit() {
    // console.log('oninit: firstClinicNameInputControl:', this.firstClinicNameInputControl);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.showWebcam = false;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public async handleImage(webcamImage: WebcamImage): Promise<void> {
    // console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    await fetch(this.webcamImage.imageAsDataUrl)
      .then(response => response.blob())
      .then(blob => this.updateWebImage
        .emit(new File([blob], `webcam-image${Date.now()}`, { type: 'image/jpeg', lastModified: Date.now() })));
    // this.updateWebImage.emit(webcamImage);
    this.cd.markForCheck();
  }

  onFileSelect(file) {
    if (!file) {
      this.selectedFiles = [];
      document.getElementById('img_preview')['src'] = '';
      return;
    }
    // console.log('onFileSelect: ', file);
    this.updateImageSrc.emit(file);
    // return;
    this.selectedFiles = [file];
    const reader = new FileReader();
    reader.onload = e => {
      // console.log('reader.result-->', reader.result);
      // this.updateImageSrc.emit(reader.result);
      this.imageSrc = reader.result;
      this.cd.markForCheck();
      // console.log('imageSrc-->', this.imageSrc);
      // tslint:disable-next-line: no-string-literal
      document.getElementById('img_preview')['src'] = reader.result;
    };
    reader.readAsDataURL(file);
    // this.selectedFiles.source = window.URL.createObjectURL(event.target.files[0]);
  }

  ngAfterViewInit(): void {
  }

  updateSingleField(prop: any, control: any): void {
    this[prop] = this[control].value;
    this.firstEditedText.emit(this.firstInputText);
    this.lastEditedText.emit(this.lastInputText);
    this.firstEditedClinic.emit(this.firstClinicName);
    this.secondEditedClinic.emit(this.secondClinicName);
  }


  cancelSingleField(prop: string, control: any): void {
    (this[control] as AbstractControl).setValue(this[prop]);
  }

  onTabChanged(event) {
    // console.log(event);
    this.tabIndex = event.index;
  }

  toggleWebCam(e) {
    // console.log('in toggel web cam');
    if (e.keyCode === 13) {
      return;
    }
    this.showWebcam = !this.showWebcam;
  }
}
