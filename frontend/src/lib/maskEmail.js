// "sanket.k@gmail.com" -> "san****@gmail.com"
export default function maskEmail(email) {
  const [local, domain] = (email || "").split("@");
  if (!local || !domain) return email || "";
  const visible = local.slice(0, Math.min(3, local.length));
  return `${visible}****@${domain}`;
}