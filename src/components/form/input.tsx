import { cn } from "@/lib/utils"
import { formStore } from "./schema"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const lang = formStore((s) => s.lang)
  const isAr = lang === "AR"
  return (
    <input
      type={type}
      data-slot="input"
      lang={isAr ? "ar" : undefined}
      dir={isAr ? "rtl" : undefined}
      className={cn(
        "text-[14px] lg:text-[16px] rounded-lg lg:rounded-xl min-w-[250px] lg:min-w-[350px] h-9 lg:h-10 bg-primay/5 border border-primary/20 px-3 lg:px-3",
        "focus:outline-none no-foucs-border",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  const lang = formStore((s) => s.lang)
  const isAr = lang === "AR"
  return (
    <textarea
      lang={isAr ? "ar" : undefined}
      dir={isAr ? "rtl" : undefined}
      className={cn(
        "text-[14px] lg:text-[16px] rounded-lg lg:rounded-xl min-w-[300px] lg:min-w-[650px] bg-primay/5 border border-primary/20 px-2 py-1 lg:py-1 min-h-[70px] lg:min-h-[100px] lg:px-3",
        "focus:outline-none no-foucs-border",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function Label({ children, className }: { className?: string, children: string }) {
  const lang = formStore((s) => s.lang)
  const isAr = lang === "AR"
  return (
    <p
      lang={isAr ? "ar" : undefined}
      dir={isAr ? "rtl" : undefined}
      className={cn(
        "pb-1.5 lg:pb-2 text-[15px] lg:text-[16px] font-bold text-black text-wrap max-w-[250px] lg:max-w-[400px]",
        className
      )}
    >
      {children}
    </p>
  )
}
export { Input, Label }


