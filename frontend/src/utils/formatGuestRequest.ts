export function formatGuestRequest(request: string) {
  const labels: Record<string, string> = {
    "no-pets-adjacent": "No pets in adjacent rooms",
    "no-smoking-neighbours": "No smoking neighbours",
    "first-floor": "On first floor",
    "second-floor": "On second floor",
    "near-lobby": "Near lobby",
    "near-elevator": "Near elevator",
    "away-from-elevator": "Away from elevator",
    quiet: "Quiet",
    smoking: "Smoking",
    "pet-friendly": "Pet friendly",
  };

  return labels[request] ?? request;
}
