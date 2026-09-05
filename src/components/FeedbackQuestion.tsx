import {
  hasOther, questionLabel, toggleFeedbackChoice,
  type FeedbackErrors, type FeedbackField, type FeedbackPayload,
  type FeedbackQuestion as Question, type FeedbackValue,
} from "@/lib/feedback";

const inputClass = "w-full p-3 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm";

interface Props {
  question: Question;
  data: FeedbackPayload;
  errors: FeedbackErrors;
  onChange: (field: FeedbackField, value: FeedbackValue) => void;
}

export function FeedbackQuestion({ question: q, data, errors, onChange }: Props) {
  const value = data[q.field];
  const error = errors[q.field];
  const description = [q.hint || q.kind === "multi" ? `${q.field}-hint` : "", error ? `${q.field}-error` : ""].filter(Boolean).join(" ") || undefined;
  const title = <>{questionLabel(q, data)} {q.optional ? <span className="font-medium text-xs">(opsional)</span> : <span className="text-red-600" aria-label="wajib">*</span>}</>;
  const hints = <>
    {(q.hint || q.kind === "multi") && <p id={`${q.field}-hint`} className="text-xs text-gray-700 mb-3">{q.hint}{q.kind === "multi" && " Bisa pilih lebih dari satu."}</p>}
    {error && <p id={`${q.field}-error`} role="alert" className="text-sm font-semibold text-red-700 mb-2">{error}</p>}
  </>;

  if (q.kind === "single" || q.kind === "multi") {
    return (
      <fieldset data-field={q.field} aria-describedby={description} aria-invalid={Boolean(error)}>
        <legend className="text-base sm:text-lg font-black mb-2 tracking-tight">{title}</legend>
        {hints}
        <div className={q.field === "active_days_last_week" ? "grid grid-cols-4 gap-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
          {q.options?.map((option, index) => {
            const selected = Array.isArray(value) ? value.includes(String(option)) : value === option;
            return (
              <button
                key={String(option)} type="button" aria-pressed={selected}
                onClick={() => onChange(q.field, q.kind === "multi"
                  ? toggleFeedbackChoice(Array.isArray(value) ? value : [], String(option), q.exclusive)
                  : option)}
                className={`text-left p-3 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c70da] ${selected
                  ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909]"
                  : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"}`}
              >
                <span aria-hidden="true" className="w-6 h-6 flex items-center justify-center rounded-md bg-[#090909]/10 text-xs font-black shrink-0">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{q.optionLabels?.[index] ?? String(option)}</span>
                {selected && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
        {q.otherField && hasOther(value) && (
          <div className="mt-3" data-field={q.otherField}>
            <label htmlFor={q.otherField} className="block text-sm font-semibold mb-1">Sebutkan lainnya <span className="text-red-600">*</span></label>
            <input id={q.otherField} name={q.otherField} required maxLength={2000} className={inputClass}
              value={String(data[q.otherField])} onChange={event => onChange(q.otherField!, event.target.value)}
              aria-invalid={Boolean(errors[q.otherField])} aria-describedby={errors[q.otherField] ? `${q.otherField}-error` : undefined} />
            {errors[q.otherField] && <p id={`${q.otherField}-error`} role="alert" className="text-sm font-semibold text-red-700 mt-2">{errors[q.otherField]}</p>}
          </div>
        )}
      </fieldset>
    );
  }

  const inputProps = {
    id: q.field, name: q.field, value: typeof value === "string" ? value : "",
    required: !q.optional, maxLength: 2000, className: inputClass,
    "aria-invalid": Boolean(error), "aria-describedby": description,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(q.field, event.target.value),
  };
  return (
    <div data-field={q.field}>
      <label htmlFor={q.field} className="block text-base sm:text-lg font-black mb-2 tracking-tight">{title}</label>
      {hints}
      {q.kind === "textarea" ? <textarea {...inputProps} rows={3} /> : <input {...inputProps} type={q.kind} autoComplete={q.field === "name" ? "name" : q.kind === "email" ? "email" : "off"} />}
    </div>
  );
}
