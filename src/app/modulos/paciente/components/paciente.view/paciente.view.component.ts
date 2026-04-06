import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, finalize } from 'rxjs';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';
import { HistoriaClinicaModel } from 'src/app/models/historia-clinica.model';
import { MacroModel } from 'src/app/models/macro.model';
import { MicroModel } from 'src/app/models/micro.model';
import { PacienteModel } from 'src/app/models/paciente.model';
import { BodyApiService } from 'src/app/services/api/body.api.service';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';
import { AppointmentApiService } from 'src/app/services/api/appointment.api.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-paciente.view',
  templateUrl: './paciente.view.component.html',
  styleUrls: ['./paciente.view.component.scss']
})
export class PacienteViewComponent implements OnInit, OnDestroy {
  id: number;
  titulo: string = "";
  fileName: string = '';
  uploading: boolean = false;
  uploadProgress?: number;
  uploadSub?: Subscription;
  data?: string;
  historiasClinicas: HistoriaClinicaModel[] = [];
  selectedFile?: string;
  selectedFileName?: string;
  selectedFileType?: string;
  isDragOver: boolean = false;

  paciente: PacienteModel = {
    id: 0,
    name: "",
    lastName: "",
    birthdate: new Date(),
    sex: "",
    profesion: "",
    phone: ""
  };
  nombreCompleto = '';
  items: BodyitemDto[] = [];
  diagnosticos: any[] = []; // Changed from MacroModel[] to handle DiagnosticDto
  micros: MicroModel[] = [];

  micro_id: number = 0;

  page: number = 0;
  first: boolean = false;
  last: boolean = false;
  numberOfElements: number = 150;
  totalPages: number = 0;


  hcPage: number = 0;
  hcFirst: boolean = false;
  hcLast: boolean = false;
  hcNumberOfElements: number = 150;
  hcTotalPages: number = 0;

  appointments: AppointmentModel[] = [];

  constructor(
    private api: PacienteApiService,
    private apiBody: BodyApiService,
    private appointmentApi: AppointmentApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.params['id']

  }
  ngOnInit(): void {
    this.api.verPaciente(this.id).subscribe({
      next: datos => {
        this.paciente = datos;
        this.nombreCompleto = this.paciente.name + this.paciente.lastName
      },
      error: (e) => {
      }
    })

    this.getDiagnosticPage(this.page)

    const bodyItems = this.apiBody.getElements(this.id);
    if (bodyItems) {
      this.items = bodyItems;
    }
    this.getHistoriasClinicas();
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentApi.getAppointmentsByPatient(this.id).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (e) => {
        console.error('Error loading appointments', e);
      }
    });
  }

  getDiagnosticPage(page: number) {
    this.api.diagnostico(this.id, page).subscribe({
      next: datos => {
        // The endpoint returns array of diagnostics directly, not paginated
        this.diagnosticos = Array.isArray(datos) ? datos : [];
        this.last = true;  // No pagination for now
        this.first = true;
        this.totalPages = 1;
        this.page = 0;
      },
      error: (e) => {
        console.error('Error loading diagnostics', e);
      }
    })
  }
  getMicroPage(page: number) {
    this.api.micro(this.micro_id, page).subscribe({
      next: datos => {
        this.micros = datos['content'];
        this.last = datos.last;
        this.first = datos.first;
        this.totalPages = datos.totalPages;
        this.page = datos.number;
      },
      error: (e) => {
      }
    })

  }
  getMicro(micro: number) {
    this.micro_id = micro;
    this.getMicroPage(0);

  }

  getHistoriasClinicas() {
    this.api.getMedicalRecords(this.id).subscribe({
      next: (records) => {
        this.historiasClinicas = records.map(r => ({
          id: r.id,
          name: r.fileName,
          location: r.location,
          createdAt: new Date(r.uploadedAt),
          fileSize: r.fileSize,
          contentType: r.contentType
        }));
      },
      error: (e) => {
        console.error('Error loading medical records', e);
      }
    })
  }

  edad(fechaNacimiento: string) {
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  // Helper method to get full image URL
  getImageUrl(location: string): string {
    if (!location) return './assets/no-image.avif';
    if (location.startsWith('http')) return location;
    return environment.apiUrl + location;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log('File selected:', file);
    console.log('File name:', file?.name);
    console.log('File size:', file?.size);

    if (file) {
      this.uploadFile(file);
    }
  }

  // Drag and Drop handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  // Upload file method
  uploadFile(file: File) {
    this.fileName = file.name;
    this.uploading = true;

    console.log('Calling uploadMedicalRecord for patient:', this.id);
    this.api.uploadMedicalRecord(this.id, file).subscribe({
      next: (record) => {
        console.log('Upload successful:', record);
        this.fileName = "";
        this.uploading = false;
        const newRecord = {
          id: record.id,
          name: record.fileName,
          location: record.location,
          createdAt: new Date(record.uploadedAt),
          fileSize: record.fileSize,
          contentType: record.contentType
        };
        this.historiasClinicas.unshift(newRecord);
      },
      error: (e) => {
        console.error('Error uploading medical record', e);
        console.error('Error status:', e.status);
        console.error('Error body:', e.error);
        this.fileName = "";
        this.uploading = false;
      }
    })
  }

  // Helper: Check if file is an image
  isImage(contentType?: string): boolean {
    if (!contentType) return false;
    return contentType.startsWith('image/');
  }

  // Helper: Format file size
  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
  cancelUpload() {
    this.reset();
  }
  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }

  // Método mejorado para abrir el modal con el documento
  openFileModal(historiaClinica: HistoriaClinicaModel, fileName: string) {
    this.selectedFile = historiaClinica.location;
    this.selectedFileName = fileName || historiaClinica.name;
    this.selectedFileType = historiaClinica.contentType;

    // Abrir el modal usando Bootstrap
    const modalElement = document.getElementById('fileViewerModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Close file modal
  closeFileModal() {
    const modalElement = document.getElementById('fileViewerModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }

  // Check if file is PDF
  isPDF(contentType?: string): boolean {
    return contentType?.includes('pdf') || false;
  }

  // Get safe URL for iframe (PDFs)
  getSafeUrl(location: string): SafeResourceUrl {
    const url = this.getImageUrl(location);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Get file icon based on type
  getFileIcon(contentType?: string): string {
    if (!contentType) return 'fa fa-file';
    if (contentType.includes('pdf')) return 'fa fa-file-pdf text-danger';
    if (contentType.startsWith('image/')) return 'fa fa-file-image text-primary';
    return 'fa fa-file';
  }

  // Método auxiliar para manejar la selección de archivo desde el bodylist
  handleFileSelect(event: any) {
    if (typeof event === 'string') {
      this.openFileModal({
        location: event,
        name: 'Imagen Dermatoscópica'
      } as HistoriaClinicaModel, 'Imagen Dermatoscópica');
    }
  }

  // Role-based permission methods
  isReceptionist(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.roles?.some((r: string) => r.toLowerCase() === 'recepcionista') || false;
  }

  canViewDermatoscopicImages(): boolean {
    return !this.isReceptionist();
  }

  canUploadMedicalHistory(): boolean {
    // Everyone can upload medical history documents
    return true;
  }

  ngOnDestroy() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
  }
}
