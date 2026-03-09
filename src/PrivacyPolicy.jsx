import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contentEn = `
# Gap Mesh Privacy Policy
_Last updated: March 2026_

## Our Commitment
Gap Mesh is designed with privacy as its foundation. We believe private communication is a fundamental human right. This policy explains how Gap Mesh protects your privacy.

## Summary
- **No personal data collection** - We don't collect names, emails, or phone numbers
- **Hybrid Functionality** - Gap Mesh offers two modes of communication:
  - **Bluetooth Mesh Chat**: This mode is completely offline, using peer-to-peer Bluetooth connections. It does not use any servers or internet connection.
  - **Geohash Chat**: This mode uses an internet connection to communicate with others in a specific geographic area. It relies on Nostr relays for message transport. Connections to these relays are routed through the Tor network (via Arti) to anonymize your connection metadata and protect your privacy.
- **No tracking** - We have no analytics, telemetry, or user tracking
- **Open source** - You can verify these claims by reading our code

## What Information Gap Mesh Stores

### On Your Device Only
1. **Identity Key**
   - A cryptographic key generated on first launch
   - Stored locally in your device's secure storage (StrongBox on Android / Secure Enclave on iOS)
   - Allows you to maintain "favorite" relationships across app restarts
   - Never leaves your device

2. **Nickname**
   - The display name you choose (or auto-generated)
   - Stored only on your device
   - Shared with peers you communicate with

3. **Message History** (if enabled)
   - When room owners enable retention, messages are saved locally
   - Stored encrypted on your device
   - You can delete this at any time

4. **Favorite Peers**
   - Public keys of peers you mark as favorites
   - Stored only on your device
   - Allows you to recognize these peers in future sessions

### Temporary Session Data
During each session, Gap Mesh temporarily maintains:
- Active peer connections (forgotten when app closes)
- Routing information for message delivery
- Cached messages for offline peers (12 hours max)

## What Information is Shared

### With Other Gap Mesh Users
When you use Gap Mesh, nearby peers can see:
- Your chosen nickname
- Your ephemeral public key (changes each session)
- Messages you send to public rooms or directly to them
- Your approximate Bluetooth signal strength (for connection quality)

### With Room Members
When you join a password-protected room:
- Your messages are visible to others with the password
- Your nickname appears in the member list
- Room owners can see you've joined

## What We DON'T Do
Gap Mesh **never**:
- Collects personal information
- Tracks your location
- Stores data on servers
- Shares data with third parties
- Uses analytics or telemetry
- Creates user profiles
- Requires registration

## Encryption
All private messages use end-to-end encryption:
- **X25519** for key exchange
- **AES-256-GCM** for message encryption
- **Ed25519** for digital signatures
- **Argon2id** for password-protected rooms

## Your Rights
You have complete control:
- **Delete Everything (Panic Wipe)**: Triple-tap the logo to instantly wipe all data. This triggers a crash-resilient secure wipe that permanently erases all cryptographic keys and data from secure hardware storage (StrongBox/Secure Enclave).
- **Leave Anytime**: Close the app and your presence disappears
- **No Account**: Nothing to delete from servers because there are none
- **Portability**: Your data never leaves your device unless you export it

## Bluetooth & Permissions
Gap Mesh requires Bluetooth permission to function:
- Used only for peer-to-peer communication
- No location data is accessed or stored
- Bluetooth is not used for tracking
- You can revoke this permission at any time in system settings

## Security Measures
- All communication is encrypted
- No data transmitted to servers (there are none)
- Open source code for public audit
- Regular security updates
- Cryptographic signatures prevent tampering
- Strong hardware-backed storage encryption
- Emergency panic wipe system designed to survive app crashes

## Contact
- Android: [https://github.com/darabo/gap-android-main](https://github.com/darabo/gap-android-main)
- iOS: [https://github.com/darabo/gapmesh-ios](https://github.com/darabo/gapmesh-ios)

## Philosophy
Privacy isn't just a feature—it's the entire point. Gap Mesh proves that modern communication doesn't require surrendering your privacy. No accounts, no servers, no surveillance. Just people talking freely.
  `;

  const contentFa = `
# سیاست حفظ حریم خصوصی Gap Mesh
_آخرین به روز رسانی: مارس 2026_

## تعهد ما
برنامه Gap Mesh با توجه به حفظ حریم خصوصی طراحی شده است. ما معتقدیم ارتباط خصوصی یک حق اساسی بشر است. این سیاست نحوه حفاظت Gap Mesh از حریم خصوصی شما را توضیح می‌دهد.

## خلاصه
- **بدون جمع‌آوری داده‌های شخصی** - ما نام، ایمیل، یا شماره تلفن‌ها را جمع‌آوری نمی‌کنیم.
- **عملکرد ترکیبی** - برنامه Gap Mesh دو حالت ارتباطی ارائه می‌دهد:
  - **چت شبکه بلوتوث (Mesh)**: این حالت کاملاً آفلاین است و از اتصالات نظیر به نظیر بلوتوث استفاده می‌کند. از هیچ سرور یا اتصال اینترنتی استفاده نمی‌کند.
  - **چت Geohash**: این حالت از اتصال اینترنت برای ارتباط با دیگران در یک منطقه جغرافیایی خاص استفاده می‌کند و به رله‌های Nostr متکی است. اتصالات به این رله‌ها از طریق شبکه Tor هدایت می‌شوند تا اتصال شما ناشناس بماند.
- **بدون ردیابی** - ما هیچ سیستم تحلیلی، تله‌متری یا ردیابی کاربر نداریم.
- **متن‌باز** - شما می‌توانید این ادعاها را با خواندن کدهای ما تأیید کنید.

## آنچه Gap Mesh ذخیره می‌کند

### فقط در دستگاه شما
۱. **کلید هویت (Identity Key)**
- یک کلید رمزنگاری که در اولین راه‌اندازی تولید می‌شود.
- محل امن (Secure Enclave/StrongBox) نگهداری میشود.
- هرگز از دستگاه خارج نمی‌شود.

۲. **نام مستعار (Nickname)**
- فقط روی دستگاه شما ذخیره می‌شود.

۳. **تاریخچه پیام‌ها** (در صورت فعال بودن)
- روی دستگاه به صورت رمزگذاری شده ذخیره می‌شود.

۴. **همتایان مورد علاقه (Favorite Peers)**
- کلیدهای عمومی همتایان فقط روی دستگاه ذخیره می‌شود.

## کارهایی که ما انجام نمی‌دهیم
برنامه Gap Mesh **هرگز**:
- اطلاعات شخصی را جمع‌آوری نمی‌کند.
- مکان شما را ردیابی نمی‌کند.
- داده‌ای را روی سرورها ذخیره نمی‌کند.
- نظارتی بر اطلاعات شما ندارد.

## حقوق شما
شما کنترل کامل دارید:
- **شیر برقی / Panic Wipe**: سه بار ضربه روی لوگو تمام داده‌ها و کلیدهای رمزنگاری را به شدت پاکسازی میکند.
- **ترک کردن**: با بسته شدن برنامه حضور شما ناپدید می‌شود.
- **بدون حساب کاربری**: نیازی به سرور برای پاک کردن حساب نیست.

## بلوتوث و مجوزها
- فقط برای ارتباط نظیر به نظیر استفاده می‌شود.
- هیچ داده مکانی مورد دسترسی یا ذخیره قرار نمی‌گیرد.

## رمزگذاری
پیام‌های خصوصی از رمزگذاری سرتاسری استفاده می‌کنند:
- **X25519**
- **AES-256-GCM**
- **Ed25519**
- **Argon2id**

## تماس با ما
- اندروید: [https://github.com/darabo/gap-android-main](https://github.com/darabo/gap-android-main)
- آی‌اواس: [https://github.com/darabo/gapmesh-ios](https://github.com/darabo/gapmesh-ios)

## فلسفه ما
حریم خصوصی فقط یک قابلیت نیست—همه چیزِ این برنامه است. بدون حساب کاربری، بدون سرور، بدون نظارت. فقط انسان‌هایی که آزادانه صحبت می‌کنند.
  `;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-6">
      
      {/* Mini Header */}
      <nav className="max-w-3xl mx-auto flex items-center justify-between mb-12 border-b border-black/10 dark:border-white/10 pb-6 relative z-10">
        <Link to="/" className="flex items-center gap-2 group text-text-light/70 dark:text-text-dark/70 hover:text-accent font-sans font-medium transition-colors">
          {i18n.language === 'fa' ? (
            <><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> بازگشت به خانه</>
          ) : (
            <><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home</>
          )}
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={toggleLanguage} className="font-mono text-sm font-bold uppercase hover:text-accent transition-colors">
            {i18n.language === 'en' ? 'FA' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto prose dark:prose-invert prose-p:font-sans prose-headings:font-sans prose-headings:font-bold prose-h1:text-4xl prose-h1:text-accent prose-h2:text-2xl prose-a:text-accent hover:prose-a:text-accent/80 prose-li:font-sans prose-li:marker:text-accent relative z-10">
        <Markdown remarkPlugins={[remarkGfm]}>
          {i18n.language === 'en' ? contentEn : contentFa}
        </Markdown>
      </article>

    </div>
  );
}
