import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      brand: "Gap Mesh",
      nav: {
        home: "Home",
        privacy: "Privacy Policy",
        github: "GitHub",
        download: "Download"
      },
      hero: {
        pres: "Gap Mesh is the",
        drama: "Communication beyond."
      },
      features: {
        f1_title: "Offline Mesh Network",
        f1_desc: "Direct Bluetooth peer-to-peer communication within range. No internet required.",
        f2_title: "Global Location Channels",
        f2_desc: "Connect with people in your geographic area using Tor and Nostr relays.",
        f3_title: "Privacy First & Encrypted",
        f3_desc: "End-to-End Encryption with Noise Protocol. No accounts, phone numbers, or metadata tracking.",
        diagnostic_labels: ["Connecting to Peers", "Establishing Mesh", "Routing Offline Messages"],
        live_feed: "Live Feed",
        secure_click: "Secure Delivery Verified"
      },
      philosophy: {
        common: "Most messaging focuses on: Centralized servers and metadata surveillance.",
        differentiated: "We focus on: Unstoppable peer-to-peer messaging."
      },
      protocol: {
        step1: {
          num: "01",
          title: "Intelligent Routing",
          desc: "Gap Mesh constantly scans for nearby Bluetooth and Wi-Fi peers to route your messages."
        },
        step2: {
          num: "02",
          title: "Nostr Fallback",
          desc: "When offline paths fail, messages securely traverse global internet relays."
        },
        step3: {
          num: "03",
          title: "Hardware Security",
          desc: "Keys stored in Secure Enclave with a crash-resilient panic wipe system."
        }
      },
      advanced_features: {
        title: "Threat Model Protection & Capabilities",
        subtitle: "Advanced features designed for hostile environments.",
        panic_wipe: { title: "Decoy Mode & Panic Wipe", desc: "Hardware-backed emergency wipe destroys all cryptographic keys instantly. Decoy mode provides plausible deniability." },
        disguise: { title: "App Disguise & Tor Routing", desc: "Camouflage Gap Mesh as a calculator or weather app. Route online traffic through the Tor anonymity network." },
        anonymity: { title: "Absolute Anonymity", desc: "No phone numbers required. No accounts. No centralized metadata collection." },
        rich_media: { title: "Rich Media & Commands", desc: "Send encrypted images and voice notes. Use IRC-style slash commands." },
        offline_share: { title: "Offline App Sharing", desc: "Share the Android app directly with nearby iOS and Android users without any internet connection." }
      },
      downloads: {
        title: "Install Gap Mesh",
        app_store: "Download on the App Store",
        google_play: "Coming Soon on Google Play",
        testflight: "Join TestFlight Beta (iOS)",
        android_beta: "Join Android Beta",
        github_ios: "Source Code (iOS)",
        github_android: "Source Code (Android)",
        apk: "Download APK Directly"
      },
      footer: {
        tagline: "Decentralized • Private • Free",
        user_guide: "User Guide (English)",
        user_guide_fa: "User Guide (Farsi)",
        privacy: "Privacy Policy"
      }
    }
  },
  fa: {
    translation: {
      brand: "گپ مش (Gap Mesh)",
      nav: {
        home: "خانه",
        privacy: "حریم خصوصی",
        github: "گیت‌هاب",
        download: "دانلود"
      },
      hero: {
        pres: "گپ مش یعنی",
        drama: "ارتباطات فراتر از مرزها."
      },
      features: {
        f1_title: "شبکه مش آفلاین",
        f1_desc: "ارتباط مستقیم بلوتوثی همتابه‌همتا در محدوده. بدون نیاز به اینترنت.",
        f2_title: "کانال‌های موقعیت مکانی جهانی",
        f2_desc: "با افراد در منطقه جغرافیایی خود از طریق رله‌های تور و Nostr ارتباط برقرار کنید.",
        f3_title: "حریم خصوصی اول و رمزگذاری شده",
        f3_desc: "رمزگذاری سرتاسری با پروتکل Noise. بدون نیاز به حساب کاربری، شماره تلفن یا ردیابی فراداده.",
        diagnostic_labels: ["در حال اتصال به همتایان", "ایجاد شبکه مش", "مسیریابی پیام‌های آفلاین"],
        live_feed: "فید زنده",
        secure_click: "تحویل امن تأیید شد"
      },
      philosophy: {
        common: "تمرکز بیشتر پیام‌رسان‌ها: سرورهای متمرکز و نظارت بر فراداده.",
        differentiated: "تمرکز ما: حریم خصوصی و ارتباطات غیرقابل توقف نظیر به نظیر."
      },
      protocol: {
        step1: {
          num: "۰۱",
          title: "مسیریابی هوشمند",
          desc: "گپ مش به طور مداوم برای یافتن همتایان بلوتوثی و وای‌فای نزدیک جهت مسیریابی پیام‌های شما جستجو می‌کند."
        },
        step2: {
          num: "۰۲",
          title: "جایگزین Nostr",
          desc: "هنگامی که مسیرهای آفلاین با شکست مواجه می‌شوند، پیام‌ها به طور امن از طریق رله‌های اینترنتی جهانی عبور می‌کنند."
        },
        step3: {
          num: "۰۳",
          title: "امنیت سخت‌افزاری",
          desc: "کلیدها در فضای امن (Secure Enclave) به همراه سیستم پاکسازی اضطراری (Panic Wipe) ذخیره می‌شوند."
        }
      },
      advanced_features: {
        title: "حفاظت در برابر تهدیدات و قابلیت‌ها",
        subtitle: "ویژگی‌های پیشرفته طراحی شده برای حفظ امنیت شما.",
        panic_wipe: { title: "حالت فریب و پاکسازی اضطراری", desc: "پاکسازی سریع و امن کلیدهای رمزنگاری در مواقع اضطراری. حالت فریب برای انکار منطقی تعبیه شده است." },
        disguise: { title: "تغییر آیکون و مسیریابی تور", desc: "مخفی کردن برنامه به شکل ماشین حساب یا هواشناسی. عبور ترافیک از شبکه ناشناس تور." },
        anonymity: { title: "ناشناسی مطلق", desc: "بدون نیاز به شماره تلفن. بدون حساب کاربری. بدون جمع‌آوری اطلاعات و فراداده." },
        rich_media: { title: "ارسال فایل و دستورات", desc: "ارسال تصاویر و پیام‌های صوتی رمزنگاری شده. استفاده از دستورات مشابه IRC." },
        offline_share: { title: "اشتراک‌گذاری آفلاین برنامه", desc: "برنامه اندروید را به طور مستقیم و بدون نیاز به اینترنت با سایر کاربران آی‌اواس و اندروید به اشتراک بگذارید." }
      },
      downloads: {
        title: "نصب گپ مش",
        app_store: "دانلود از اپ استور",
        google_play: "به زودی در گوگل پلی",
        testflight: "پیوستن به TestFlight (آی‌اواس)",
        android_beta: "پیوستن به نسخه بتا (اندروید)",
        github_ios: "سورس کد (آی‌اواس)",
        github_android: "سورس کد (اندروید)",
        apk: "دانلود مستقیم APK"
      },
      footer: {
        tagline: "غیرمتمرکز • خصوصی • رایگان",
        user_guide: "راهنمای کاربر (انگلیسی)",
        user_guide_fa: "راهنمای کاربر (فارسی)",
        privacy: "سیاست حریم خصوصی"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
