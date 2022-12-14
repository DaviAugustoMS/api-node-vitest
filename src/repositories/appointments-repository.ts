import { Appointment } from "./../entities/appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(
    startAt: Date,
    endAt: Date
  ): Promise<Appointment | null>;
  // save(appointment: Appointment): Promise<void>;
}
