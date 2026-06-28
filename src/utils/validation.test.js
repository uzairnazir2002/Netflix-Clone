import { describe, expect, it } from "vitest";
import {
  isAlphabeticName,
  isStrongPassword,
  isValidEmail,
  isValidUsername,
} from "./validation";

describe("validation helpers", () => {
  it("accepts a valid email", () => {
    expect(isValidEmail("student@example.com")).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(isValidEmail("student@")).toBe(false);
  });

  it("accepts usernames with letters and numbers", () => {
    expect(isValidUsername("coder2026")).toBe(true);
  });

  it("rejects usernames without numbers", () => {
    expect(isValidUsername("coder")).toBe(false);
  });

  it("accepts strong passwords", () => {
    expect(isStrongPassword("Strong@123")).toBe(true);
  });

  it("rejects weak passwords", () => {
    expect(isStrongPassword("weakpass")).toBe(false);
  });

  it("accepts alphabetic names", () => {
    expect(isAlphabeticName("Adeel Khan")).toBe(true);
  });

  it("rejects names with digits", () => {
    expect(isAlphabeticName("Adeel1")).toBe(false);
  });
});
