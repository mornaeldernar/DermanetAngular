import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileUploadService, UploadProgress } from '../../../../services/file-upload.service';

export interface PhotoCaptureResult {
    file: File;
    preview: string;
    uploadProgress?: UploadProgress;
}

@Component({
    selector: 'app-photo-capture',
    templateUrl: './photo-capture.component.html',
    styleUrls: ['./photo-capture.component.scss']
})
export class PhotoCaptureComponent {
    @Input() mode: 'macroscopic' | 'microscopic' = 'macroscopic';
    @Input() multiple: boolean = false;
    @Input() pacienteId!: number;
    @Output() photosCaptured = new EventEmitter<PhotoCaptureResult[]>();

    capturedPhotos: PhotoCaptureResult[] = [];
    isDragging: boolean = false;
    uploadError: string | null = null;

    // Camera modal properties
    showCameraModal: boolean = false;
    capturedImage: string | null = null;
    cameraError: string | null = null;
    private mediaStream: MediaStream | null = null;

    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

    constructor(private fileUploadService: FileUploadService) { }

    get title(): string {
        return this.mode === 'macroscopic'
            ? 'Foto Macroscópica'
            : 'Fotos Microscópicas (Dermatoscopio)';
    }

    get description(): string {
        return this.mode === 'macroscopic'
            ? 'Sube una foto general de la lesión'
            : 'Sube una o más fotos tomadas con el dermatoscopio';
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.processFiles(Array.from(input.files));
        }
    }

    onCameraCapture(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.processFiles(Array.from(input.files));
        }
        // Reset input to allow capturing the same image again
        input.value = '';
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        if (event.dataTransfer?.files) {
            this.processFiles(Array.from(event.dataTransfer.files));
        }
    }

    private processFiles(files: File[]): void {
        this.uploadError = null;

        // Validate files
        for (const file of files) {
            const validation = this.fileUploadService.validateFile(file);
            if (!validation.valid) {
                this.uploadError = validation.error || 'Error al validar archivo';
                return;
            }
        }

        // If macroscopic mode, only allow one file
        if (this.mode === 'macroscopic' && files.length > 1) {
            this.uploadError = 'Solo se permite una foto macroscópica';
            return;
        }

        // Clear previous photos if macroscopic
        if (this.mode === 'macroscopic') {
            this.capturedPhotos = [];
        }

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = e.target?.result as string;
                this.capturedPhotos.push({
                    file,
                    preview
                });
                this.photosCaptured.emit(this.capturedPhotos);
            };
            reader.readAsDataURL(file);
        });
    }

    removePhoto(index: number): void {
        this.capturedPhotos.splice(index, 1);
        this.photosCaptured.emit(this.capturedPhotos);
    }

    clearAll(): void {
        this.capturedPhotos = [];
        this.uploadError = null;
        this.photosCaptured.emit(this.capturedPhotos);
    }

    // Camera methods
    async openCamera(): Promise<void> {
        this.showCameraModal = true;
        this.capturedImage = null;
        this.cameraError = null;

        try {
            // Request access to camera
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            });

            // Wait for view to render
            setTimeout(() => {
                if (this.videoElement && this.videoElement.nativeElement) {
                    this.videoElement.nativeElement.srcObject = this.mediaStream;
                }
            }, 100);
        } catch (error: any) {
            console.error('Error accessing camera:', error);
            this.cameraError = this.getCameraErrorMessage(error);
        }
    }

    capturePhoto(): void {
        if (!this.videoElement || !this.canvasElement) return;

        const video = this.videoElement.nativeElement;
        const canvas = this.canvasElement.nativeElement;

        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.capturedImage = canvas.toDataURL('image/jpeg', 0.9);
        }
    }

    async retakePhoto(): Promise<void> {
        this.capturedImage = null;
        this.cameraError = null;

        // Restart camera stream
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            });

            // Wait for view to render
            setTimeout(() => {
                if (this.videoElement && this.videoElement.nativeElement) {
                    this.videoElement.nativeElement.srcObject = this.mediaStream;
                }
            }, 100);
        } catch (error: any) {
            console.error('Error accessing camera:', error);
            this.cameraError = this.getCameraErrorMessage(error);
        }
    }

    async confirmPhoto(): Promise<void> {
        if (!this.capturedImage) return;

        try {
            // Convert base64 to File
            const file = await this.dataURLtoFile(this.capturedImage, `camera-capture-${Date.now()}.jpg`);
            this.processFiles([file]);
            this.closeCameraModal();
        } catch (error) {
            console.error('Error processing captured photo:', error);
            this.uploadError = 'Error al procesar la foto capturada';
        }
    }

    closeCameraModal(): void {
        // Stop camera stream
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        this.showCameraModal = false;
        this.capturedImage = null;
        this.cameraError = null;
    }

    private async dataURLtoFile(dataUrl: string, filename: string): Promise<File> {
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    private getCameraErrorMessage(error: any): string {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            return 'Permiso de cámara denegado. Por favor, permite el acceso a la cámara en la configuración del navegador.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            return 'No se encontró ninguna cámara en este dispositivo.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            return 'La cámara está siendo utilizada por otra aplicación.';
        } else {
            return 'Error al acceder a la cámara. Por favor, intenta de nuevo.';
        }
    }
}
