import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input, Label, TextArea } from "./input";
import {
  fieldsErrors,
  getFieldUtils,
  formStore,
  type SchemaPartThree,
  type SchemaPartTwo,
} from "./schema";
import { uiTexts } from "./schema";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio";
import { useEffect, useState } from "react";

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

export function FormTwo() {
  const setPartTwo = formStore((state) => state.setPartTwo);
  const setStep = formStore((state) => state.setStep);
  const lang = formStore((state) => state.lang);

  const [customErrors, setCustomErrors] = useState<Map<string, string>>(new Map())

  const form = useForm({
    defaultValues: {
      knowledge_about_ignite: "",
      motivation: "",
      how_heard: "",
      has_public_speaking_experience: "yes",
      public_speaking_experience: "",
      presentation_language: "",
      talk_category: "",
      presentation_theme: "",
      theme_elaboration: "",
    },

    onSubmit: async ({ value }) => {
      if (value.has_public_speaking_experience === "yes") {
        if (value.public_speaking_experience.length < 5) {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.set('public_speaking_experience',
              fieldsErrors.tooShort(5, 'public_speaking_experience', lang) ?? "")
            return newMap
          })
          return;
        }

      }
      const partTwoData: SchemaPartTwo = {
        knowledge_about_ignite: value.knowledge_about_ignite,
        motivation: value.motivation,
        how_heard: value.how_heard as "social_media" | "friend" | "other",
        has_public_speaking_experience: value.has_public_speaking_experience as
          | "yes"
          | "no",
        public_speaking_experience: value.public_speaking_experience,
        presentation_language: value.presentation_language,
        talk_category: value.talk_category,
        presentation_theme: value.presentation_theme,
        theme_elaboration: value.theme_elaboration,
      };
      setPartTwo(partTwoData);
      setStep(3);
    },
  });

  const { next, step, getLabel, getPlaceholder } = getFieldUtils(lang);

  useEffect(() => {
    form.validateAllFields("submit");
  });

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-start gap-2 mb-5 lg:mb-10">
        <p className="text-[24px] lg:text-[65px] text-primary font-display">
          {step}
        </p>
        <p className="text-[14px] lg:text-[35px] text-primary">2/3</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex justify-center  lg:justify-start lg:w-[850px]"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col items-start lg:items-start gap-x-20  gap-y-3 lg:gap-y-4 lg:h-[920px] lg:w-[850px] ">
            <form.Field
              name="knowledge_about_ignite"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("knowledge_about_ignite", lang)
                    : value.length < 3
                      ? fieldsErrors.tooShort(3, "knowledge_about_ignite", lang)
                      : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("knowledge_about_ignite")}</Label>
                    <TextArea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("knowledge_about_ignite")}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name="motivation"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("motivation", lang)
                    : value.length < 8
                      ? fieldsErrors.tooShort(8, "motivation", lang)
                      : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("motivation")}</Label>
                    <TextArea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("motivation")}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-20">
              <form.Field
                name="how_heard"
                validators={{
                  onChange: ({ value }) =>
                    !value ? fieldsErrors.required("how_heard", lang) : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("how_heard")}</Label>
                      <RadioGroup
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        className="flex flex-col gap-1 text-[14px] lg:text[16px]"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) =>
                              field.handleChange(
                                e.currentTarget.value as "social_media" | "friend" | "other",
                              )
                            }
                            value="social_media"
                            id="social_media"
                          />
                          <span>{uiTexts[lang ?? 'EN'].howHeard_social_media}</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) =>
                              field.handleChange(
                                e.currentTarget.value as "social_media" | "friend" | "other",
                              )
                            }
                            value="friend"
                            id="friend"
                          />
                          <span>{uiTexts[lang ?? 'EN'].howHeard_friend}</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) =>
                              field.handleChange(
                                e.currentTarget.value as "social_media" | "friend" | "other",
                              )
                            }
                            value="other"
                            id="other"
                          />
                          <span>{uiTexts[lang ?? 'EN'].howHeard_other}</span>
                        </label>
                      </RadioGroup>

                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="has_public_speaking_experience"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("has_public_speaking_experience", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("has_public_speaking_experience")}</Label>
                      <RadioGroup
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        className="flex flex-col gap-1  text-[14px] lg:text-[16px]"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) =>
                              field.handleChange(
                                e.currentTarget.value as "yes" | "no",
                              )
                            }
                            value="yes"
                            id="yes"
                          />
                          <span>{uiTexts[lang ?? 'EN'].yes}</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) =>
                              field.handleChange(
                                e.currentTarget.value as "yes" | "no",
                              )
                            }
                            value="no"
                            id="no"
                          />
                          <span>{uiTexts[lang ?? 'EN'].no}</span>
                        </label>
                      </RadioGroup>


                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            </div>

            <form.Subscribe
              selector={(state) => state.values.has_public_speaking_experience}
              children={(has_public_speaking_experience) => {
                if (has_public_speaking_experience === "no") return <></>;
                return (
                  <form.Field
                    name="public_speaking_experience"
                    children={(field) => {
                      return (
                        <div>
                          <Label>{getLabel("public_speaking_experience")}</Label>
                          <TextArea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder={getPlaceholder("public_speaking_experience")}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="lg:w-full"
                          />
                          {customErrors.get('public_speaking_experience') &&
                            <p
                              className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                            >{customErrors.get('public_speaking_experience')}</p>}
                          <FieldInfo field={field} />
                        </div>
                      );
                    }}
                  />
                );
              }}
            />
            <form.Field
              name="presentation_language"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("presentation_language", lang)
                    : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("presentation_language")}</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("presentation_language")}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <form.Field
                name="talk_category"
                validators={{
                  onChange: ({ value }) =>
                    !value ? fieldsErrors.required("talk_category", lang) : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("talk_category")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("talk_category")}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="lg:w-[300px]"
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="presentation_theme"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("presentation_theme", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("presentation_theme")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("presentation_theme")}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="lg:w-[300px]"
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            </div>
            <form.Field
              name="theme_elaboration"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("theme_elaboration", lang)
                    : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("theme_elaboration")}</Label>
                    <TextArea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("theme_elaboration")}
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
              onClick={() => setStep(1)}
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
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "..." : next}
                  <Arrow />
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


