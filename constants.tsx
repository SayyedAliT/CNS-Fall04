
import { PresentationStep, SimulationStep } from './types';

export const PAPER_METADATA = {
  title: "Robust Defenses for Cross-Site Request Forgery",
  authors: "Adam Barth, Collin Jackson, John C. Mitchell",
  institution: "Stanford University",
  year: "2008"
};

export const SECTIONS_CONTENT = {
  [PresentationStep.PROBLEM]: {
    title: "۱. طرح مسئله (The Problem Statement)",
    subtitle: "شکاف امنیتی در معماری Ambient Authority وب",
    details: [
      {
        header: "مفهوم Ambient Authority",
        text: "مشکل اصلی وب این است که مرورگرها به صورت خودکار اطلاعات احراز هویت (کوکی‌ها) را در هر درخواست ارسال می‌کنند. این یعنی مرورگر نمی‌تواند تشخیص دهد که آیا درخواست توسط 'اراده کاربر' ایجاد شده یا توسط 'کد مخرب' در پس‌زمینه."
      },
      {
        header: "حمله نوین: Login CSRF",
        text: "مقاله استنفورد برای اولین بار نشان داد که CSRF فقط برای سرقت پول نیست. در Login CSRF، مهاجم قربانی را به حساب خودش وارد می‌کند. از آنجا که کاربر تصور می‌کند در حساب خودش است، اطلاعات حساس خود (مثل سوابق جستجو یا شماره کارت) را وارد می‌کند که مستقیماً در اکانت مهاجم ثبت می‌شود."
      },
      {
        header: "شکست دفاع‌های کلاسیک",
        text: "روش Referer به دلیل نقض حریم خصوصی توسط فایروال‌ها حذف می‌شد (تا ۱۱٪ خطا). روش توکن (Tokens) هم در صفحات لاگین و استاتیک به دلیل عدم وجود سشن قبلی، عملاً غیرقابل استفاده بود."
      }
    ]
  },
  [PresentationStep.PROPOSAL]: {
    title: "۲. روش ارائه شده (Proposed Method)",
    subtitle: "معرفی هدر Origin: استانداردی برای تشخیص منشأ درخواست",
    details: [
      {
        header: "ساختار هدر Origin",
        text: "این هدر فقط شامل (Protocol, Host, Port) است. برخلاف Referer، مسیر دقیق صفحه (Path) را فاش نمی‌کند تا حریم خصوصی حفظ شود، اما به سرور می‌گوید که درخواست دقیقاً از کدام دامنه شروع شده است."
      },
      {
        header: "الگوریتم تایید در سمت سرور",
        text: "سرور باید سه قانون را چک کند: ۱. اگر منشأ (Origin) با دامنه خودمان یکی است، تایید کن. ۲. اگر منشأ خارجی است و درخواست حساس (POST/PUT) است، بلافاصله رد کن. ۳. اگر هدر وجود نداشت، فقط به درخواست‌های ایمن (GET) اجازه عبور بده."
      },
      {
        header: "مزایای کلیدی",
        text: "حذف کامل State از سمت سرور (برخلاف توکن‌ها)، سرعت پردازش فوق‌العاده بالا (کمتر از ۰.۰۲ میلی‌ثانیه) و عدم تداخل با کش‌های CDN."
      }
    ]
  },
  [PresentationStep.LIMITATIONS]: {
    title: "۴. بحث محدودیت‌ها (Limitations)",
    subtitle: "مرزهای امنیتی و نقاط ضعف باقیمانده",
    details: [
      {
        header: "DNS Rebinding",
        text: "هدر Origin بر پایه نام دامنه کار می‌کند. اگر مهاجم بتواند با DNS Rebinding، آی‌پی دامنه خود را به آی‌پی سرور هدف تغییر دهد، می‌تواند هدر Origin را فریب دهد."
      },
      {
        header: "وابستگی به مرورگر (Client-Side Trust)",
        text: "امنیت این روش کاملاً به این بستگی دارد که مرورگر اجازه تغییر هدر Origin را به جاوااسکریپت ندهد. در مرورگرهای بسیار قدیمی یا پلاگین‌های آسیب‌پذیر (مثل فلش قدیم)، این هدر قابل جعل بود."
      },
      {
        header: "درخواست‌های بدون هدر",
        text: "برخی درخواست‌ها از منابع غیر-وب (مثل اپلیکیشن‌های موبایل قدیمی) ممکن است هدر Origin ارسال نکنند. سرور باید بین 'نبودن هدر' و 'حمله' تمایز قائل شود که خود چالش‌برانگیز است."
      }
    ]
  }
};

export const SIMULATION_DATA: SimulationStep[] = [
  {
    id: 1,
    phase: "۱. تزریق و فریب (Injection)",
    description: "مهاجم یک صفحه جعلی با جاذبه بالا طراحی کرده که شامل فرم مخفی برای لاگین در سایت بانک است.",
    hackerAction: "HOSTING: malicious-site.com/gift\nPAYLOAD: <form id='x' action='bank.com/login' method='POST'>\n<input name='u' value='hacker_user'>\n</pre>",
    victimAction: "قربانی روی لینک 'دریافت جایزه' کلیک می‌کند.",
    serverResponse: "Bank Server: Standing by...",
    flow: 'H2V',
    logs: [
      { id: '1', timestamp: '10:00', source: 'ATTACKER', message: 'Payload ready at /gift', type: 'info' },
      { id: '2', timestamp: '10:01', source: 'VICTIM', message: 'User navigation to malicious site', type: 'warning' }
    ]
  },
  {
    id: 2,
    phase: "۲. ارسال درخواست ناخواسته (Auto-Submit)",
    description: "مرورگر به طور خودکار فرم را ارسال کرده و کوکی‌های بانکی کاربر را هم پیوست می‌کند.",
    hackerAction: "Waiting for redirect...",
    victimAction: "در حال ارسال خودکار درخواست POST به بانک...",
    serverResponse: "POST /login - Processing...",
    flow: 'V2S',
    requestHeaders: {
      "Host": "bank.com",
      "Cookie": "session_id=victim_secret",
      "Content-Type": "form-data"
    },
    logs: [
      { id: '3', timestamp: '10:02', source: 'VICTIM', message: 'Automatic POST to bank.com initiated', type: 'critical' }
    ]
  },
  {
    id: 3,
    phase: "۳. نفوذ کامل (The Exploit)",
    description: "در نبود هدر Origin، سرور درخواست را می‌پذیرد و کاربر را در اکانت مهاجم لاگین می‌کند.",
    hackerAction: "VICTORY: Victim is now tracking their cards in MY account.",
    victimAction: "پیام سایت: 'خوش آمدید، hacker_user'",
    serverResponse: "HTTP 200 OK - Welcome hacker_user",
    flow: 'S2V',
    logs: [
      { id: '4', timestamp: '10:03', source: 'SERVER', message: 'Login success: hacker_user', type: 'success' },
      { id: '5', timestamp: '10:04', source: 'ATTACKER', message: 'Harvesting victim search data...', type: 'critical' }
    ]
  },
  {
    id: 4,
    phase: "۴. مهار با هدر Origin (The Defense)",
    description: "حالا سرور هدر Origin را چک می‌کند. چون با دامنه بانک یکی نیست، درخواست بلافاصله مسدود می‌شود.",
    hackerAction: "ATTACK FAILED: Origin blocked.",
    victimAction: "ERROR: Access Denied",
    serverResponse: "403 Forbidden - Security Mismatch",
    flow: 'V2S',
    requestHeaders: {
      "Origin": "https://malicious-site.com",
      "Host": "bank.com"
    },
    logs: [
      { id: '6', timestamp: '10:10', source: 'SERVER', message: 'Validating Origin Header...', type: 'info' },
      { id: '7', timestamp: '10:10', source: 'SERVER', message: 'Mismatch: malicious-site.com != bank.com', type: 'error' },
      { id: '8', timestamp: '10:11', source: 'SERVER', message: 'Attack Blocked successfully.', type: 'success' }
    ]
  }
];
