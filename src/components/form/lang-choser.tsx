import { cn } from "@/lib/utils"
import { formStore, uiTexts } from "./schema"
import { useNavigate, useRouter } from "@tanstack/react-router"
export function LangChoser() {
  const setLang = formStore(state => state.setLang)
  const setStep = formStore(state => state.setStep)
  const lang = formStore(state => state.lang)
  const router = useRouter()

  return (
    <div>
      <div className="h-full flex flex-col items-start">
        <p className={`text-[20px] lg:text-[65px] text-primary font-bold uppercase font-display mb-5 lg:mb-10 ${lang === 'AR' ? 'font-splart' : ''}`}>{uiTexts[lang ?? 'EN'].chooseLanguage}</p>

        <div className="w-full lg:w-[850px] flex flex-col gap-4 items-start">
          <button
            onClick={() => {
              setLang('FR')
            }}
            className={
              cn("text-[14px] lg:text-[18px] px-6 lg:px-11 py-2 lg:py-3 rounded-xl border font-bold border-primary/20 bg-white/10 text-primary w-[150px] lg:w-[300px]",
                lang === "FR" && "bg-primary text-white"
              )}>
            Français
          </button>
          <button
            onClick={() => {
              setLang('AR')
            }}
            className={
              cn("text-[14px] lg:text-[18px] px-6 lg:px-11 py-2 lg:py-3 rounded-xl border font-bold border-primary/20 bg-white/10 text-primary w-[150px] lg:w-[300px]",
                lang === "AR" && "bg-primary text-white"
              )}>
            العربية
          </button>
          <button
            onClick={() => {
              setLang('EN')
            }}
            className={
              cn("text-[14px] lg:text-[18px] px-6 lg:px-11 py-2 lg:py-3 rounded-xl border font-bold border-primary/20 bg-white/10 text-primary w-[150px] lg:w-[300px]",
                lang === "EN" && "bg-primary text-white"
              )}>
            English
          </button>

          <button
            className="px-6 py-2 lg:px-10 lg:py-3 mt-10 lg:mt-20 text-[14px] lg:text-[16px] rounded-xl lg:rounded-2xl text-bold bg-primary flex gap-4 items-center text-white font-bold uppercase disabled:opacity-50"
            type="submit"
            disabled={!lang}
            onClick={() => {
              if (lang) {
                setStep(1)
                router.navigate({ to: '/register-speaker' })
              }
            }}
          >
            {uiTexts[lang ?? 'EN'].nextStep}
            <Arrow />
          </button>

        </div>
      </div>
    </div>
  )
}
function Arrow() {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.46721 4.1121L0 8.22412L9.86885 4.1121L0.411201 7.24074e-05L2.46721 4.1121Z"
        fill="white"
      />
    </svg>
  );
}

