import { InMemoryAppointmentRepository } from "./../repositories/in-memory/in-memory-appointments-repository";
import { Appointment } from "./../entities/appointment";
import { describe, it, expect } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startAt = getFutureDate("2022-08-10");
    const endAt = getFutureDate("2022-08-11");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt,
        endAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startAt = getFutureDate("2022-08-10");
    const endAt = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "John Doe",
      startAt,
      endAt,
    });
    // expect().resolves.toBeInstanceOf(Appointment);
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate("2022-08-13"),
        endAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
