
import { PresentationStep, SimulationStep } from './types';

export const PAPER_METADATA = {
  title: "Robust Defenses for Cross-Site Request Forgery",
  authors: "Adam Barth, Collin Jackson, John C. Mitchell",
  institution: "Stanford University",
  year: "2008",
  venue: "ACM Conference on Computer and Communications Security (CCS)"
};

export const SECTIONS_CONTENT = {
  [PresentationStep.PROBLEM]: {
    title: "۱. کالبدشکافی طرح مسئله",
    subtitle: "تراژدی اعتماد خودکار در معماری وب",
    details: [
      {
        header: "Ambient Authority: ریشه مشکل",
        text: "مرورگرها طوری طراحی شده‌اند که هر درخواستی به یک دامنه خاص را با تمام کوکی‌های احراز هویت آن دامنه همراه می‌کنند. این مکانیسم بدون توجه به اینکه درخواست از سوی کاربر (Intent) بوده یا یک اسکریپت مخرب، عمل می‌کند. در واقع مرورگر 'کورکورانه' به منشأ درخواست اعتماد می‌کند."
      },
      {
        header: "Login CSRF: فراتر از سرقت داده",
        text: "مقاله استنفورد نشان داد که CSRF فقط برای انجام تراکنش نیست. در Login CSRF، مهاجم قربانی را به حساب 'خود مهاجم' وارد می‌کند. کاربر که تصور می‌کند در حساب امن خود است، اطلاعات حساس (مثل شماره کارت یا جستجوهای خصوصی) را وارد می‌کند که همگی در دیتابیس تحت کنترل مهاجم ثبت می‌شوند."
      },
      {
        header: "چرا دفاع‌های قبلی شکست خوردند؟",
        text: "۱. هدر Referer: توسط فایروال‌ها و پروکسی‌ها (به دلیل حریم خصوصی) حذف می‌شد. ۲. توکن‌های اعتبارسنجی (Tokens): مدیریت دشواری داشتند، سربار پردازشی سرور را زیاد می‌کردند و در صفحات استاتیک یا کش‌شده (CDN) عملاً غیرقابل پیاده‌سازی بودند."
      }
    ]
  },
  [PresentationStep.PROPOSAL]: {
    title: "۲. راهکار پیشنهادی: هدر Origin",
    subtitle: "استانداردی نو برای تفکیک هویت از نیت",
    details: [
      {
        header: "مهندسی هدر Origin",
        text: "این هدر یک راهکار میانی بین 'فاش‌سازی کامل URL' (در Referer) و 'نبود هیچ اطلاعاتی' است. Origin فقط شامل (Protocol, Host, Port) است. این اطلاعات برای تصمیم‌گیری امنیتی سرور کافی است، بدون اینکه مسیر دقیق فعالیت کاربر در سایت قبلی را لو بدهد."
      },
      {
        header: "الگوریتم تصمیم‌گیری سرور",
        text: "سرور یک چک‌لیست سه مرحله‌ای را اجرا می‌کند: اول، اگر درخواست از متدهای Safe (مثل GET) است، اجازه بده. دوم، اگر متد حساس است (POST/PUT)، هدر Origin را با دامنه مجاز مقایسه کن. سوم، اگر هدر وجود نداشت (درخواست‌های غیروب)، از مکانیزم‌های سخت‌گیرانه‌تر استفاده کن."
      },
      {
        header: "کارایی و مقیاس‌پذیری",
        text: "این روش Stateless است؛ یعنی سرور نیاز به ذخیره هیچ توکنی در رم ندارد. سربار پردازشی آن عملاً صفر (0.02ms) است و برای سیستم‌های توزیع شده و میکروسرویس‌ها که در آن چندین سرور به درخواست‌ها پاسخ می‌دهند، ایده‌آل است."
      }
    ]
  },
  [PresentationStep.LIMITATIONS]: {
    title: "۴. نقد و بررسی محدودیت‌ها",
    subtitle: "مرزهای امنیتی که هنوز لرزان هستند",
    details: [
      {
        header: "حمله DNS Rebinding",
        text: "اگر مهاجم کنترل یک سرور DNS را داشته باشد، می‌تواند برای لحظه‌ای آی‌پی دامنه خود را به آی‌پی سرور هدف تغییر دهد. در این حالت، مرورگر تصور می‌کند هنوز در دامنه مهاجم است اما درخواست را به سرور هدف می‌فرستد و هدر Origin نیز با نام دامنه مهاجم ارسال می‌شود که می‌تواند سیستم‌های دفاعی ضعیف را فریب دهد."
      },
      {
        header: "پلاگین‌ها و مرورگرهای میراثی",
        text: "در زمان نگارش مقاله، پلاگین‌هایی مثل Adobe Flash یا Java Applets اجازه می‌دانند هدرهای سفارشی ساخته شود. اگرچه امروز این‌ها منسوخ شده‌اند، اما هنوز در اینترنت اشیاء (IoT) و مرورگرهای سفارشی قدیمی، امکان جعل یا حذف هدر Origin توسط بدافزارهای سطح سیستم وجود دارد."
      },
      {
        header: "سناریوی 'نبود هدر' (Empty Origin)",
        text: "برخی کاربران به دلیل استفاده از ابزارهای ضد-ردیابی (Anti-Tracking)، هدر Origin را هم حذف می‌کنند. این باعث ایجاد خطای False Positive می‌شود؛ یعنی سرور یک کاربر واقعی را به اشتباه به عنوان مهاجم شناسایی و مسدود می‌کند."
      }
    ]
  }
};

export const SIMULATION_DATA: SimulationStep[] = [
  {
    id: 1,
    phase: "فاز ۱: تزریق بدافزار (Delivery)",
    description: "مهاجم کدی را در یک صفحه بی‌خطر (مثلاً یک فروم یا بازی) قرار می‌دهد. این کد به محض لود شدن، یک فرم مخفی را آماده ارسال به بانک می‌کند.",
    hackerAction: "// Location: hacker-lab.net/exploit\nconst form = document.createElement('form');\nform.action = 'https://trust-bank.com/login';\nform.method = 'POST';\nform.innerHTML = '<input name=\"user\" value=\"hacker_account\">';\ndocument.body.appendChild(form);\nform.submit();",
    victimAction: "کاربر در حال مطالعه یک خبر جذاب در سایت مخرب است...",
    serverResponse: "Bank Server: Active (Waiting for requests)",
    flow: 'H2V',
    logs: [
      { id: '1', timestamp: '11:00:01', source: 'ATTACKER', message: 'Payload hosted at /win-prizes', type: 'info' },
      { id: '2', timestamp: '11:00:05', source: 'VICTIM', message: 'User entered the malicious zone', type: 'warning' }
    ]
  },
  {
    id: 2,
    phase: "فاز ۲: سوءاستفاده از کوکی (The Attack)",
    description: "مرورگر فریب می‌خورد! چون درخواست به سمت دامنه بانک است، مرورگر به طور خودکار کوکی‌های بانکی کاربر را برمی‌دارد و به درخواست مهاجم می‌چسباند.",
    hackerAction: "Executing silent POST request...",
    victimAction: "مرورگر در پس‌زمینه در حال ارسال اطلاعات احراز هویت است...",
    serverResponse: "POST /login - Incoming Request...",
    flow: 'V2S',
    requestHeaders: {
      "Host": "trust-bank.com",
      "Cookie": "session_id=victim_secret_hash_8829",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    logs: [
      { id: '3', timestamp: '11:00:06', source: 'VICTIM', message: 'Automatic POST with cookies sent to bank.com', type: 'critical' },
      { id: '4', timestamp: '11:00:06', source: 'SERVER', message: 'Validating incoming cookies...', type: 'info' }
    ]
  },
  {
    id: 3,
    phase: "فاز ۳: نفوذ موفق (No Defense)",
    description: "حمله موفقیت‌آمیز بود. سرور بانک چون هیچ منشئی را چک نمی‌کند، کاربر را وارد اکانت مهاجم می‌کند. از این پس فعالیت‌های کاربر در کنترل مهاجم است.",
    hackerAction: "BREACH SUCCESS: Victim is now trapped in my session.",
    victimAction: "نمایش پیام: 'خوش آمدید، hacker_account'",
    serverResponse: "HTTP/1.1 200 OK\nSet-Cookie: active_user=hacker",
    flow: 'S2V',
    logs: [
      { id: '5', timestamp: '11:00:07', source: 'SERVER', message: 'Login authorized for hacker_account', type: 'success' },
      { id: '6', timestamp: '11:00:08', source: 'ATTACKER', message: 'Monitoring victim data through linked account', type: 'critical' }
    ]
  },
  {
    id: 4,
    phase: "فاز ۴: مهار با هدر Origin (Defense)",
    description: "در اینجا سرور هدر Origin را چک می‌کند. مقدار آن 'hacker-lab.net' است که با دامنه بانک همخوانی ندارد. درخواست بلافاصله ریجکت می‌شود.",
    hackerAction: "ATTACK BLOCKED: Origin policy enforcement active.",
    victimAction: "نمایش خطای امنیتی: 403 Forbidden",
    serverResponse: "403 Forbidden - Untrusted Origin Source",
    flow: 'V2S',
    requestHeaders: {
      "Origin": "https://hacker-lab.net",
      "Host": "trust-bank.com",
      "X-Content-Type-Options": "nosniff"
    },
    logs: [
      { id: '7', timestamp: '11:15:00', source: 'SERVER', message: 'Security Check: Comparing Origin Header...', type: 'info' },
      { id: '8', timestamp: '11:15:01', source: 'SERVER', message: 'BLOCK: Origin mismatch detected!', type: 'error' },
      { id: '9', timestamp: '11:15:01', source: 'SERVER', message: 'CSRF Attack neutralized.', type: 'success' }
    ]
  }
];
