import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'kt-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() onlyImage = false;
  @Output() fileSelection = new EventEmitter<File>();

  public imageUrls: SafeUrl[];
  private lastObjectUrl: string;

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  errorMessage = '';
  fileErrorMessage = '';
  selectedFileName: string = null;
  selectedFile: File = null;

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.imageUrls = [];
    this.lastObjectUrl = '';
  }

  ngOnInit(): void {
    this.uploader.onWhenAddingFileFailed = this.onWhenAddingFileFailed;
    this.uploader.onAfterAddingFile = this.onAfterAddingFile;
    this.setUploaderConfig();
  }

  reset(): void {
    this.imageUrls = [];
    this.lastObjectUrl = null;
    this.errorMessage = '';
    this.fileErrorMessage = '';
    this.selectedFileName = null;
    this.selectedFile = null;
  }

  // File upload Start
  setUploaderConfig(): void {
    const config = {
      autoUpload: false,
      url: '',
      maxFileSize: 10 * 1024 * 1024,
      isHTML5: true,
      queueLimit: 1,
      allowedFileType: this.onlyImage ? ['image'] : null
    };
    this.uploader.setOptions(config);
  }

  onWhenAddingFileFailed = (item: FileLikeObject, filter) => {
    this.selectedFile = null;
    this.fileErrorMessage = '';
    this.selectedFileName = item.name;
    switch (filter.name) {
      case 'fileType':
        this.fileErrorMessage = 'Please upload files in: (png, jpg, jped) format';
        break;
      case 'fileSize':
        this.fileErrorMessage = 'Please Upload a file up to 10 MB';
        break;
    }
    this.onUploadImage(this.selectedFile);
  }

  onAfterAddingFile = (fileItem: FileItem) => {
    this.fileErrorMessage = '';
    this.selectedFileName = '';
    if (fileItem) {
      this.selectedFileName = fileItem.file.name;
      this.selectedFile = fileItem._file;
      this.onUploadImage(this.selectedFile);
      this.uploader.removeFromQueue(fileItem);
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // I handle the paste event on the Window (see host bindings).
  @HostListener('window:paste', ['$event'])
  public handlePaste(event: ClipboardEvent): void {
    if (!this.onlyImage) {
      return;
    }

    const pastedImage = this.getPastedImage(event);

    if (!pastedImage) {
      return;
    }

    if (this.lastObjectUrl) {
      URL.revokeObjectURL(this.lastObjectUrl);
    }

    this.lastObjectUrl = URL.createObjectURL(pastedImage);
    this.imageUrls.unshift(
      this.sanitizer.bypassSecurityTrustUrl(this.lastObjectUrl)
    );
  }

  private getPastedImage(event: ClipboardEvent): File | null {

    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files.length &&
      this.isImageFile(event.clipboardData.files[0])
    ) {
      return (event.clipboardData.files[0]);
    }

    return (null);
  }

  private isImageFile(file: File): boolean {
    return (file.type.search(/^image\//i) === 0);
  }

  onPaste(event: any): void {
    const items = event.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {
      this.selectedFile = new File([blob], 'file.jpg');

      const reader = new FileReader();
      reader.onload = (evt: any) => {
        this.onUploadImage(this.selectedFile);
      };
      reader.readAsDataURL(blob);
    }
  }

  onUploadImage(file): void {
    this.fileSelection.next(file);
  }
}
