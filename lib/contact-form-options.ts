/** Options for the "Interested in" field — values are sent in enquiry emails. */
export const SERVICE_INTEREST_OPTIONS = [
  { value: "", label: "Select a service…" },
  { value: "one-to-one", label: "1:1 sessions" },
  { value: "group", label: "Group sessions" },
  { value: "home-ed", label: "Home-ed sessions" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ServiceInterestValue = Exclude<
  (typeof SERVICE_INTEREST_OPTIONS)[number]["value"],
  ""
>;

export const SERVICE_INTEREST_VALUES: ServiceInterestValue[] = [
  "one-to-one",
  "group",
  "home-ed",
  "not-sure",
];

export function isValidServiceInterest(
  v: string
): v is ServiceInterestValue {
  return (SERVICE_INTEREST_VALUES as string[]).includes(v);
}
