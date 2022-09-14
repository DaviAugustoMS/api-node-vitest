import { AppointmentRepository } from "./../repositories/appointments-repository";
import { Appointment } from "./../entities/appointment";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async execute({
    customer,
    startAt,
    endAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentRepository.findOverlappingAppointment(
        startAt,
        endAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startAt,
      endAt,
    });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
