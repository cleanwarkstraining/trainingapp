import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronRight, ChevronLeft, Play, Volume2, VolumeX,
  CheckCircle2, Circle, Award, Search, Droplets, AlertTriangle,
  Clock, Wrench, FlaskConical, Sparkles, Home, BookOpen,
  Zap, User, X, ChevronDown, ListChecks, HelpCircle,
  Bath, Bed, ChefHat, Sofa, Wind, Star, ShieldCheck,
  GraduationCap, Eye, Hand, RotateCw, Check, Plus,
  Lock, Settings, Languages, Users, FileText, BarChart3,
  ArrowRight, Trophy, Smile
} from "lucide-react";

/* ======================================================================
   FONTS — loaded from Google Fonts on mount
   ====================================================================== */
function useFonts() {
  useEffect(() => {
    if (document.getElementById("cw-fonts")) return;
    const link = document.createElement("link");
    link.id = "cw-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Malayalam:wght@400;500;700&family=Hind:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const DISPLAY = '"Bricolage Grotesque", "Plus Jakarta Sans", system-ui, sans-serif';
const BODY_BY_LANG = {
  en: '"Plus Jakarta Sans", system-ui, sans-serif',
  hi: '"Hind", "Plus Jakarta Sans", system-ui, sans-serif',
  ml: '"Noto Sans Malayalam", "Plus Jakarta Sans", system-ui, sans-serif'
};

/* ======================================================================
   TRANSLATIONS — production lives in /messages/{lang}.json (next-intl)
   Add a language: copy this object, translate values, add to LANG_LIST.
   ====================================================================== */
const T = {
  en: {
    code: "en", name: "English", native: "English", speech: "en-IN",
    welcome: "Welcome to Clean Warks", welcomeSub: "Training that fits in your pocket",
    chooseLang: "Choose your language", chooseLangSub: "You can change it anytime",
    tapYourFace: "Tap your photo to log in", askSupervisor: "Ask your supervisor if you are not listed",
    enterPin: "Enter your 4-digit PIN", forgotPin: "Forgot? Ask your supervisor",
    continue: "Continue", hello: "Namaste",
    todayProgress: "Today's progress", dayStreak: "day streak",
    yourPath: "Your learning path", continueModule: "Continue",
    allModules: "All modules", fieldMode: "Field Mode", fieldModeSub: "Quick reference on site",
    badges: "My badges", profile: "Profile",
    home: "Home", learn: "Learn", field: "Field", me: "Me",
    completed: "Completed", inProgress: "In progress", locked: "Locked",
    minutes: "min",
    watch: "Watch", practice: "Practice", checklist: "Checklist", quiz: "Quiz", done: "Done",
    nextStep: "Next", previous: "Back",
    listen: "Listen", listening: "Listening…",
    step: "Step", of: "of",
    safety: "Safety warning", commonMistake: "Common mistake",
    toolsNeeded: "Tools needed", chemicals: "Chemicals", dilution: "Dilution",
    estTime: "Estimated time",
    iWillRemember: "I understand, next",
    startQuiz: "Start the quiz", quizQuestion: "Question",
    correct: "Correct!", tryAgain: "Try again", submit: "Submit",
    quizPassed: "You passed!", score: "Score",
    youEarnedBadge: "You earned a badge", keepItUp: "Keep it up",
    backToHome: "Back to home", finishModule: "Finish module",
    catBasics: "Basics", catRooms: "Rooms", catMachines: "Machines", catSpecial: "Special",
    bathroomStandard: "Bathroom — Standard Clean",
    bedroomStandard: "Bedroom — Standard Clean",
    kitchenStandard: "Kitchen — Standard Clean",
    sofaShampoo: "Sofa Shampooing", singleDisc: "Single Disc Machine",
    descaling: "Bathroom Descaling", clothCoding: "Cloth Color Coding", ppe: "PPE Usage",
    bath1t: "Open the window", bath1b: "Air must flow whenever you use chemicals.",
    bath2t: "Wear gloves and mask", bath2b: "PPE goes on before you open any bottle.",
    bath3t: "Spray R1 descaler 1:10", bath3b: "Cover all wet surfaces. Do not scrub yet.",
    bath4t: "Wait 5 minutes", bath4b: "Let the chemical do the work. Set a timer.",
    bath5t: "Scrub with the RED pad", bath5b: "Red is only for the toilet area. Never elsewhere.",
    bath6t: "Rinse with clean water", bath6b: "Top to bottom. No chemical residue.",
    bath7t: "Wipe dry, polish glass", bath7b: "Microfibre cloth. Streak-free finish.",
    mistake1: "Using the same cloth for the sink and the toilet",
    mistake2: "Scrubbing before the chemical has time to work",
    safety1: "Never mix R1 with bleach. The gas is toxic.",
    chk1: "Window opened, fan on", chk2: "Gloves and mask worn",
    chk3: "Red cloth and bucket ready", chk4: "R1 mixed at 1:10",
    chk5: "Sprayed and waited 5 minutes", chk6: "Scrubbed in correct order",
    chk7: "Rinsed top to bottom", chk8: "Glass and mirror polished",
    qBathQ: "Which colour cloth is for the toilet?",
    qRed: "Red", qYellow: "Yellow", qBlue: "Blue", qGreen: "Green",
    badgeBathroom: "Bathroom Certified",
    fmTitle: "Field Mode", fmSub: "Open in seconds. Use on site.",
    fmSearch: "Search task or room", fmRecent: "Recent on this site",
    fmRefresh: "30-second refresh", fmRatios: "Chemical ratios", fmSafety: "Safety alerts",
    fmCloths: "Cloth color codes", fmTapPlay: "Tap to play 30-sec video",
    redCloth: "Toilet only", yellowCloth: "General areas",
    blueCloth: "Glass and mirrors", greenCloth: "Kitchen surfaces", whiteCloth: "High-touch zones",
    adminTitle: "Clean Warks Admin",
    workers: "Workers", content: "Content", translations: "Translations", analytics: "Analytics",
    activeWorkers: "Active this week", avgCompletion: "Avg. completion",
    pendingTrans: "Awaiting translation", publishedModules: "Published",
    addModule: "Add module", editTranslations: "Edit translations",
    online: "Online", offline: "Offline · using cached", install: "Install app"
  },

  ml: {
    code: "ml", name: "Malayalam", native: "മലയാളം", speech: "ml-IN",
    welcome: "ക്ലീൻ വാർക്സിലേക്ക് സ്വാഗതം", welcomeSub: "നിങ്ങളുടെ പോക്കറ്റിൽ പരിശീലനം",
    chooseLang: "ഭാഷ തിരഞ്ഞെടുക്കുക", chooseLangSub: "എപ്പോൾ വേണമെങ്കിലും മാറ്റാം",
    tapYourFace: "ലോഗിൻ ചെയ്യാൻ നിങ്ങളുടെ ഫോട്ടോ തൊടുക", askSupervisor: "നിങ്ങളെ കാണുന്നില്ലെങ്കിൽ സൂപ്പർവൈസറോട് ചോദിക്കുക",
    enterPin: "നിങ്ങളുടെ 4-അക്ക പിൻ നൽകുക", forgotPin: "മറന്നോ? സൂപ്പർവൈസറോട് ചോദിക്കുക",
    continue: "തുടരുക", hello: "നമസ്കാരം",
    todayProgress: "ഇന്നത്തെ പുരോഗതി", dayStreak: "ദിവസം തുടർച്ച",
    yourPath: "നിങ്ങളുടെ പഠന പാത", continueModule: "തുടരുക",
    allModules: "എല്ലാ മൊഡ്യൂളുകളും", fieldMode: "ഫീൽഡ് മോഡ്", fieldModeSub: "ജോലിസ്ഥലത്ത് വേഗത്തിൽ",
    badges: "എന്റെ ബാഡ്ജുകൾ", profile: "പ്രൊഫൈൽ",
    home: "ഹോം", learn: "പഠിക്കുക", field: "ഫീൽഡ്", me: "ഞാൻ",
    completed: "പൂർത്തിയായി", inProgress: "നടക്കുന്നു", locked: "ലോക്ക്",
    minutes: "മിനിറ്റ്",
    watch: "കാണുക", practice: "പരിശീലനം", checklist: "ചെക്ക്‌ലിസ്റ്റ്", quiz: "ക്വിസ്", done: "പൂർത്തി",
    nextStep: "അടുത്തത്", previous: "പുറകോട്ട്",
    listen: "കേൾക്കുക", listening: "കേൾക്കുന്നു…",
    step: "ഘട്ടം", of: "/",
    safety: "സുരക്ഷാ മുന്നറിയിപ്പ്", commonMistake: "സാധാരണ തെറ്റ്",
    toolsNeeded: "വേണ്ട ഉപകരണങ്ങൾ", chemicals: "രസവസ്തുക്കൾ", dilution: "നേർപ്പിക്കൽ",
    estTime: "ഏകദേശ സമയം",
    iWillRemember: "മനസ്സിലായി, അടുത്തത്",
    startQuiz: "ക്വിസ് തുടങ്ങുക", quizQuestion: "ചോദ്യം",
    correct: "ശരി!", tryAgain: "വീണ്ടും ശ്രമിക്കുക", submit: "സമർപ്പിക്കുക",
    quizPassed: "നിങ്ങൾ വിജയിച്ചു!", score: "സ്കോർ",
    youEarnedBadge: "നിങ്ങൾക്ക് ഒരു ബാഡ്ജ് ലഭിച്ചു", keepItUp: "നന്നായി!",
    backToHome: "ഹോമിലേക്ക്", finishModule: "മൊഡ്യൂൾ പൂർത്തിയാക്കുക",
    catBasics: "അടിസ്ഥാനം", catRooms: "മുറികൾ", catMachines: "യന്ത്രങ്ങൾ", catSpecial: "പ്രത്യേകം",
    bathroomStandard: "ബാത്റൂം — സ്റ്റാൻഡേർഡ്",
    bedroomStandard: "കിടപ്പുമുറി — സ്റ്റാൻഡേർഡ്",
    kitchenStandard: "അടുക്കള — സ്റ്റാൻഡേർഡ്",
    sofaShampoo: "സോഫ ഷാംപൂ", singleDisc: "സിംഗിൾ ഡിസ്ക് മെഷീൻ",
    descaling: "ബാത്റൂം ഡീസ്കേലിങ്", clothCoding: "തുണി കളർ കോഡിങ്", ppe: "PPE ഉപയോഗം",
    bath1t: "ജനൽ തുറക്കുക", bath1b: "രസവസ്തു ഉപയോഗിക്കുമ്പോൾ വായു സഞ്ചാരം വേണം.",
    bath2t: "ഗ്ലൗസും മാസ്കും ധരിക്കുക", bath2b: "കുപ്പി തുറക്കുന്നതിന് മുമ്പ് PPE ധരിക്കുക.",
    bath3t: "R1 ഡീസ്കേലർ 1:10 സ്പ്രേ", bath3b: "എല്ലാ നനഞ്ഞ ഭാഗത്തും. ഇപ്പോൾ ഉരയ്ക്കരുത്.",
    bath4t: "5 മിനിറ്റ് കാത്തിരിക്കുക", bath4b: "രസവസ്തു പ്രവർത്തിക്കട്ടെ. ടൈമർ വയ്ക്കുക.",
    bath5t: "ചുവന്ന പാഡ് കൊണ്ട് ഉരയ്ക്കുക", bath5b: "ചുവപ്പ് ടോയിലറ്റിന് മാത്രം. വേറെ ഇടത്ത് ഇല്ല.",
    bath6t: "ശുദ്ധജലം കൊണ്ട് കഴുകുക", bath6b: "മുകളിൽ നിന്നു താഴേക്ക്. ശേഷിപ്പ് ഇല്ല.",
    bath7t: "തുടച്ച് പോളിഷ് ചെയ്യുക", bath7b: "മൈക്രോഫൈബർ. വരയില്ലാത്ത തിളക്കം.",
    mistake1: "സിങ്കിനും ടോയിലറ്റിനും ഒരേ തുണി ഉപയോഗം",
    mistake2: "രസവസ്തു പ്രവർത്തിക്കും മുമ്പ് ഉരയ്ക്കൽ",
    safety1: "R1 ബ്ലീച്ച് ഒരുമിച്ച് ചേർക്കരുത്. വിഷവാതകം.",
    chk1: "ജനൽ തുറന്നു, ഫാൻ ഓൺ", chk2: "ഗ്ലൗസ്, മാസ്ക് ധരിച്ചു",
    chk3: "ചുവന്ന തുണി, ബക്കറ്റ് തയ്യാർ", chk4: "R1 1:10 ൽ കലർത്തി",
    chk5: "സ്പ്രേ, 5 മിനിറ്റ് കാത്തു", chk6: "ശരിയായ ക്രമത്തിൽ ഉരച്ചു",
    chk7: "മുകളിൽ നിന്നു താഴേക്ക് കഴുകി", chk8: "ഗ്ലാസും കണ്ണാടിയും പോളിഷ് ചെയ്തു",
    qBathQ: "ടോയിലറ്റിന് ഏത് നിറത്തിലുള്ള തുണി?",
    qRed: "ചുവപ്പ്", qYellow: "മഞ്ഞ", qBlue: "നീല", qGreen: "പച്ച",
    badgeBathroom: "ബാത്റൂം സർട്ടിഫൈഡ്",
    fmTitle: "ഫീൽഡ് മോഡ്", fmSub: "സെക്കൻഡുകളിൽ തുറക്കുക. ജോലിസ്ഥലത്ത് ഉപയോഗിക്കുക.",
    fmSearch: "ജോലി അല്ലെങ്കിൽ മുറി തിരയുക", fmRecent: "ഈ സ്ഥലത്ത് അടുത്തിടെ",
    fmRefresh: "30-സെക്കൻഡ് റിഫ്രഷ്", fmRatios: "രസവസ്തു അനുപാതം", fmSafety: "സുരക്ഷാ മുന്നറിയിപ്പ്",
    fmCloths: "തുണി കളർ കോഡുകൾ", fmTapPlay: "30 സെക്കൻഡ് വീഡിയോ പ്ലേ",
    redCloth: "ടോയിലറ്റ് മാത്രം", yellowCloth: "സാധാരണ പ്രദേശം",
    blueCloth: "ഗ്ലാസ്, കണ്ണാടി", greenCloth: "അടുക്കള", whiteCloth: "ടച്ച് മേഖലകൾ",
    adminTitle: "ക്ലീൻ വാർക്സ് അഡ്മിൻ",
    workers: "തൊഴിലാളികൾ", content: "ഉള്ളടക്കം", translations: "വിവർത്തനങ്ങൾ", analytics: "അനലിറ്റിക്സ്",
    activeWorkers: "ഈ ആഴ്ച സജീവം", avgCompletion: "ശരാശരി പൂർത്തീകരണം",
    pendingTrans: "വിവർത്തനം ബാക്കി", publishedModules: "പ്രസിദ്ധീകരിച്ചത്",
    addModule: "മൊഡ്യൂൾ ചേർക്കുക", editTranslations: "വിവർത്തനം എഡിറ്റ്",
    online: "ഓൺലൈൻ", offline: "ഓഫ്‌ലൈൻ · കാഷ്", install: "ആപ്പ് ഇൻസ്റ്റാൾ"
  },

  hi: {
    code: "hi", name: "Hindi", native: "हिन्दी", speech: "hi-IN",
    welcome: "क्लीन वार्क्स में स्वागत है", welcomeSub: "जेब में रहने वाला प्रशिक्षण",
    chooseLang: "अपनी भाषा चुनें", chooseLangSub: "कभी भी बदल सकते हैं",
    tapYourFace: "लॉगिन के लिए अपनी फोटो दबाएं", askSupervisor: "अगर नाम नहीं है तो सुपरवाइज़र से पूछें",
    enterPin: "अपना 4-अंकीय पिन डालें", forgotPin: "भूल गए? सुपरवाइज़र से पूछें",
    continue: "आगे बढ़ें", hello: "नमस्ते",
    todayProgress: "आज की प्रगति", dayStreak: "दिन लगातार",
    yourPath: "आपका सीखने का रास्ता", continueModule: "जारी रखें",
    allModules: "सभी मॉड्यूल", fieldMode: "फील्ड मोड", fieldModeSub: "साइट पर तुरंत मदद",
    badges: "मेरे बैज", profile: "प्रोफाइल",
    home: "होम", learn: "सीखें", field: "फील्ड", me: "मैं",
    completed: "पूरा हुआ", inProgress: "चल रहा है", locked: "बंद",
    minutes: "मिनट",
    watch: "देखें", practice: "अभ्यास", checklist: "चेकलिस्ट", quiz: "क्विज़", done: "पूरा",
    nextStep: "आगे", previous: "पीछे",
    listen: "सुनें", listening: "सुन रहे हैं…",
    step: "चरण", of: "/",
    safety: "सुरक्षा चेतावनी", commonMistake: "आम गलती",
    toolsNeeded: "ज़रूरी सामान", chemicals: "रसायन", dilution: "मात्रा",
    estTime: "अनुमानित समय",
    iWillRemember: "समझ गया, आगे",
    startQuiz: "क्विज़ शुरू करें", quizQuestion: "प्रश्न",
    correct: "सही!", tryAgain: "फिर कोशिश करें", submit: "जमा करें",
    quizPassed: "आप पास हुए!", score: "स्कोर",
    youEarnedBadge: "आपको एक बैज मिला", keepItUp: "बहुत बढ़िया!",
    backToHome: "होम पर वापस", finishModule: "मॉड्यूल पूरा करें",
    catBasics: "मूल बातें", catRooms: "कमरे", catMachines: "मशीनें", catSpecial: "विशेष",
    bathroomStandard: "बाथरूम — मानक सफाई",
    bedroomStandard: "बेडरूम — मानक सफाई",
    kitchenStandard: "रसोई — मानक सफाई",
    sofaShampoo: "सोफा शैम्पू", singleDisc: "सिंगल डिस्क मशीन",
    descaling: "बाथरूम डीस्केलिंग", clothCoding: "कपड़े का रंग कोड", ppe: "PPE का उपयोग",
    bath1t: "खिड़की खोलें", bath1b: "रसायन उपयोग करते समय हवा चाहिए।",
    bath2t: "दस्ताने और मास्क पहनें", bath2b: "बोतल खोलने से पहले PPE पहनें।",
    bath3t: "R1 डीस्केलर 1:10 स्प्रे करें", bath3b: "हर गीली सतह पर। अभी न रगड़ें।",
    bath4t: "5 मिनट इंतज़ार करें", bath4b: "रसायन को काम करने दें। टाइमर लगाएं।",
    bath5t: "लाल पैड से रगड़ें", bath5b: "लाल केवल टॉयलेट के लिए। और कहीं नहीं।",
    bath6t: "साफ पानी से धोएं", bath6b: "ऊपर से नीचे। कोई रसायन न बचे।",
    bath7t: "पोंछें, कांच चमकाएं", bath7b: "माइक्रोफाइबर। बिना धारी के चमक।",
    mistake1: "सिंक और टॉयलेट के लिए एक ही कपड़ा",
    mistake2: "रसायन काम करने से पहले रगड़ना",
    safety1: "R1 को ब्लीच के साथ कभी न मिलाएं। ज़हरीली गैस।",
    chk1: "खिड़की खुली, पंखा चालू", chk2: "दस्ताने, मास्क पहना",
    chk3: "लाल कपड़ा, बाल्टी तैयार", chk4: "R1 1:10 में मिलाया",
    chk5: "स्प्रे और 5 मिनट रुके", chk6: "सही क्रम में रगड़ा",
    chk7: "ऊपर से नीचे धोया", chk8: "कांच और शीशा चमकाया",
    qBathQ: "टॉयलेट के लिए कौन सा रंग का कपड़ा?",
    qRed: "लाल", qYellow: "पीला", qBlue: "नीला", qGreen: "हरा",
    badgeBathroom: "बाथरूम सर्टिफाइड",
    fmTitle: "फील्ड मोड", fmSub: "सेकंडों में खोलें। साइट पर इस्तेमाल करें।",
    fmSearch: "काम या कमरा खोजें", fmRecent: "इस साइट पर हाल का",
    fmRefresh: "30-सेकंड रीफ्रेश", fmRatios: "रसायन अनुपात", fmSafety: "सुरक्षा अलर्ट",
    fmCloths: "कपड़े के रंग कोड", fmTapPlay: "30 सेकंड वीडियो चलाएं",
    redCloth: "केवल टॉयलेट", yellowCloth: "सामान्य क्षेत्र",
    blueCloth: "कांच और शीशे", greenCloth: "रसोई की सतह", whiteCloth: "स्पर्श क्षेत्र",
    adminTitle: "क्लीन वार्क्स एडमिन",
    workers: "कर्मचारी", content: "सामग्री", translations: "अनुवाद", analytics: "विश्लेषण",
    activeWorkers: "इस हफ्ते सक्रिय", avgCompletion: "औसत पूर्णता",
    pendingTrans: "अनुवाद बाकी", publishedModules: "प्रकाशित",
    addModule: "मॉड्यूल जोड़ें", editTranslations: "अनुवाद संपादित",
    online: "ऑनलाइन", offline: "ऑफलाइन · कैश से", install: "ऐप इंस्टॉल"
  }
};

const LANG_LIST = ["en", "ml", "hi"];
// Future: ["en","ml","hi","ta","bn","ne"] — same shape, just add the JSON.

/* ======================================================================
   DESIGN TOKENS
   ====================================================================== */
const C = {
  brand: "#4B8EC8",
  brandDark: "#2F6FA6",
  ink: "#1F2A3A",
  ink2: "#475467",
  ink3: "#94A3B8",
  bg: "#FAF7F2",
  surface: "#FFFFFF",
  line: "#E7E2D8",
  warm: "#F4A621",
  warmDark: "#C77F08",
  green: "#2E8B57",
  greenSoft: "#E6F4ED",
  red: "#DC4136",
  redSoft: "#FBEAE9",
  cloth: {
    red: "#D9434A", yellow: "#F4C842", blue: "#3B82F6", green: "#5BA055", white: "#F5F5F0"
  }
};

/* ======================================================================
   DEMO CONTENT — production lives in Postgres + JSON content files.
   Worker progress lives in DB; here we use React state.
   ====================================================================== */
const WORKERS = [
  { id: "w1", name: "Rajan", role: "Cleaner", initials: "R", color: "#F4A621" },
  { id: "w2", name: "Priya", role: "Cleaner", initials: "P", color: "#D9434A" },
  { id: "w3", name: "Anil", role: "Team Lead", initials: "A", color: "#2E8B57" },
  { id: "w4", name: "Lakshmi", role: "Cleaner", initials: "L", color: "#3B82F6" },
  { id: "w5", name: "Suresh", role: "Machine Op.", initials: "S", color: "#7C3AED" },
  { id: "w6", name: "Meera", role: "Cleaner", initials: "M", color: "#EC4899" }
];

const MODULES = [
  { id: "ppe", category: "basics", titleKey: "ppe", icon: ShieldCheck, mins: 5, status: "completed", color: "#2E8B57" },
  { id: "cloth", category: "basics", titleKey: "clothCoding", icon: Sparkles, mins: 4, status: "completed", color: "#3B82F6" },
  { id: "bathroom", category: "rooms", titleKey: "bathroomStandard", icon: Bath, mins: 12, status: "in_progress", color: "#4B8EC8" },
  { id: "bedroom", category: "rooms", titleKey: "bedroomStandard", icon: Bed, mins: 8, status: "locked", color: "#7C3AED" },
  { id: "kitchen", category: "rooms", titleKey: "kitchenStandard", icon: ChefHat, mins: 14, status: "locked", color: "#F4A621" },
  { id: "singledisc", category: "machines", titleKey: "singleDisc", icon: RotateCw, mins: 18, status: "locked", color: "#1F2A3A" },
  { id: "sofa", category: "special", titleKey: "sofaShampoo", icon: Sofa, mins: 22, status: "locked", color: "#D9434A" },
  { id: "descaling", category: "special", titleKey: "descaling", icon: Droplets, mins: 15, status: "locked", color: "#0EA5E9" }
];

const BATHROOM_STEPS = [
  { id: 1, titleKey: "bath1t", bodyKey: "bath1b", iconBg: "#E0F2FE", icon: Wind },
  { id: 2, titleKey: "bath2t", bodyKey: "bath2b", iconBg: "#FEF3C7", icon: ShieldCheck },
  { id: 3, titleKey: "bath3t", bodyKey: "bath3b", iconBg: "#DBEAFE", icon: FlaskConical, chip: { label: "1:10", color: C.brand } },
  { id: 4, titleKey: "bath4t", bodyKey: "bath4b", iconBg: "#FEF3C7", icon: Clock, chip: { label: "5 min", color: C.warm } },
  { id: 5, titleKey: "bath5t", bodyKey: "bath5b", iconBg: "#FEE2E2", icon: Hand, chip: { label: "RED", color: C.cloth.red } },
  { id: 6, titleKey: "bath6t", bodyKey: "bath6b", iconBg: "#DBEAFE", icon: Droplets },
  { id: 7, titleKey: "bath7t", bodyKey: "bath7b", iconBg: "#E6F4ED", icon: Sparkles }
];

const CHECKLIST_KEYS = ["chk1", "chk2", "chk3", "chk4", "chk5", "chk6", "chk7", "chk8"];

/* ======================================================================
   AUDIO — uses browser SpeechSynthesis (free, on-device, all languages)
   ====================================================================== */
function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    return () => { try { window.speechSynthesis?.cancel(); } catch {} };
  }, []);
  const speak = (text, lang) => {
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || "en-IN";
      u.rate = 0.92;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis?.speak(u);
    } catch { setSpeaking(false); }
  };
  const stop = () => { try { window.speechSynthesis?.cancel(); } catch {}; setSpeaking(false); };
  return { speaking, speak, stop };
}

function ListenButton({ text, lang, size = "md" }) {
  const { speaking, speak, stop } = useSpeech();
  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-11 px-4 text-sm gap-2",
    lg: "h-14 px-5 text-base gap-2.5"
  };
  const ico = { sm: 14, md: 18, lg: 22 };
  return (
    <button
      onClick={() => (speaking ? stop() : speak(text, lang))}
      className={`inline-flex items-center rounded-full font-semibold transition active:scale-95 ${sizes[size]}`}
      style={{
        background: speaking ? C.warm : "#F1F5F9",
        color: speaking ? "#FFF" : C.ink,
        border: `1.5px solid ${speaking ? C.warm : "#E2E8F0"}`
      }}
    >
      {speaking ? <VolumeX size={ico[size]} /> : <Volume2 size={ico[size]} />}
      {speaking ? "…" : "🔊"}
    </button>
  );
}

/* ======================================================================
   LAYOUT — Phone Frame
   ====================================================================== */
function PhoneFrame({ children, online }) {
  return (
    <div className="relative" style={{ width: 390, maxWidth: "100%" }}>
      <div
        className="relative overflow-hidden bg-black"
        style={{
          borderRadius: 48,
          padding: 12,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45), 0 12px 24px -8px rgba(0,0,0,0.25)"
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: C.bg,
            borderRadius: 38,
            height: 780,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-2 pb-1.5 text-[11px] font-semibold" style={{ color: C.ink, fontFamily: DISPLAY }}>
            <span>9:41</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-5 bg-black rounded-full"></div>
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]`} style={{ background: online ? C.greenSoft : "#FEF3C7", color: online ? C.green : C.warmDark }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: online ? C.green : C.warm }}></span>
                {online ? "5G" : "off"}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Welcome + Language Picker (combined onboarding)
   ====================================================================== */
function LanguageScreen({ onPick }) {
  const { speak } = useSpeech();
  return (
    <div className="px-6 pt-6 pb-8" style={{ background: C.bg, minHeight: "100%" }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.brand }}>
          <Sparkles size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-base tracking-tight" style={{ color: C.ink, fontFamily: DISPLAY }}>Clean Warks</span>
      </div>
      <h1 className="font-extrabold leading-[1.1] mt-6" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 32, letterSpacing: "-0.03em" }}>
        Welcome.<br/>
        <span style={{ color: C.brand }}>स्वागत.</span> <span style={{ color: C.warm }}>സ്വാഗതം.</span>
      </h1>
      <p className="mt-3 text-sm" style={{ color: C.ink2 }}>
        Choose your language to begin. You can change it anytime.
      </p>

      <div className="mt-7 grid gap-3">
        {LANG_LIST.map((l) => {
          const lang = T[l];
          return (
            <button
              key={l}
              onClick={() => onPick(l)}
              className="flex items-center justify-between w-full rounded-2xl px-5 py-4 transition active:scale-[0.98]"
              style={{
                background: C.surface,
                border: `1.5px solid ${C.line}`,
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)"
              }}
            >
              <div className="text-left">
                <div className="font-bold text-lg leading-tight" style={{ color: C.ink, fontFamily: BODY_BY_LANG[l] || DISPLAY }}>
                  {lang.native}
                </div>
                <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{lang.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  onClick={(e) => { e.stopPropagation(); speak(lang.welcome, lang.speech); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#F1F5F9" }}
                >
                  <Volume2 size={16} color={C.ink2} />
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.brand }}>
                  <ChevronRight size={20} color="#fff" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl px-4 py-3 flex items-start gap-2" style={{ background: "#FFF7E6", border: `1px solid #FFE2A8` }}>
        <Volume2 size={16} color={C.warmDark} className="mt-0.5 flex-shrink-0" />
        <p className="text-xs leading-relaxed" style={{ color: "#7A4A00" }}>
          Tap the speaker icon on any screen to listen in your language.
        </p>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Profile Picker (no OTP, no SMS cost)
   ====================================================================== */
function ProfilePickerScreen({ lang, onPick, onBack }) {
  const t = T[lang];
  return (
    <div className="px-6 pt-4 pb-8" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: C.ink2 }}>
        <ChevronLeft size={18} /> {t.previous}
      </button>
      <h1 className="font-extrabold leading-tight" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
        {t.tapYourFace}
      </h1>
      <p className="mt-2 text-sm" style={{ color: C.ink2 }}>{t.askSupervisor}</p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {WORKERS.map((w) => (
          <button
            key={w.id}
            onClick={() => onPick(w)}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl transition active:scale-95"
            style={{ background: C.surface, border: `1.5px solid ${C.line}` }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl"
              style={{ background: w.color, color: "#fff", fontFamily: DISPLAY }}
            >
              {w.initials}
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold leading-tight" style={{ color: C.ink }}>{w.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: C.ink3 }}>{w.role}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs" style={{ color: C.ink3 }}>
        <Lock size={12} /> Secure · works offline
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: PIN Entry
   ====================================================================== */
function PinScreen({ lang, worker, onPass, onBack }) {
  const t = T[lang];
  const [pin, setPin] = useState("");
  const correctPin = "1234"; // demo
  const wrong = pin.length === 4 && pin !== correctPin;

  useEffect(() => {
    if (pin.length === 4 && pin === correctPin) {
      const timer = setTimeout(() => onPass(), 350);
      return () => clearTimeout(timer);
    }
  }, [pin, onPass]);

  const press = (n) => { if (pin.length < 4) setPin(pin + n); };
  const back = () => setPin(pin.slice(0, -1));

  return (
    <div className="px-6 pt-4 pb-8 flex flex-col" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <button onClick={onBack} className="mb-2 inline-flex items-center gap-1 text-sm font-medium self-start" style={{ color: C.ink2 }}>
        <ChevronLeft size={18} /> {t.previous}
      </button>

      <div className="flex flex-col items-center mt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-3"
          style={{ background: worker.color, color: "#fff", fontFamily: DISPLAY }}
        >
          {worker.initials}
        </div>
        <div className="font-bold text-xl" style={{ color: C.ink, fontFamily: DISPLAY }}>
          {t.hello}, {worker.name}
        </div>
        <div className="text-sm mt-1" style={{ color: C.ink2 }}>{t.enterPin}</div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-12 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition"
            style={{
              background: C.surface,
              border: `2px solid ${wrong ? C.red : pin[i] ? C.brand : C.line}`,
              color: C.ink,
              fontFamily: DISPLAY
            }}
          >
            {pin[i] ? "•" : ""}
          </div>
        ))}
      </div>
      {wrong && (
        <div className="text-center mt-3 text-sm font-semibold" style={{ color: C.red }}>
          {t.tryAgain}
        </div>
      )}
      <div className="text-center mt-2 text-xs" style={{ color: C.ink3 }}>
        Demo PIN: <span className="font-mono font-bold">1234</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
          <button
            key={n}
            onClick={() => press(n)}
            className="h-16 rounded-2xl text-2xl font-bold transition active:scale-95"
            style={{ background: C.surface, color: C.ink, border: `1.5px solid ${C.line}`, fontFamily: DISPLAY }}
          >
            {n}
          </button>
        ))}
        <div></div>
        <button
          onClick={() => press("0")}
          className="h-16 rounded-2xl text-2xl font-bold transition active:scale-95"
          style={{ background: C.surface, color: C.ink, border: `1.5px solid ${C.line}`, fontFamily: DISPLAY }}
        >0</button>
        <button
          onClick={back}
          className="h-16 rounded-2xl flex items-center justify-center transition active:scale-95"
          style={{ background: "transparent", color: C.ink2 }}
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Home Dashboard
   ====================================================================== */
function HomeScreen({ lang, worker, onOpenModule, onAllModules, onFieldMode, progress }) {
  const t = T[lang];
  const completedCount = MODULES.filter(m => progress[m.id]?.status === "completed").length;
  const totalCount = MODULES.length;
  const pct = Math.round((completedCount / totalCount) * 100);
  const inProg = MODULES.find(m => progress[m.id]?.status === "in_progress") || MODULES[2];

  return (
    <div className="pb-24" style={{ background: C.bg, fontFamily: BODY_BY_LANG[lang] }}>
      {/* Header */}
      <div className="px-5 pt-3 pb-5" style={{
        background: `linear-gradient(135deg, ${C.brand} 0%, ${C.brandDark} 100%)`,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28
      }}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: worker.color, fontFamily: DISPLAY }}>
              {worker.initials}
            </div>
            <div>
              <div className="text-xs opacity-90">{t.hello}</div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: DISPLAY }}>{worker.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
            <Zap size={14} fill="#FFD700" color="#FFD700" />
            <span className="text-xs font-bold">7 {t.dayStreak}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#FFD700" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 214} 214`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-xl text-white" style={{ fontFamily: DISPLAY }}>
              {pct}%
            </div>
          </div>
          <div className="text-white">
            <div className="text-xs opacity-90">{t.todayProgress}</div>
            <div className="font-bold text-lg leading-tight" style={{ fontFamily: DISPLAY }}>{completedCount}/{totalCount} modules</div>
            <div className="text-xs opacity-90 mt-0.5">{t.keepLearning || "Keep going strong"}</div>
          </div>
        </div>
      </div>

      {/* Continue training card */}
      <div className="px-5 mt-5">
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: C.ink3, letterSpacing: "0.08em" }}>
          {t.continueModule}
        </div>
        <button
          onClick={() => onOpenModule(inProg.id)}
          className="w-full rounded-2xl p-4 flex items-center gap-4 transition active:scale-[0.98] text-left"
          style={{ background: C.surface, border: `1.5px solid ${C.line}` }}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${inProg.color}1A` }}>
            <inProg.icon size={26} color={inProg.color} strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base leading-tight" style={{ color: C.ink, fontFamily: DISPLAY }}>
              {t[inProg.titleKey]}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full" style={{ width: "40%", background: C.warm }}></div>
              </div>
              <span className="text-xs font-semibold" style={{ color: C.warmDark }}>3/7</span>
            </div>
          </div>
          <ArrowRight size={20} color={C.brand} strokeWidth={2.5} />
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={onFieldMode}
          className="rounded-2xl p-4 text-left transition active:scale-95"
          style={{ background: "#1F2A3A", color: "#fff" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: C.warm }}>
            <Zap size={20} color="#fff" strokeWidth={2.5} fill="#fff" />
          </div>
          <div className="font-bold text-sm leading-tight" style={{ fontFamily: DISPLAY }}>{t.fieldMode}</div>
          <div className="text-[11px] opacity-75 mt-0.5">{t.fieldModeSub}</div>
        </button>
        <button
          onClick={onAllModules}
          className="rounded-2xl p-4 text-left transition active:scale-95"
          style={{ background: C.surface, border: `1.5px solid ${C.line}` }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#EEF2F7" }}>
            <BookOpen size={20} color={C.brand} strokeWidth={2.2} />
          </div>
          <div className="font-bold text-sm leading-tight" style={{ color: C.ink, fontFamily: DISPLAY }}>{t.allModules}</div>
          <div className="text-[11px] mt-0.5" style={{ color: C.ink3 }}>{totalCount} total</div>
        </button>
      </div>

      {/* Badges row */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: C.ink3, letterSpacing: "0.08em" }}>
            {t.badges}
          </div>
          <span className="text-xs font-semibold" style={{ color: C.brand }}>2 earned</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: "none" }}>
          <BadgeChip earned label={t.ppe} icon={ShieldCheck} color={C.green} />
          <BadgeChip earned label={t.clothCoding} icon={Sparkles} color={C.brand} />
          <BadgeChip label={t.bathroomStandard} icon={Bath} color={C.ink3} />
          <BadgeChip label={t.singleDisc} icon={RotateCw} color={C.ink3} />
        </div>
      </div>
    </div>
  );
}

function BadgeChip({ earned, label, icon: Icon, color }) {
  return (
    <div className="flex flex-col items-center w-20 flex-shrink-0">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1.5 relative"
        style={{
          background: earned ? color : "#F1F5F9",
          opacity: earned ? 1 : 0.6
        }}
      >
        <Icon size={28} color={earned ? "#fff" : C.ink3} strokeWidth={2.2} />
        {earned && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.warm, border: "2px solid #fff" }}>
            <Check size={10} color="#fff" strokeWidth={3} />
          </div>
        )}
      </div>
      <div className="text-[10px] font-semibold text-center leading-tight" style={{ color: earned ? C.ink : C.ink3 }}>
        {label}
      </div>
    </div>
  );
}

/* ======================================================================
   BOTTOM NAV
   ====================================================================== */
function BottomNav({ active, onChange, lang }) {
  const t = T[lang];
  const items = [
    { key: "home", icon: Home, label: t.home },
    { key: "modules", icon: BookOpen, label: t.learn },
    { key: "field", icon: Zap, label: t.field },
    { key: "me", icon: User, label: t.me }
  ];
  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-2 pt-2 pb-3 flex items-center justify-around"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${C.line}`,
        fontFamily: BODY_BY_LANG[lang]
      }}
    >
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition"
            style={{ color: isActive ? C.brand : C.ink3 }}
          >
            <it.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ======================================================================
   SCREEN: Module List
   ====================================================================== */
function ModuleListScreen({ lang, onOpenModule, progress }) {
  const t = T[lang];
  const cats = [
    { id: "basics", label: t.catBasics },
    { id: "rooms", label: t.catRooms },
    { id: "machines", label: t.catMachines },
    { id: "special", label: t.catSpecial }
  ];
  return (
    <div className="px-5 pt-4 pb-24" style={{ background: C.bg, fontFamily: BODY_BY_LANG[lang] }}>
      <h1 className="font-extrabold mb-4" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
        {t.allModules}
      </h1>
      {cats.map((cat) => {
        const items = MODULES.filter(m => m.category === cat.id);
        return (
          <div key={cat.id} className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: C.ink3, letterSpacing: "0.08em" }}>
              {cat.label}
            </div>
            <div className="space-y-2.5">
              {items.map((m) => {
                const status = progress[m.id]?.status || m.status;
                return (
                  <button
                    key={m.id}
                    onClick={() => status !== "locked" && onOpenModule(m.id)}
                    disabled={status === "locked"}
                    className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-left transition active:scale-[0.98]"
                    style={{
                      background: C.surface,
                      border: `1.5px solid ${C.line}`,
                      opacity: status === "locked" ? 0.55 : 1
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.color}1A` }}>
                      <m.icon size={22} color={m.color} strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight" style={{ color: C.ink }}>{t[m.titleKey]}</div>
                      <div className="flex items-center gap-2 mt-1 text-[11px]" style={{ color: C.ink3 }}>
                        <Clock size={10} /> {m.mins} {t.minutes}
                      </div>
                    </div>
                    {status === "completed" && <CheckCircle2 size={22} color={C.green} fill={C.greenSoft} strokeWidth={2.2} />}
                    {status === "in_progress" && <div className="w-2 h-2 rounded-full" style={{ background: C.warm }}></div>}
                    {status === "locked" && <Lock size={16} color={C.ink3} />}
                    {status !== "locked" && status !== "completed" && status !== "in_progress" && <ChevronRight size={20} color={C.ink3} />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ======================================================================
   SCREEN: Module Detail (Watch tab + segmented nav)
   ====================================================================== */
function ModuleDetailScreen({ lang, moduleId, onBack, onPractice, onChecklist, onQuiz, progress }) {
  const t = T[lang];
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return null;
  const stage = progress[m.id]?.stage || "watch";

  const stages = [
    { key: "watch", label: t.watch, icon: Eye, action: () => {} },
    { key: "practice", label: t.practice, icon: Hand, action: onPractice },
    { key: "checklist", label: t.checklist, icon: ListChecks, action: onChecklist },
    { key: "quiz", label: t.quiz, icon: HelpCircle, action: onQuiz },
    { key: "done", label: t.done, icon: Trophy, action: () => {} }
  ];

  return (
    <div className="pb-8" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <div className="px-5 pt-4">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: C.ink2 }}>
          <ChevronLeft size={18} /> {t.previous}
        </button>
      </div>

      {/* Title + meta */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}1A` }}>
            <m.icon size={20} color={m.color} strokeWidth={2.2} />
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: C.ink3 }}>
            <span className="flex items-center gap-1"><Clock size={11} /> {m.mins} {t.minutes}</span>
            <span>•</span>
            <span>7 {t.step}s</span>
          </div>
        </div>
        <h1 className="font-extrabold leading-tight" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
          {t[m.titleKey]}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <ListenButton text={t[m.titleKey]} lang={t.speech} size="sm" />
        </div>
      </div>

      {/* Video placeholder — represents YouTube unlisted embed */}
      <div className="px-5 mt-4">
        <div
          className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            aspectRatio: "16/9",
            background: `linear-gradient(135deg, ${m.color} 0%, ${C.ink} 100%)`
          }}
        >
          <button className="w-16 h-16 rounded-full flex items-center justify-center transition active:scale-90" style={{ background: "rgba(255,255,255,0.95)" }}>
            <Play size={26} color={m.color} fill={m.color} className="ml-1" />
          </button>
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px] font-bold text-white" style={{ background: "rgba(0,0,0,0.6)" }}>
            YouTube · 2:14
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-semibold text-white" style={{ background: "rgba(0,0,0,0.45)" }}>
            HD
          </div>
        </div>
      </div>

      {/* Quick info chips */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-2.5">
        <InfoChip icon={FlaskConical} label={t.chemicals} value="R1 · 1:10" color={C.brand} />
        <InfoChip icon={Hand} label={t.toolsNeeded} value="3 cloths · pad" color={C.warm} />
        <InfoChip icon={Clock} label={t.estTime} value={`${m.mins} ${t.minutes}`} color={C.green} />
        <InfoChip icon={ShieldCheck} label={t.ppe} value="Gloves · mask" color={C.red} />
      </div>

      {/* Cloth color code reference */}
      <div className="px-5 mt-4 rounded-2xl p-4" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: C.ink3, letterSpacing: "0.08em" }}>
          {t.fmCloths}
        </div>
        <div className="grid grid-cols-5 gap-2">
          <ClothChip color={C.cloth.red} label={t.qRed} />
          <ClothChip color={C.cloth.yellow} label={t.qYellow} />
          <ClothChip color={C.cloth.blue} label={t.qBlue} />
          <ClothChip color={C.cloth.green} label={t.qGreen} />
          <ClothChip color="#fff" border label="—" />
        </div>
      </div>

      {/* Stage navigation */}
      <div className="px-5 mt-5">
        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.ink3, letterSpacing: "0.08em" }}>
          Your training flow
        </div>
        <div className="space-y-2">
          {stages.map((s, i) => {
            const isCurrent = s.key === stage;
            const isDone = stages.findIndex(x => x.key === stage) > i;
            return (
              <button
                key={s.key}
                onClick={s.action}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition active:scale-[0.98] text-left"
                style={{
                  background: isCurrent ? `${m.color}1A` : C.surface,
                  border: `1.5px solid ${isCurrent ? m.color : C.line}`
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isDone ? C.green : isCurrent ? m.color : "#F1F5F9",
                    color: isDone || isCurrent ? "#fff" : C.ink3
                  }}
                >
                  {isDone ? <Check size={16} strokeWidth={3} /> : <s.icon size={16} strokeWidth={2.5} />}
                </div>
                <div className="flex-1 font-semibold text-sm" style={{ color: C.ink }}>
                  {s.label}
                </div>
                <ChevronRight size={18} color={C.ink3} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Common mistake card */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl p-4 flex gap-3" style={{ background: "#FEF3C7", border: `1px solid #FCD34D` }}>
          <AlertTriangle size={20} color="#92400E" className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold mb-1" style={{ color: "#92400E" }}>{t.commonMistake}</div>
            <div className="text-sm" style={{ color: "#78350F" }}>{t.mistake1}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl p-3" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} color={color} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.ink3 }}>{label}</span>
      </div>
      <div className="text-sm font-bold" style={{ color: C.ink, fontFamily: DISPLAY }}>{value}</div>
    </div>
  );
}

function ClothChip({ color, label, border }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-full aspect-square rounded-lg"
        style={{ background: color, border: border ? `1.5px dashed ${C.ink3}` : "none" }}
      ></div>
      <div className="text-[10px] font-semibold" style={{ color: C.ink2 }}>{label}</div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Practice — step-by-step swipeable
   ====================================================================== */
function PracticeScreen({ lang, onDone, onBack }) {
  const t = T[lang];
  const [idx, setIdx] = useState(0);
  const step = BATHROOM_STEPS[idx];
  const total = BATHROOM_STEPS.length;
  const next = () => idx < total - 1 ? setIdx(idx + 1) : onDone();
  const prev = () => idx > 0 ? setIdx(idx - 1) : onBack();

  return (
    <div className="flex flex-col" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      {/* Top bar */}
      <div className="px-5 pt-3 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
          <X size={18} color={C.ink2} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            {BATHROOM_STEPS.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{ background: i <= idx ? C.brand : "#E2E8F0" }}
              ></div>
            ))}
          </div>
          <div className="text-[11px] font-semibold" style={{ color: C.ink3 }}>
            {t.step} {idx + 1} {t.of} {total}
          </div>
        </div>
      </div>

      {/* Step card */}
      <div className="flex-1 px-5 pt-2 pb-4 flex flex-col">
        <div className="flex-1 rounded-3xl p-6 flex flex-col" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
          {/* Big number + visual */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-3xl"
              style={{ background: C.brand, color: "#fff", fontFamily: DISPLAY }}
            >
              {step.id}
            </div>
            <div
              className="flex-1 aspect-square rounded-2xl flex items-center justify-center"
              style={{ background: step.iconBg, maxWidth: 120 }}
            >
              <step.icon size={56} color={C.ink} strokeWidth={1.6} />
            </div>
          </div>

          {/* Chip if any */}
          {step.chip && (
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: step.chip.color,
                  color: "#fff"
                }}
              >
                {step.chip.label}
              </span>
            </div>
          )}

          {/* Title + body */}
          <h2 className="font-extrabold leading-tight mb-3" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
            {t[step.titleKey]}
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink2 }}>
            {t[step.bodyKey]}
          </p>

          {/* Audio */}
          <div className="mt-auto pt-4 border-t" style={{ borderColor: C.line }}>
            <ListenButton text={`${t[step.titleKey]}. ${t[step.bodyKey]}`} lang={t.speech} size="lg" />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-5 pb-5 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition active:scale-95"
          style={{ background: C.surface, border: `1.5px solid ${C.line}` }}
        >
          <ChevronLeft size={24} color={C.ink} />
        </button>
        <button
          onClick={next}
          className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition active:scale-[0.98]"
          style={{ background: C.brand, color: "#fff", fontFamily: DISPLAY }}
        >
          {idx === total - 1 ? t.iWillRemember : t.nextStep}
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Checklist
   ====================================================================== */
function ChecklistScreen({ lang, onDone, onBack }) {
  const t = T[lang];
  const [checked, setChecked] = useState({});
  const total = CHECKLIST_KEYS.length;
  const doneCount = Object.values(checked).filter(Boolean).length;
  const allDone = doneCount === total;

  return (
    <div className="flex flex-col" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: C.ink2 }}>
          <ChevronLeft size={18} /> {t.previous}
        </button>
        <span className="text-sm font-bold" style={{ color: C.brand }}>{doneCount}/{total}</span>
      </div>

      <div className="px-5">
        <h1 className="font-extrabold leading-tight" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
          {t.checklist}
        </h1>
        <p className="text-sm mt-1" style={{ color: C.ink2 }}>{t.bathroomStandard}</p>
      </div>

      <div className="px-5 mt-4 flex-1">
        <div className="space-y-2">
          {CHECKLIST_KEYS.map((k, i) => {
            const isChecked = !!checked[k];
            return (
              <button
                key={k}
                onClick={() => setChecked({ ...checked, [k]: !isChecked })}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition active:scale-[0.98]"
                style={{
                  background: isChecked ? C.greenSoft : C.surface,
                  border: `1.5px solid ${isChecked ? C.green : C.line}`
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition"
                  style={{
                    background: isChecked ? C.green : "transparent",
                    border: `2px solid ${isChecked ? C.green : C.ink3}`
                  }}
                >
                  {isChecked && <Check size={16} color="#fff" strokeWidth={3} />}
                </div>
                <span className="flex-1 text-sm font-medium" style={{ color: C.ink, textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.6 : 1 }}>
                  {t[k]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pb-5 pt-3">
        <button
          onClick={onDone}
          disabled={!allDone}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition"
          style={{
            background: allDone ? C.brand : "#E2E8F0",
            color: allDone ? "#fff" : C.ink3,
            fontFamily: DISPLAY
          }}
        >
          {t.startQuiz}
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Image-based Quiz
   ====================================================================== */
function QuizScreen({ lang, onDone, onBack }) {
  const t = T[lang];
  const [pick, setPick] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = "red";

  const options = [
    { id: "red", label: t.qRed, color: C.cloth.red },
    { id: "yellow", label: t.qYellow, color: C.cloth.yellow },
    { id: "blue", label: t.qBlue, color: C.cloth.blue },
    { id: "green", label: t.qGreen, color: C.cloth.green }
  ];

  const submit = () => {
    setSubmitted(true);
    if (pick === correct) {
      setTimeout(onDone, 1100);
    }
  };

  return (
    <div className="flex flex-col" style={{ background: C.bg, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: C.ink2 }}>
          <ChevronLeft size={18} /> {t.previous}
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: C.brand, color: "#fff" }}>
          {t.quizQuestion} 1/3
        </span>
      </div>

      <div className="px-5 mt-2">
        <h1 className="font-extrabold leading-tight" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 26, letterSpacing: "-0.02em" }}>
          {t.qBathQ}
        </h1>
        <div className="mt-3">
          <ListenButton text={t.qBathQ} lang={t.speech} size="sm" />
        </div>
      </div>

      {/* Visual context */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl p-6 flex items-center justify-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center" style={{ background: "#EEF4FA" }}>
              <Bath size={64} color={C.brand} strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ background: C.warm, color: "#fff", border: "3px solid #fff" }}>
              ?
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3 flex-1">
        {options.map((o) => {
          const isPicked = pick === o.id;
          const isRight = submitted && o.id === correct;
          const isWrong = submitted && isPicked && o.id !== correct;
          return (
            <button
              key={o.id}
              onClick={() => !submitted && setPick(o.id)}
              className="rounded-2xl p-4 flex flex-col items-center gap-3 transition active:scale-95"
              style={{
                background: isRight ? C.greenSoft : isWrong ? C.redSoft : C.surface,
                border: `2px solid ${isRight ? C.green : isWrong ? C.red : isPicked ? C.brand : C.line}`
              }}
            >
              <div
                className="w-20 h-20 rounded-2xl"
                style={{ background: o.color, border: o.color === C.cloth.yellow ? `1.5px solid ${C.line}` : "none" }}
              ></div>
              <div className="font-bold text-sm" style={{ color: C.ink, fontFamily: DISPLAY }}>{o.label}</div>
            </button>
          );
        })}
      </div>

      {/* Result + submit */}
      <div className="px-5 pb-5 pt-3">
        {submitted && pick === correct && (
          <div className="mb-3 rounded-2xl p-3 flex items-center gap-2" style={{ background: C.greenSoft, border: `1.5px solid ${C.green}` }}>
            <CheckCircle2 size={20} color={C.green} fill="#fff" />
            <span className="font-bold text-sm" style={{ color: C.green }}>{t.correct}</span>
          </div>
        )}
        {submitted && pick !== correct && (
          <div className="mb-3 rounded-2xl p-3 flex items-center gap-2" style={{ background: C.redSoft, border: `1.5px solid ${C.red}` }}>
            <AlertTriangle size={20} color={C.red} />
            <span className="font-bold text-sm" style={{ color: C.red }}>{t.tryAgain}</span>
          </div>
        )}
        <button
          onClick={() => submitted ? (setSubmitted(false), setPick(null)) : submit()}
          disabled={!pick}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition"
          style={{
            background: !pick ? "#E2E8F0" : submitted && pick !== correct ? C.warm : C.brand,
            color: !pick ? C.ink3 : "#fff",
            fontFamily: DISPLAY
          }}
        >
          {submitted && pick !== correct ? t.tryAgain : t.submit}
        </button>
      </div>
    </div>
  );
}

/* ======================================================================
   SCREEN: Certificate / Badge celebration
   ====================================================================== */
function CertificateScreen({ lang, worker, onHome }) {
  const t = T[lang];
  return (
    <div className="flex flex-col items-center justify-between px-6 py-10" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #FFF7E6 100%)`, minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      <div className="flex flex-col items-center text-center mt-6 flex-1">
        <div className="text-5xl mb-3">🎉</div>
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: C.warmDark, letterSpacing: "0.12em" }}>
          {t.youEarnedBadge}
        </div>
        <h1 className="font-extrabold leading-tight mb-1" style={{ color: C.ink, fontFamily: DISPLAY, fontSize: 30, letterSpacing: "-0.02em" }}>
          {t.quizPassed}
        </h1>
        <p className="text-sm" style={{ color: C.ink2 }}>{t.keepItUp}</p>

        {/* Badge */}
        <div className="mt-8 relative">
          <div
            className="w-44 h-44 rounded-full flex items-center justify-center relative"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${C.brand} 0%, ${C.brandDark} 100%)`,
              boxShadow: `0 20px 40px -10px ${C.brand}66`
            }}
          >
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{ background: "#fff", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <Bath size={64} color={C.brand} strokeWidth={1.5} />
            </div>
            {/* Star ribbons */}
            {[0, 60, 120, 180, 240, 300].map(deg => (
              <div
                key={deg}
                className="absolute w-3 h-3"
                style={{
                  transform: `rotate(${deg}deg) translateY(-90px)`,
                  transformOrigin: "center"
                }}
              >
                <Star size={12} color={C.warm} fill={C.warm} />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap" style={{ background: C.warm, color: "#fff", boxShadow: "0 4px 8px rgba(244,166,33,0.4)" }}>
            {t.badgeBathroom}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 w-full">
          <div className="rounded-xl p-3 text-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
            <div className="text-xs" style={{ color: C.ink3 }}>{t.score}</div>
            <div className="font-extrabold text-xl" style={{ color: C.ink, fontFamily: DISPLAY }}>3/3</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
            <div className="text-xs" style={{ color: C.ink3 }}>Time</div>
            <div className="font-extrabold text-xl" style={{ color: C.ink, fontFamily: DISPLAY }}>11m</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
            <div className="text-xs" style={{ color: C.ink3 }}>{t.dayStreak}</div>
            <div className="font-extrabold text-xl flex items-center justify-center gap-0.5" style={{ color: C.warmDark, fontFamily: DISPLAY }}>
              7<Zap size={14} fill={C.warm} color={C.warm} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onHome}
        className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition active:scale-[0.98]"
        style={{ background: C.brand, color: "#fff", fontFamily: DISPLAY }}
      >
        {t.backToHome}
      </button>
    </div>
  );
}

/* ======================================================================
   SCREEN: Field Mode — totally different visual register
   High contrast, large targets, urgent feel
   ====================================================================== */
function FieldModeScreen({ lang, onBack }) {
  const t = T[lang];
  return (
    <div className="flex flex-col pb-24" style={{ background: "#0F172A", minHeight: "100%", fontFamily: BODY_BY_LANG[lang] }}>
      {/* Top */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium opacity-80">
            <ChevronLeft size={18} /> {t.previous}
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(244,166,33,0.2)", color: C.warm }}>
            <Zap size={10} fill={C.warm} /> ON SITE
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.warm }}>
            <Zap size={24} color="#fff" fill="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-extrabold text-2xl text-white leading-tight" style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}>
              {t.fmTitle}
            </div>
            <div className="text-xs" style={{ color: "#94A3B8" }}>{t.fmSub}</div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 px-4 h-14 rounded-2xl" style={{ background: "#1E293B", border: "1.5px solid #334155" }}>
          <Search size={20} color="#94A3B8" />
          <input
            placeholder={t.fmSearch}
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Quick action grid */}
      <div className="px-5 mt-2 grid grid-cols-2 gap-3">
        <FieldCard icon={Play} label={t.fmRefresh} sub="Bathroom · Kitchen" color={C.warm} />
        <FieldCard icon={FlaskConical} label={t.fmRatios} sub="R1 R2 R3 R6" color={C.brand} />
        <FieldCard icon={AlertTriangle} label={t.fmSafety} sub="3 alerts" color={C.red} />
        <FieldCard icon={Sparkles} label={t.fmCloths} sub="5 colors" color={C.green} />
      </div>

      {/* Cloth code reference - always-visible */}
      <div className="px-5 mt-5">
        <div className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "#64748B", letterSpacing: "0.12em" }}>
          {t.fmCloths}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { c: C.cloth.red, l: t.qRed, u: t.redCloth },
            { c: C.cloth.yellow, l: t.qYellow, u: t.yellowCloth },
            { c: C.cloth.blue, l: t.qBlue, u: t.blueCloth },
            { c: C.cloth.green, l: t.qGreen, u: t.greenCloth },
            { c: "#fff", l: "—", u: t.whiteCloth }
          ].map((x, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-full aspect-square rounded-xl" style={{ background: x.c, border: x.c === "#fff" ? `1.5px solid #475569` : "none" }}></div>
              <div className="text-[10px] font-bold text-white text-center leading-tight">{x.l}</div>
              <div className="text-[9px] text-center leading-tight" style={{ color: "#94A3B8" }}>{x.u}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent on site */}
      <div className="px-5 mt-6">
        <div className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "#64748B", letterSpacing: "0.12em" }}>
          {t.fmRecent}
        </div>
        <div className="space-y-2">
          {[
            { ic: Bath, l: t.bathroomStandard, t: "2m" },
            { ic: ChefHat, l: t.kitchenStandard, t: "15m" },
            { ic: Droplets, l: t.descaling, t: "1h" }
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition active:scale-[0.98]" style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#0F172A" }}>
                <item.ic size={18} color={C.warm} strokeWidth={2.2} />
              </div>
              <div className="flex-1 font-semibold text-sm text-white">{item.l}</div>
              <div className="text-xs" style={{ color: "#64748B" }}>{item.t}</div>
              <ArrowRight size={16} color="#94A3B8" />
            </button>
          ))}
        </div>
      </div>

      {/* QR */}
      <div className="px-5 mt-6">
        <button className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition active:scale-[0.98]" style={{ background: C.warm, color: "#fff", fontFamily: DISPLAY }}>
          📷 Scan room QR code
        </button>
      </div>
    </div>
  );
}

function FieldCard({ icon: Icon, label, sub, color }) {
  return (
    <button
      className="rounded-2xl p-4 text-left transition active:scale-95"
      style={{ background: "#1E293B", border: "1px solid #334155" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: color }}>
        <Icon size={20} color="#fff" strokeWidth={2.5} />
      </div>
      <div className="font-bold text-white text-sm leading-tight" style={{ fontFamily: DISPLAY }}>{label}</div>
      <div className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>{sub}</div>
    </button>
  );
}

/* ======================================================================
   SCREEN: Profile / Me
   ====================================================================== */
function MeScreen({ lang, worker, onLogout, onChangeLang }) {
  const t = T[lang];
  return (
    <div className="px-5 pt-5 pb-24" style={{ background: C.bg, fontFamily: BODY_BY_LANG[lang] }}>
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-4xl mb-3" style={{ background: worker.color, color: "#fff", fontFamily: DISPLAY }}>
          {worker.initials}
        </div>
        <div className="font-extrabold text-2xl" style={{ color: C.ink, fontFamily: DISPLAY }}>{worker.name}</div>
        <div className="text-sm" style={{ color: C.ink2 }}>{worker.role} · Bengaluru</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <Stat label={t.completed} value="2" color={C.green} />
        <Stat label={t.dayStreak} value="7" color={C.warm} />
        <Stat label={t.badges} value="2" color={C.brand} />
      </div>

      <div className="mt-6 rounded-2xl overflow-hidden" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
        <Row icon={Languages} label={t.chooseLang} value={T[lang].native} onClick={onChangeLang} />
        <Row icon={Volume2} label="Audio test" value={t.listen} />
        <Row icon={Settings} label="Settings" />
        <Row icon={X} label="Log out" onClick={onLogout} danger />
      </div>

      <div className="mt-6 text-center text-xs" style={{ color: C.ink3 }}>
        Clean Warks · v1.0 · {t.online}
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: C.surface, border: `1.5px solid ${C.line}` }}>
      <div className="font-extrabold text-2xl" style={{ color, fontFamily: DISPLAY }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: C.ink3 }}>{label}</div>
    </div>
  );
}
function Row({ icon: Icon, label, value, onClick, danger }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 transition active:bg-slate-50 text-left" style={{ borderBottom: `1px solid ${C.line}` }}>
      <Icon size={18} color={danger ? C.red : C.ink2} />
      <span className="flex-1 text-sm font-semibold" style={{ color: danger ? C.red : C.ink }}>{label}</span>
      {value && <span className="text-xs" style={{ color: C.ink3 }}>{value}</span>}
      {!danger && <ChevronRight size={16} color={C.ink3} />}
    </button>
  );
}

/* ======================================================================
   ADMIN PANEL — peek view, shown when admin toggle is on
   ====================================================================== */
function AdminPanel() {
  const [tab, setTab] = useState("workers");
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.line}`, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.line}`, background: "#FAFBFC" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.brand }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: C.ink, fontFamily: DISPLAY }}>Clean Warks Admin</div>
            <div className="text-[10px]" style={{ color: C.ink3 }}>cleanwarks.com/admin</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: C.brand, color: "#fff" }}>+ Add module</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 p-4" style={{ background: "#FAFBFC", borderBottom: `1px solid ${C.line}` }}>
        <AdminStat icon={Users} label="Active workers" value="14" color={C.brand} />
        <AdminStat icon={CheckCircle2} label="Avg. completion" value="68%" color={C.green} />
        <AdminStat icon={FileText} label="Published" value="12" color={C.warm} />
        <AdminStat icon={Languages} label="Translations pending" value="3" color={C.red} />
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 flex gap-1" style={{ borderBottom: `1px solid ${C.line}` }}>
        {[
          { id: "workers", label: "Workers", icon: Users },
          { id: "content", label: "Content", icon: FileText },
          { id: "translations", label: "Translations", icon: Languages },
          { id: "analytics", label: "Analytics", icon: BarChart3 }
        ].map(t2 => (
          <button
            key={t2.id}
            onClick={() => setTab(t2.id)}
            className="px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 border-b-2"
            style={{
              color: tab === t2.id ? C.brand : C.ink2,
              borderColor: tab === t2.id ? C.brand : "transparent"
            }}
          >
            <t2.icon size={13} /> {t2.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-4">
        {tab === "workers" && (
          <div className="space-y-1.5">
            {WORKERS.map(w => (
              <div key={w.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "#F8FAFC" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: w.color, color: "#fff" }}>{w.initials}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: C.ink }}>{w.name}</div>
                  <div className="text-[11px]" style={{ color: C.ink3 }}>{w.role} · ml</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px]" style={{ color: C.ink3 }}>Progress</div>
                    <div className="font-bold text-xs" style={{ color: C.ink }}>{Math.floor(Math.random() * 70 + 20)}%</div>
                  </div>
                  <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 70 + 20)}%`, background: C.green }}></div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: C.greenSoft, color: C.green }}>active</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "content" && (
          <div className="space-y-2">
            {MODULES.slice(0, 5).map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "#F8FAFC" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${m.color}1A` }}>
                  <m.icon size={18} color={m.color} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: C.ink }}>{T.en[m.titleKey]}</div>
                  <div className="text-[11px]" style={{ color: C.ink3 }}>{m.category} · 7 steps · YouTube ✓</div>
                </div>
                <div className="flex gap-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: C.greenSoft, color: C.green }}>EN</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: C.greenSoft, color: C.green }}>ML</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: C.greenSoft, color: C.green }}>HI</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#FEF3C7", color: C.warmDark }}>TA</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#FEF3C7", color: C.warmDark }}>BN</span>
                </div>
                <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "#fff", border: `1px solid ${C.line}`, color: C.ink }}>Edit</button>
              </div>
            ))}
          </div>
        )}
        {tab === "translations" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold" style={{ color: C.ink }}>Bathroom — Standard Clean</div>
              <select className="text-xs px-2 py-1 rounded border" style={{ borderColor: C.line }}>
                <option>Tamil (தமிழ்)</option>
                <option>Bengali</option>
              </select>
            </div>
            <div className="space-y-2">
              {[
                { en: "Open the window", ta: "ஜன்னலைத் திற", status: "ok" },
                { en: "Wear gloves and mask", ta: "கையுறை மற்றும் முகமூடி அணியவும்", status: "ok" },
                { en: "Spray R1 descaler 1:10", ta: "", status: "missing" },
                { en: "Wait 5 minutes", ta: "5 நிமிடம் காத்திருக்கவும்", status: "ok" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-start p-2 rounded" style={{ background: row.status === "missing" ? "#FEF3C7" : "#F8FAFC" }}>
                  <div className="col-span-5 text-xs" style={{ color: C.ink2 }}>{row.en}</div>
                  <div className="col-span-6">
                    <input
                      defaultValue={row.ta}
                      placeholder="Add translation..."
                      className="w-full text-xs px-2 py-1.5 rounded border bg-white"
                      style={{ borderColor: row.status === "missing" ? C.warm : C.line }}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {row.status === "ok" ? <Check size={14} color={C.green} /> : <AlertTriangle size={14} color={C.warm} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "analytics" && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg" style={{ background: "#F8FAFC" }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: C.ink3 }}>Top module</div>
                <div className="font-bold text-sm mt-1" style={{ color: C.ink }}>PPE Usage</div>
                <div className="text-[11px]" style={{ color: C.green }}>92% complete</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "#F8FAFC" }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: C.ink3 }}>Most missed quiz</div>
                <div className="font-bold text-sm mt-1" style={{ color: C.ink }}>Cloth color</div>
                <div className="text-[11px]" style={{ color: C.red }}>34% wrong</div>
              </div>
            </div>
            <div className="text-xs font-bold mb-2" style={{ color: C.ink }}>Module completion by language</div>
            <div className="space-y-1.5">
              {[
                { lang: "English", v: 78, n: 6 },
                { lang: "Malayalam", v: 64, n: 5 },
                { lang: "Hindi", v: 58, n: 3 }
              ].map(r => (
                <div key={r.lang} className="flex items-center gap-3">
                  <div className="text-xs font-semibold w-20" style={{ color: C.ink2 }}>{r.lang}</div>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                    <div className="h-full rounded-full" style={{ width: `${r.v}%`, background: C.brand }}></div>
                  </div>
                  <div className="text-xs font-bold w-10 text-right" style={{ color: C.ink }}>{r.v}%</div>
                  <div className="text-[10px] w-16" style={{ color: C.ink3 }}>{r.n} workers</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminStat({ icon: Icon, label, value, color }) {
  return (
    <div className="p-3 rounded-lg bg-white" style={{ border: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} color={color} />
        <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: C.ink3 }}>{label}</div>
      </div>
      <div className="font-extrabold text-xl" style={{ color: C.ink, fontFamily: DISPLAY }}>{value}</div>
    </div>
  );
}

/* ======================================================================
   ROOT APP
   ====================================================================== */
export default function App() {
  useFonts();
  const [view, setView] = useState("phone"); // "phone" | "admin"
  const [screen, setScreen] = useState("language");
  const [lang, setLang] = useState("en");
  const [worker, setWorker] = useState(null);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [tab, setTab] = useState("home");
  const [progress, setProgress] = useState({
    ppe: { status: "completed" },
    cloth: { status: "completed" },
    bathroom: { status: "in_progress", stage: "watch" }
  });
  const [online, setOnline] = useState(true);

  const goHome = () => { setScreen("home"); setTab("home"); };
  const t = T[lang];

  /* Phone screen routing */
  let phoneScreen;
  if (screen === "language") {
    phoneScreen = <LanguageScreen onPick={(l) => { setLang(l); setScreen("profile"); }} />;
  } else if (screen === "profile") {
    phoneScreen = <ProfilePickerScreen lang={lang} onPick={(w) => { setWorker(w); setScreen("pin"); }} onBack={() => setScreen("language")} />;
  } else if (screen === "pin") {
    phoneScreen = <PinScreen lang={lang} worker={worker} onPass={goHome} onBack={() => setScreen("profile")} />;
  } else if (screen === "field") {
    phoneScreen = <FieldModeScreen lang={lang} onBack={goHome} />;
  } else if (screen === "moduleDetail" && openModuleId) {
    phoneScreen = (
      <ModuleDetailScreen
        lang={lang}
        moduleId={openModuleId}
        progress={progress}
        onBack={() => setScreen("home")}
        onPractice={() => setScreen("practice")}
        onChecklist={() => setScreen("checklist")}
        onQuiz={() => setScreen("quiz")}
      />
    );
  } else if (screen === "practice") {
    phoneScreen = <PracticeScreen lang={lang} onDone={() => setScreen("checklist")} onBack={() => setScreen("moduleDetail")} />;
  } else if (screen === "checklist") {
    phoneScreen = <ChecklistScreen lang={lang} onDone={() => setScreen("quiz")} onBack={() => setScreen("moduleDetail")} />;
  } else if (screen === "quiz") {
    phoneScreen = <QuizScreen lang={lang} onDone={() => {
      setProgress({ ...progress, bathroom: { status: "completed" } });
      setScreen("certificate");
    }} onBack={() => setScreen("moduleDetail")} />;
  } else if (screen === "certificate") {
    phoneScreen = <CertificateScreen lang={lang} worker={worker} onHome={goHome} />;
  } else if (screen === "home") {
    if (tab === "home") {
      phoneScreen = (
        <HomeScreen
          lang={lang}
          worker={worker}
          progress={progress}
          onOpenModule={(id) => { setOpenModuleId(id); setScreen("moduleDetail"); }}
          onAllModules={() => setTab("modules")}
          onFieldMode={() => setScreen("field")}
        />
      );
    } else if (tab === "modules") {
      phoneScreen = (
        <ModuleListScreen
          lang={lang}
          progress={progress}
          onOpenModule={(id) => { setOpenModuleId(id); setScreen("moduleDetail"); }}
        />
      );
    } else if (tab === "field") {
      phoneScreen = <FieldModeScreen lang={lang} onBack={goHome} />;
    } else if (tab === "me") {
      phoneScreen = <MeScreen lang={lang} worker={worker} onLogout={() => { setScreen("language"); setWorker(null); setTab("home"); }} onChangeLang={() => setScreen("language")} />;
    }
  }

  const showNav = screen === "home" && (tab === "home" || tab === "modules" || tab === "me");

  return (
    <div style={{ background: "#EEEAE2", minHeight: "100vh", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
      {/* Top bar — outside the phone */}
      <div className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.brand }}>
            <Sparkles size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-extrabold text-base" style={{ color: C.ink, fontFamily: DISPLAY }}>Clean Warks Training</div>
            <div className="text-[11px]" style={{ color: C.ink3 }}>Interactive prototype · {worker ? worker.name : "logged out"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: online ? C.greenSoft : "#FEF3C7", color: online ? C.green : C.warmDark }}>
            <div className="w-2 h-2 rounded-full" style={{ background: online ? C.green : C.warm }}></div>
            {online ? t.online : t.offline}
          </div>
          <button
            onClick={() => setOnline(!online)}
            className="hidden sm:block px-3 py-1.5 rounded-full text-xs font-bold transition"
            style={{ background: "#fff", border: `1px solid ${C.line}`, color: C.ink2 }}
          >Toggle network</button>
          <div className="flex rounded-full p-1" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
            <button
              onClick={() => setView("phone")}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition"
              style={{ background: view === "phone" ? C.brand : "transparent", color: view === "phone" ? "#fff" : C.ink2 }}
            >📱 Worker</button>
            <button
              onClick={() => setView("admin")}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition"
              style={{ background: view === "admin" ? C.brand : "transparent", color: view === "admin" ? "#fff" : C.ink2 }}
            >🖥 Admin</button>
          </div>
        </div>
      </div>

      {view === "phone" && (
        <div className="px-4 pb-10 flex flex-col lg:flex-row items-start justify-center gap-8 max-w-6xl mx-auto">
          {/* Phone */}
          <div className="relative flex-shrink-0 mx-auto">
            <PhoneFrame online={online}>
              {phoneScreen}
              {showNav && <BottomNav active={tab} onChange={(k) => { setTab(k); if (k === "field") setScreen("field"); else setScreen("home"); }} lang={lang} />}
            </PhoneFrame>
          </div>

          {/* Side panel — explanatory hints */}
          <div className="flex-1 max-w-md mt-2">
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
              <div className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: C.ink3, letterSpacing: "0.12em" }}>
                You are looking at
              </div>
              <h2 className="font-extrabold text-xl mb-2" style={{ color: C.ink, fontFamily: DISPLAY, letterSpacing: "-0.02em" }}>
                {screen === "language" && "Language picker"}
                {screen === "profile" && "Profile picker login"}
                {screen === "pin" && "PIN entry"}
                {screen === "home" && tab === "home" && "Worker dashboard"}
                {screen === "home" && tab === "modules" && "Module library"}
                {screen === "home" && tab === "me" && "Worker profile"}
                {screen === "field" && "Field Mode"}
                {screen === "moduleDetail" && "Module overview"}
                {screen === "practice" && "Practice mode"}
                {screen === "checklist" && "Pre-quiz checklist"}
                {screen === "quiz" && "Image quiz"}
                {screen === "certificate" && "Badge celebration"}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.ink2 }}>
                {screen === "language" && "First-time onboarding. Audio button speaks the welcome in each language so non-readers can recognise theirs. Adding more languages = adding a JSON entry."}
                {screen === "profile" && "No SMS, no OTP. Worker taps their photo (initials shown here for demo) — same mental model as Netflix profile picker. Free, works for non-readers, ₹0/month."}
                {screen === "pin" && "4-digit PIN. Set on first login by supervisor or worker. Use 1234 for the demo. Auto-submits when 4 digits entered."}
                {screen === "home" && tab === "home" && "Glanceable: progress ring, streak, current module, badges. Big tap targets. Try the green Listen button on any module page."}
                {screen === "home" && tab === "modules" && "Modules grouped by category. Locked modules require prerequisites — enforced by role-based learning paths in admin."}
                {screen === "home" && tab === "me" && "Profile, language switch, audio test, logout. Workers can swap languages anytime without losing progress."}
                {screen === "field" && "The killer feature. Different visual register on purpose — high contrast, urgent feel. Designed for 60-second on-site reference. QR scan opens the right procedure for the room."}
                {screen === "moduleDetail" && "Watch → Practice → Checklist → Quiz → Done. Video slot represents a YouTube unlisted embed. Cloth colour codes always visible."}
                {screen === "practice" && "Step-by-step. Big number, large icon visual, two short sentences max, audio button. Progress bar at top. Works offline."}
                {screen === "checklist" && "Worker self-confirms each step before quiz unlocks. Forces engagement vs passive video watching."}
                {screen === "quiz" && "Image-based. No reading required to interpret options — colours speak for themselves. Wrong answer = retry, not punishment."}
                {screen === "certificate" && "Celebration moment. Badge, score, streak. Cheap dopamine that compounds into long-term engagement."}
              </p>

              {/* Language switcher live */}
              <div className="rounded-xl p-3" style={{ background: C.bg }}>
                <div className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: C.ink3, letterSpacing: "0.12em" }}>
                  Try the i18n — switch live
                </div>
                <div className="flex gap-2">
                  {LANG_LIST.map(l => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className="flex-1 px-2 py-2 rounded-lg text-xs font-bold transition"
                      style={{
                        background: lang === l ? C.brand : "#fff",
                        color: lang === l ? "#fff" : C.ink,
                        border: `1.5px solid ${lang === l ? C.brand : C.line}`,
                        fontFamily: BODY_BY_LANG[l]
                      }}
                    >
                      {T[l].native}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] mt-2" style={{ color: C.ink3 }}>
                  Same i18n architecture for Tamil, Bengali, Nepali — just add the JSON file.
                </div>
              </div>
            </div>

            {/* Stack note */}
            <div className="rounded-2xl p-4 mt-3" style={{ background: "#1F2A3A", color: "#fff" }}>
              <div className="text-[10px] uppercase font-bold tracking-wider mb-2 opacity-70" style={{ letterSpacing: "0.12em" }}>
                What you don't see
              </div>
              <ul className="space-y-1.5 text-xs leading-relaxed opacity-90">
                <li>• Real Listen button uses your browser's TTS. Try it on the language picker.</li>
                <li>• Service worker pre-caches assigned modules — works offline after first visit.</li>
                <li>• Toggle the network pill above to simulate offline.</li>
                <li>• Switch to 🖥 Admin view to see the supervisor side.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {view === "admin" && (
        <div className="px-4 pb-10 max-w-5xl mx-auto">
          <AdminPanel />
          <div className="mt-4 text-center text-xs" style={{ color: C.ink3 }}>
            Supervisor logs in here. Adds modules, uploads YouTube URLs, edits translations, sees live worker progress.
          </div>
        </div>
      )}
    </div>
  );
}
