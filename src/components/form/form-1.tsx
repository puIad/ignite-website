import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input, Label } from "./input";
import {
  fieldsErrors,
  getFieldUtils,
  formStore,
  type SchemaPartOne,
} from "./schema";
import { uiTexts } from "./schema";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export function FormOne() {
  const setPartOne = formStore((state) => state.setPartOne);
  const setStep = formStore((state) => state.setStep);
  const lang = formStore((state) => state.lang);
  const partOne = formStore((s) => s.partOne);
  const [customErrors, setCustomErrors] = useState<Map<string, string>>(new Map())

  const form = useForm({
    defaultValues: {
      email: partOne.email ?? "",
      first_name: partOne.first_name ?? "",
      last_name: partOne.last_name ?? "",
      phone: partOne.phone ?? "",
      discord_username: partOne.discord_username ?? "",
      date_of_birth: partOne.date_of_birth ?? "",
      wilaya: partOne.wilaya ?? "",
      is_student: partOne.is_student ?? ("yes" as "yes" | "no"),
      university: partOne.university ?? "",
      degree_and_major: partOne.degree_and_major ?? "",
      occupation: partOne.occupation ?? "",
    },
    onSubmit: async ({ value }) => {
      if (value.is_student === "yes") {
        let error = false;
        if (value.university.length < 3) {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.set('university', fieldsErrors.tooShort(3, 'university', lang) ?? "")
            return newMap
          })
          error = true;
        }
        else {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.delete('university')
            return newMap
          })

        }

        if (value.degree_and_major.length < 3) {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.set('degree_and_major', fieldsErrors.tooShort(3, 'degree_and_major', lang) ?? "")
            return newMap
          })
          error = true;
        } else {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.delete('degree_and_major')
            return newMap
          })

        }
        if (error) return;

      } else if (value.is_student === "no") {
        let error = false

        if (value.occupation.length < 3) {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.set('occupation', fieldsErrors.tooShort(3, 'occupation', lang) ?? "")
            return newMap
          })
          error = true;
        } else {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.delete('occupation')
            return newMap
          })

        }
        if (error) return;
      }
      const partOneData: SchemaPartOne = {
        email: value.email,
        first_name: value.first_name,
        last_name: value.last_name,
        phone: value.phone,
        discord_username: value.discord_username,
        date_of_birth: value.date_of_birth,
        wilaya: value.wilaya,
        is_student: value.is_student,
        university: (value as any).university ?? "",
        degree_and_major: (value as any).degree_and_major ?? "",
        occupation: (value as any).occupation ?? "",
      };
      setPartOne(partOneData);
      setStep(2);
    },
  });

  const { step, next, getLabel, getPlaceholder } = getFieldUtils(lang);

  return (
    <div className="">
      <div className="flex justify-start gap-2 w-full mb-5 lg:mb-10">
        <p className={`text-[24px] lg:text-[65px] text-primary font-display ${lang === 'AR' ? 'font-splart' : ''}`}>
          {step}
        </p>
        <p className="text-[14px] lg:text-[35px] text-primary">1/3</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex justfiy-center lg:justify-start"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
              <form.Field
                name="first_name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("first_name", lang)
                      : value.length < 3
                        ? fieldsErrors.tooShort(3, "first_name", lang)
                        : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("first_name")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("first_name")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="last_name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("last_name", lang)
                      : value.length < 3
                        ? fieldsErrors.tooShort(3, "last_name", lang)
                        : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("last_name")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("last_name")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("email", lang)
                      : !value.includes("@")
                        ? fieldsErrors.invalid("email", lang)
                        : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("email")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("email")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) =>
                    !value ? fieldsErrors.required("phone", lang) : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("phone")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("phone")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="discord_username"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("discord_username", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("discord_username")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("discord_username")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="date_of_birth"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("date_of_birth", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("date_of_birth")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="date"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("date_of_birth")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="wilaya"
                validators={{
                  onChange: ({ value }) =>
                    !value ? fieldsErrors.required("wilaya", lang) : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("wilaya")}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("wilaya")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="is_student"
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("is_student")}</Label>
                      <RadioGroup
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        className="flex flex-row gap-6 text-[14px] lg:text-[16px]"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) => {
                              console.log('form errors : ', form.getAllErrors())
                              field.handleChange(
                                e.currentTarget.value as "yes" | "no"
                              )
                            }}
                            value="yes"
                            id="option-yes"
                          />
                          <span className="pt-1.5">{uiTexts[lang ?? 'EN'].yes}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) => {
                              field.handleChange(
                                e.currentTarget.value as "yes" | "no"
                              )
                            }}
                            value="no"
                            id="option-no"
                          />
                          <span className="pt-1.5">{uiTexts[lang ?? 'EN'].no}</span>
                        </label>
                      </RadioGroup>

                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

            </div>
            <div className="lg:mt-4">
              <form.Subscribe
                selector={(state) => state.values.is_student}
                children={(is_student) => {
                  console.log('is sutdent :', is_student)
                  if (is_student === "no") {
                    return (
                      <form.Field
                        name="occupation"
                        children={(field) => {
                          return (
                            <div>
                              <Label>{getLabel("occupation")}</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                placeholder={getPlaceholder("occupation")}
                                onChange={(e) => {
                                  field.handleChange(e.target.value)
                                }}
                                className=""
                              />

                              {customErrors.get('occupation') &&
                                <p
                                  className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                                >{customErrors.get('occupation')}</p>}
                              <FieldInfo field={field} />
                            </div>
                          );
                        }}
                      />
                    )
                  } else if (is_student === "yes") {
                    return <div className="flex flex-col lg:flex-row gap-3  lg:gap-20">
                      <form.Field
                        name="university"
                        children={(field) => {
                          return (
                            <div>
                              <Label>{getLabel("university")}</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                placeholder={getPlaceholder("university")}
                                onChange={(e) => field.handleChange(e.target.value)}
                              />

                              {customErrors.get('university') &&
                                <p
                                  className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                                >{customErrors.get('university')}</p>}
                              <FieldInfo field={field} />
                            </div>
                          );
                        }}
                      />

                      <form.Field
                        name="degree_and_major"
                        children={(field) => {
                          return (
                            <div>
                              <Label>{getLabel("degree_and_major")}</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                placeholder={getPlaceholder("degree_and_major")}
                                onChange={(e) => field.handleChange(e.target.value)}
                              />
                              {customErrors.get('degree_and_major') &&
                                <p
                                  className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                                >{customErrors.get('degree_and_major')}</p>}
                              <FieldInfo field={field} />
                            </div>
                          );
                        }}
                      />
                    </div>
                  }
                }}
              />

            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-20">
            <button
              type="button"
              className="text-[14px] lg:text-[16px] px-4 py-2.75 lg:px-10 lg:py-3 rounded-xl lg:rounded-2xl text-bold bg-primary/5 border-primary/30 border flex gap-4 items-center text-primary font-bold uppercase"
              onClick={() => setStep(0)}
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
      </form >
    </div >
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
