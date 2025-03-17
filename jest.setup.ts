import "@testing-library/jest-dom";
import { randomUUID } from "crypto";

Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: randomUUID,
  },
});
