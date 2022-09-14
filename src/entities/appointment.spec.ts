import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startAt = getFutureDate("2022-08-10");
  const endAt = getFutureDate("2022-08-11");

  const appointment = new Appointment({
    customer: "John Doe",
    startAt,
    endAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startAt = getFutureDate("2022-08-10");
  const endAt = getFutureDate("2022-08-09");

  expect(() => {
    new Appointment({
      customer: "John Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const startAt = new Date();
  const endAt = new Date();

  startAt.setDate(startAt.getDate() - 1);
  endAt.setDate(endAt.getDate() + 3);

  expect(() => {
    new Appointment({
      customer: "John Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});
