import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input, Label, TextArea } from "./input";
import {
  fieldsErrors,
  getFieldUtils,
  formStore,
  type SchemaPartOne,
} from "./schema";
import { cn } from "@/lib/utils";

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

export function BuyTicketFormOne() {
  const setPartOne = formStore((state) => state.setPartOne);
  const setStep = formStore((state) => state.setStep);
  const lang = formStore((state) => state.lang);
  const partOne = formStore((s) => s.partOne);

  const form = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      how_heard: "",
      which_lang: "EN",
      anything_toknow: "",
      // email: "",
      // first_name: "ahmed",
      // last_name: "hassaine",
      // phone: "05123213",
      // how_heard: "from the internet my friend",
      // anything_toknow: "nothing",
      // which_lang: "EN",
    },
    onSubmit: async ({ value }) => {
      const partOneData: SchemaPartOne = {
        email: value.email,
        first_name: value.first_name,
        last_name: value.last_name,
        phone: value.phone,
        how_heard: value.how_heard,
        which_lang: value.which_lang as "EN" | "AR" | "FR",
        anything_toknow: value.anything_toknow,
      };
      setPartOne(partOneData);
      setStep(2);
    },
  });

  const { step, next, getLabel, getPlaceholder } = getFieldUtils(lang);

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex justfiy-center lg:justify-start"
      >
        <div className="h-full flex flex-col lg:justify-between mb-10">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-20 gap-y-8">
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
                name="which_lang"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("which_lang", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("which_lang")}</Label>
                      <RadioGroup
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        className="flex flex-row gap-6 text-[14px] lg:text-[16px] lg:py-2"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) => {
                              field.handleChange(
                                e.currentTarget.value as "EN" | "AR" | "FR"
                              )
                            }}
                            value="EN"
                            id="option-en"
                          />
                          <span className="">EN</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) => {
                              field.handleChange(
                                e.currentTarget.value as "EN" | "AR" | "FR"
                              )
                            }}
                            value="AR"
                            id="option-ar"
                          />
                          <span className="">AR</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem
                            onClick={(e) => {
                              field.handleChange(
                                e.currentTarget.value as "EN" | "AR" | "FR"
                              )
                            }}
                            value="FR"
                            id="option-fr"
                          />
                          <span className="">FR</span>
                        </label>
                      </RadioGroup>

                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

            </div>
            <div className="flex flex-col gap-4">

              <form.Field
                name="how_heard"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? fieldsErrors.required("how_heard", lang)
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <div>
                      <Label>{getLabel("how_heard")}</Label>
                      <TextArea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("how_heard")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
              <form.Field
                name="anything_toknow"
                children={(field) => {
                  return (
                    <div className="lg:col-span-2">
                      <Label>{getLabel("anything_toknow")}</Label>
                      <TextArea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={getPlaceholder("anything_toknow")}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-20">
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
