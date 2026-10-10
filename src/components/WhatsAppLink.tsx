import { landingCopy, type LocaleProps } from "@/lib/landing-copy";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/links";

export function WhatsAppLink({ locale = "id" }: LocaleProps) {
  return (
    <a
      href={WHATSAPP_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-stone-950 bg-white px-4 py-3 text-xs font-bold text-stone-950 shadow-[3px_3px_0_#090909] transition-transform hover:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 sm:text-sm"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-[#128c4a]">
        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.43 0 .05 5.38.05 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62a11.96 11.96 0 0 0 5.87 1.5h.01C18.65 23.88 24 18.5 24 11.89a11.83 11.83 0 0 0-3.48-8.41ZM12.04 21.86a9.93 9.93 0 0 1-5.06-1.39l-.36-.21-3.66.96.98-3.57-.24-.37a9.93 9.93 0 0 1-1.52-5.29c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.04 2.92 9.9 9.9 0 0 1 2.91 7.05c0 5.49-4.47 9.96-9.96 9.96Zm5.46-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      {landingCopy[locale].community}
    </a>
  );
}
