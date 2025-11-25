import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { Label, TextArea } from "./input";
import {
  fieldsErrors,
  formStore,
  getFieldUtils,
  type FullSchema,
  type SchemaPartThree,
  uiTexts,
} from "./schema";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export function FormThree() {
  const setPartThree = formStore((state) => state.setPartThree);
  const setStep = formStore((state) => state.setStep);
  const lang = formStore((state) => state.lang);
  const partOne = formStore((state) => state.partOne);
  const partTwo = formStore((state) => state.partTwo);
  const setPartTwo = formStore((state) => state.setPartTwo);
  const partThree = formStore((s) => s.partThree);
  const [submssion, setSubmission] = useState<"pending" | "success" | "failure">("pending");
  const [customErrors, setCustomErrors] = useState<Map<string, string>>(new Map())
  const [loading, setIsLoading] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const setPartOne = formStore((state) => state.setPartOne);

  const form = useForm({
    defaultValues: {
      duo_talk_preference: partThree.duo_talk_preference ?? "no_solo",
      partner_name_and_relationship: partThree.partner_name_and_relationship ?? "",
      interview_preference: partThree.interview_preference ?? "online",
      additional_info: partThree.additional_info ?? "",
    },
    onSubmit: async ({ value }) => {

      const partThreeData: SchemaPartThree = {
        duo_talk_preference: value.duo_talk_preference as
          | "yes_with_partner"
          | "no_solo"
          | "no_but_open",
        partner_name_and_relationship: value.partner_name_and_relationship,
        interview_preference: value.interview_preference as
          | "online"
          | "in_person",
        additional_info: value.additional_info,
      };

      setPartThree(partThreeData);

      const fullData: FullSchema = {
        ...partOne,
        ...partTwo,
        ...partThreeData,
      };

      // Previously there was a validation that rejected non-Arabic (Latin) characters
      // when `lang === 'AR'`. That restriction was removed so Arabic registrations
      // may include Latin/non-Arabic characters. No action needed here.

      try {
        setSubmissionError(null);
        setIsLoading(true);
        const API_BASE = import.meta.env.DEV ? "" : "https://ignite-backend-el33.onrender.com";

        try {
          // convex call
          const res = await fetch("https://outgoing-caribou-968.convex.cloud/api/action", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              path: "speakers:register",
              args: { jsonString: fullData },
              format: "json"
            })
          })
          const convexRes = await res.json()
          // console.log('convex res :', convexRes)
          if (convexRes.status === "success") {
            console.log('sent to convex successfully')
            setSubmission("success");
            setSubmissionError(null);
          }
          else {
            const serverMessage = "Server error, please try again, or contact us at our socials."
            setSubmissionError(serverMessage);
            setSubmission("failure");
          }
        } catch (e) {
          console.log('[CONVEX] catched error while sending to convex :', e)
        }

        // wake up call to dajgno server
        try {
          const res = await fetch(`${API_BASE}/api/participants/register/`, {
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fullData),
          });

          let result: any = null;
          try {
            result = await res.json();
          } catch (e) {
          }
        } catch (e) {
          console.log('error waking up djanog ;', e)
        }

        // if (res.ok) {
        //   setSubmission("success");
        //   setSubmissionError(null);
        // } else {
        //   console.error("Server error:", res.status, result);
        //   // if backend returns field-specific errors, map them to customErrors
        //   if (result && typeof result === "object") {
        //     setCustomErrors((prev) => {
        //       const newMap = new Map(prev);
        //       Object.entries(result).forEach(([k, v]) => {
        //         newMap.set(k, typeof v === "string" ? v : JSON.stringify(v));
        //       });
        //       return newMap;
        //     });
        //   }
        //   const serverMessage = result && typeof result === 'object' ? JSON.stringify(result) : String(result ?? `status ${res.status}`);
        //   setSubmissionError(serverMessage);
        //   setSubmission("failure");
        // }
        setIsLoading(false);
      } catch (error) {
        console.error("Submission error:", error);
        setIsLoading(false);
        setSubmission("failure");
        setSubmissionError(error instanceof Error ? error.message : String(error));
      }
    },
  });

  const { next, step, getLabel, getPlaceholder } = getFieldUtils(lang);

  if (submssion === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        <div className="flex justify-center gap-2 mb-5 lg:mb-10">
          <p className="text-[24px] lg:text-[65px] text-primary font-display">
            Success!
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            className="h-30"
            src="/images/tick.svg" />
          <h2 className={`text-[20px] lg:text-[40px] text-primary ${lang === 'AR' ? 'madani-bold' : 'font-bold'}`}>
            {lang === "AR"
              ? "تم إرسال طلبك بنجاح!"
              : lang === "FR"
                ? "Votre demande a été envoyée avec succès!"
                : "Your registration has been submitted successfully!"}
          </h2>
          <p className={`text-[14px] lg:text-[20px] text-primary/80 ${lang === 'AR' ? 'madani-light' : ''}`}>
            {lang === "AR"
              ? "شكراً لك على التسجيل. سنتواصل معك قريباً."
              : lang === "FR"
                ? "Merci pour votre inscription. Nous vous contacterons bientôt."
                : "Thank you for registering. We'll be in touch soon."}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              // reset stored form parts and go back to first step
              setPartOne({
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
                discord_username: "",
                date_of_birth: "",
                wilaya: "",
                is_student: "no",
                university: "",
                degree_and_major: "",
                occupation: "",
              });
              setPartTwo({
                knowledge_about_ignite: "",
                motivation: "",
                how_heard: "social_media",
                has_public_speaking_experience: "no",
                public_speaking_experience: "",
                presentation_language: "",
                talk_category: "",
                presentation_theme: "",
                theme_elaboration: "",
              });
              setPartThree({
                duo_talk_preference: "no_solo",
                partner_name_and_relationship: "",
                interview_preference: "online",
                additional_info: "",
              });
              setSubmission("pending");
              setIsLoading(false);
              setCustomErrors(new Map());
              setSubmissionError(null);
              setStep(1);
            }}
            className={`font-bold font-sans uppercase rounded-full ${lang === 'AR' ? 'font-splart' : ''} bg-primary text-white shadow-[0_0_35px_0_rgba(117,11,43,0.6)] px-6 lg:px-10 py-2.5 lg:py-3`}
          >
            <p className="leading-[1.2] lg:leading-none text-[12px] lg:text-[20px]">{uiTexts[lang ?? 'EN'].submitAnother}</p>
          </button>
        </div>
      </div>
    );
  } else if (submssion === 'failure') {

    return (
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        <div className="flex justify-center gap-2 mb-5 lg:mb-10">
          <p className="text-[24px] lg:text-[65px] text-red-600 font-display">
            Failed
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <img
            className="h-30"
            src="/images/error.svg"
          />
          <h2 className={`text-[20px] lg:text-[40px] ${lang === 'AR' ? 'madani-bold' : 'font-bold'} text-red-600`}>
            {lang === "AR"
              ? "فشل في إرسال الطلب"
              : lang === "FR"
                ? "Échec de l’envoi de la demande"
                : "Failed to submit your request"}
          </h2>

          <p className={`text-[14px] lg:text-[20px] text-red-600/80 ${lang === 'AR' ? 'madani-light' : ''}`}>
            {lang === "AR"
              ? "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى."
              : lang === "FR"
                ? "Une erreur est survenue lors du traitement. Veuillez réessayer."
                : "An error occurred while processing your request. Please try again."}
          </p>
          {submissionError ? (
            <pre className="text-[12px] lg:text-[14px] text-red-500/90 max-w-[700px] whitespace-pre-wrap break-words mt-2">{submissionError}</pre>
          ) : null}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              // reset and allow another submission
              setPartOne({
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
                discord_username: "",
                date_of_birth: "",
                wilaya: "",
                is_student: "no",
                university: "",
                degree_and_major: "",
                occupation: "",
              });
              setPartTwo({
                knowledge_about_ignite: "",
                motivation: "",
                how_heard: "social_media",
                has_public_speaking_experience: "no",
                public_speaking_experience: "",
                presentation_language: "",
                talk_category: "",
                presentation_theme: "",
                theme_elaboration: "",
              });
              setPartThree({
                duo_talk_preference: "no_solo",
                partner_name_and_relationship: "",
                interview_preference: "online",
                additional_info: "",
              });
              setSubmission("pending");
              setIsLoading(false);
              setCustomErrors(new Map());
              setSubmissionError(null);
              setStep(1);
            }}
            className={`font-bold font-sans uppercase rounded-full ${lang === 'AR' ? 'font-splart' : ''} bg-primary text-white shadow-[0_0_35px_0_rgba(117,11,43,0.6)] px-6 lg:px-10 py-2.5 lg:py-3`}
          >
            <p className="leading-[1.2] lg:leading-none text-[12px] lg:text-[20px]">{uiTexts[lang ?? 'EN'].submitAnother}</p>
          </button>
        </div>
      </div>
    );

  }

  return (
    <div>
      <div className="flex justify-start gap-2 lg:mb-10">
        <p className={`text-[24px] lg:text-[65px] text-primary font-display ${lang === 'AR' ? 'font-splart' : ''} uppercase`}>
          {step}
        </p>
        <p className="text-[14px] lg:text-[35px] text-primary">3/3</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex justify-center"
      >
        <div>
          <div className="flex flex-col gap-x-20 gap-y-4 w-[320px] lg:w-[850px] px-3">
            <form.Field
              name="duo_talk_preference"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("duo_talk_preference", lang)
                    : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("duo_talk_preference")}</Label>
                    <RadioGroup
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      className="flex flex-col gap-3 lg:gap-2 text-[14px] lg:text-[16px]"
                    >
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="yes_with_partner"
                          id="option-yes-with-partner"
                        />
                        <span>{uiTexts[lang ?? 'EN'].duo_yes_with_partner}</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="no_solo"
                          id="option-no-solo"
                        />
                        <span>{uiTexts[lang ?? 'EN'].duo_no_solo}</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="no_but_open"
                          id="option-no-but-open"
                        />
                        <span>
                          {uiTexts[lang ?? 'EN'].duo_no_but_open}
                        </span>
                      </label>
                    </RadioGroup>

                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
            <form.Subscribe
              selector={(state) => state.values.duo_talk_preference}
              children={(duo_talk_preference) => {
                if (duo_talk_preference !== "yes_with_partner") return <></>;
                return (
                  <form.Field
                    name="partner_name_and_relationship"
                    children={(field) => {
                      return (
                        <div>
                          <Label>{getLabel("partner_name_and_relationship")}</Label>
                          <TextArea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder={getPlaceholder("partner_name_and_relationship")}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {customErrors.get('partner_name_and_relationship') &&
                            <p
                              className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                            >{customErrors.get('partner_name_and_relationship')}</p>}
                          <FieldInfo field={field} />
                        </div>
                      );
                    }}
                  />
                );
              }}
            />

            <form.Field
              name="interview_preference"
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("interview_preference")}</Label>
                    <RadioGroup
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      className="flex flex-row gap-6  text-[14px] lg:text-[16px]"
                    >
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as "online" | "in_person",
                            )
                          }
                          value="online"
                          id="option-online"
                        />
                        <span>{uiTexts[lang ?? 'EN'].online}</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as "online" | "in_person",
                            )
                          }
                          value="in_person"
                          id="option-in-person"
                        />
                        <span>{uiTexts[lang ?? 'EN'].inPerson}</span>
                      </label>
                    </RadioGroup>

                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name="additional_info"
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("additional_info")}</Label>
                    <TextArea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("additional_info")}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-10">
            <button
              type="button"
              className="text-[14px] lg:text-[16px] px-4 py-2.75 lg:px-10 lg:py-3 rounded-xl lg:rounded-2xl text-bold bg-primary/5 border-primary/30 border flex gap-4 items-center text-primary font-bold uppercase"
              onClick={() => setStep(2)}
            >
              {uiTexts[lang ?? 'EN'].goBack}
              <div className="rotate-180">
                <Arrow fill="#750B2B" />
              </div>
            </button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  className="text-[14px] lg:text-[16px] text-white font-bold px-4 py-3 lg:px-10 lg:py-3 rounded-xl lg:rounded-2xl text-bold bg-primary flex gap-4 items-center text-whitefont-bold uppercase disabled:opacity-20 disabled:bg-primary/20"
                  type="submit"
                  disabled={!!isSubmitting || loading}
                >
                  {loading ? uiTexts[lang ?? 'EN'].sending : <><p>{uiTexts[lang ?? 'EN'].submit}</p> <Arrow /></>}
                </button>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function Arrow({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill={fill ?? "white"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("scale-125", className)}
    >
      <path
        d="M2.46721 4.1121L0 8.22412L9.86885 4.1121L0.411201 7.24074e-05L2.46721 4.1121Z"
        fill={fill ?? "white"}
      />
    </svg>
  );
}


