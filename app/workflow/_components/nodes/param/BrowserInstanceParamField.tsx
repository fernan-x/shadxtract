"use client";

import React from "react";
import { BaseParamFieldProps } from "./StringParamField";

export default function BrowserInstanceParamField({
  param,
}: BaseParamFieldProps) {
  return <p className="text-xs">{param.name}</p>;
}
