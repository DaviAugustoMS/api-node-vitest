import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "./../../entities/appointment";
import { AppointmentRepository } from "./../appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = [];
  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startAt: Date,
    endAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startAt,
          end: endAt,
        },
        {
          start: appointment.startAt,
          end: appointment.endAt,
        },
        {
          inclusive: true,
        }
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
  // async save(appointment: Appointment): Promise<void> {}
}
