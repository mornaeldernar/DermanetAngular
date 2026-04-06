export interface AppointmentModel {
    id?: number;
    date: Date;
    endTime?: Date;
    reason: string;
    status: AppointmentStatus;
    notes?: string;
    googleCalendarEventId?: string;
    patientId: number;
    doctorId: number;

    // Patient information
    patientName?: string;
    patientLastName?: string;
    patientEmail?: string;

    // Doctor information
    doctorName?: string;
    doctorLastName?: string;
    doctorEmail?: string;
    doctorSpeciality?: string;

    createdAt?: Date;
    modifiedAt?: Date;
}

export enum AppointmentStatus {
    SCHEDULED = 'SCHEDULED',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    NO_SHOW = 'NO_SHOW'
}

export interface CreateAppointmentDto {
    date: Date;
    endTime?: Date;
    reason: string;
    notes?: string;
    patientId: number;
    doctorId: number;
    syncWithGoogleCalendar?: boolean;
}

export interface UpdateAppointmentDto {
    date: Date;
    endTime?: Date;
    reason: string;
    status: AppointmentStatus;
    notes?: string;
    patientId: number;
    doctorId: number;
    syncWithGoogleCalendar?: boolean;
}

export interface AppointmentFilters {
    doctorId?: number;
    patientId?: number;
    startDate?: Date;
    endDate?: Date;
    status?: AppointmentStatus;
    page?: number;
    size?: number;
}
