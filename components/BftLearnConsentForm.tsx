"use client";

import { useState } from "react";

const API_ENDPOINT = "https://bft-api.onrender.com/web/bft-learn-consent";

export function BftLearnConsentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const isFormValid = email.trim() !== "" && consent;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid) {
      setStatus("error");
      setErrorMessage("Please provide your email and agree to the terms.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      email: email.trim(),
      consent: consent,
    };

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          body.error || body.message || "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="your.email@example.com"
        />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-6 items-center">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-primary-600 shadow-sm focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          />
        </div>
        <label htmlFor="consent" className="text-sm text-slate-700">
          I have read and agree to the terms and conditions outlined above, and I
          consent to participate in the BFT Learn test program.
        </label>
      </div>

      {status === "error" && errorMessage && (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Thank you for your consent. We&apos;ve received your submission and
          will be in touch with next steps.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading" || !isFormValid}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/15 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Submitting…" : "Submit consent"}
        </button>
        {!isFormValid && status !== "loading" && status !== "success" && (
          <p className="mt-2 text-xs text-slate-500">
            Please provide your email and agree to the terms to submit.
          </p>
        )}
      </div>
    </form>
  );
}
