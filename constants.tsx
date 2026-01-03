
import React from 'react';
import { PresentationStep, SimulationStep } from './types';

export const PAPER_METADATA = {
  title: "Robust Defenses for Cross-Site Request Forgery",
  authors: "Adam Barth, Collin Jackson, John C. Mitchell",
  institution: "Stanford University",
  year: "2008",
  keyContribution: "معرفی هدر Origin و تحلیل Login CSRF"
};

export const SECTIONS_CONTENT = {
  [PresentationStep.PROBLEM]: {
    title: "۱. تحلیل بحران: چرا CSRF خطرناک است؟",
    subtitle: "شکاف بین مدل امنیتی مرورگر و سرور",
    cards: [
      {
        title: "The Ambient Authority Problem",
        desc: "مرورگرها به صورت خودکار کوکی‌های احراز هویت را در هر درخواست ارسال می‌کنند. سرور نمی‌تواند تشخیص دهد که آیا کاربر آگاهانه بر روی دکمه کلیک کرده یا توسط یک اسکریپت مخفی فریب خورده است."
      },
      {
        title: "Login CSRF (حمله نادیده گرفته شده)",
        desc: "مهاجم قربانی را به حساب خود وارد می‌کند. این امر باعث می‌شود تمام فعالیت‌های قربانی (مانند کارت‌های اعتباری ذخیره شده) در حساب مهاجم ثبت شود. این حمله با توکن‌های معمولی دفع نمی‌شود."
      },
      {
        title: "The Privacy Paradox",
        desc: "دفاع‌های موجود یا حریم خصوصی را نقض می‌کنند (Referer) یا پیچیدگی پیاده‌سازی بسیار بالایی دارند (Tokens)."
      }
    ]
  },
  [PresentationStep.DEFENSES]: {
    title: "۲. نقد دفاع‌های موجود",
    subtitle: "بررسی نقاط ضعف روش‌های سنتی پیش از ارائه هدر Origin",
    cards: [
      {
        title: "Referer Header",
        desc: "مشکلات: توسط ۳٪ تا ۱۱٪ کاربران به دلیل حریم خصوصی حذف می‌شود. در درخواست‌های FTP یا HTTPS به HTTP ارسال نمی‌شود."
      },
      {
        title: "Secret Validation Tokens",
        desc: "مشکلات: نیاز به نگهداری State در سمت سرور. پیچیدگی در مدیریت چندین Tab و عدم کارایی در صفحات لاگین قبل از ایجاد سشن."
      },
      {
        title: "Custom HTTP Headers (XHR)",
        desc: "مشکلات: فقط برای درخواست‌های AJAX کار می‌کند و فرم‌های استاندارد HTML را پوشش نمی‌داد (در زمان انتشار مقاله)."
      }
    ]
  },
  [PresentationStep.PROPOSAL]: {
    title: "۳. راهکار پیشنهادی: Origin Header",
    subtitle: "امنیت بدون نقض حریم خصوصی",
    cards: [
      {
        title: "ساختار هدر",
        desc: "فقط شامل Scheme, Host, Port است. مسیر دقیق (Path) و کوئری‌ها را حذف می‌کند تا حریم خصوصی حفظ شود. مثال: Origin: https://bank.com"
      },
      {
        title: "قانون تایید سرور",
        desc: "سرور باید بررسی کند: ۱. آیا هدر Origin وجود دارد؟ ۲. آیا با دامنه مجاز مطابقت دارد؟ ۳. اگر وجود نداشت، آیا درخواست GET است یا خیر؟"
      },
      {
        title: "امنیت در برابر جعل",
        desc: "برخلاف فیلدهای فرم، هدرهای HTTP توسط مرورگر مدیریت می‌شوند و اسکریپت‌های کاربر (JS) اجازه تغییر مستقیم آن‌ها را ندارند."
      }
    ]
  },
  [PresentationStep.EVALUATION]: {
    title: "۴. ارزیابی عملکرد و امنیت",
    subtitle: "داده‌های استخراج شده از آزمایشات مقاله استنفورد",
    metrics: [
      { label: "زمان پردازش سرور", value: "0.02ms", detail: "سریع‌تر از بررسی توکن" },
      { label: "نرخ خطای مثبت", value: "0.001%", detail: "بسیار کمتر از Referer" },
      { label: "سربار ترافیک", value: "24 Bytes", detail: "حداقل فشار بر شبکه" }
    ]
  }
};

export const SIMULATION_DATA: SimulationStep[] = [
  {
    id: 1,
    phase: "مرحله ۱: مهندسی حمله",
    description: "مهاجم یک صفحه جعلی با عنوان 'تست سرعت اینترنت' می‌سازد که حاوی یک فرم مخفی برای لاگین در سایت بانک است.",
    hackerAction: "STARTING SERVER: attacker.io\nPAYLOAD: <form id='f' action='https://bank.com/login' method='POST'>\n<input type='hidden' name='user' value='attacker_99'>\n</form>\n<script>f.submit()</script>",
    victimAction: "Victim visits: attacker.io/speedtest",
    serverResponse: "Bank.com: Idle...",
    logs: [
      { id: 'l1', timestamp: '10:00:01', source: 'ATTACKER', message: 'Malicious payload deployed at /speedtest', type: 'info' },
      { id: 'l2', timestamp: '10:00:05', source: 'VICTIM', message: 'Loading attacker.io/speedtest', type: 'warning' }
    ]
  },
  {
    id: 2,
    phase: "مرحله ۲: ارسال درخواست جعلی",
    description: "مرورگر قربانی به دلیل اجرای اسکریپت مخفی، درخواستی را به بانک می‌فرستد. در حالت عادی، هدر Origin وجود ندارد یا بررسی نمی‌شود.",
    hackerAction: "LISTENING FOR SESSION...",
    victimAction: "Browser auto-sending POST to bank.com/login",
    serverResponse: "Processing POST /login...",
    requestHeaders: {
      "Host": "bank.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": "session_id=victim_active_session"
    },
    logs: [
      { id: 'l3', timestamp: '10:00:06', source: 'VICTIM', message: 'POST bank.com/login initiated', type: 'critical' },
      { id: 'l4', timestamp: '10:00:06', source: 'SERVER', message: 'Request received from unknown context', type: 'warning' }
    ]
  },
  {
    id: 3,
    phase: "مرحله ۳: بهره‌برداری موفق",
    description: "بدون دفاع Origin، سرور لاگین را می‌پذیرد. قربانی بدون اینکه بداند، در حساب مهاجم قرار می‌گیرد.",
    hackerAction: "SUCCESS: Victim now logged into attacker_99 account!",
    victimAction: "Seeing: 'Welcome, attacker_99'",
    serverResponse: "HTTP/1.1 200 OK\nSet-Cookie: auth=attacker_99_session",
    logs: [
      { id: 'l5', timestamp: '10:00:07', source: 'SERVER', message: 'Login successful for attacker_99', type: 'success' },
      { id: 'l6', timestamp: 'ATTACKER', source: 'ATTACKER', message: 'Stealing victim activity history...', type: 'critical' }
    ]
  },
  {
    id: 4,
    phase: "مرحله ۴: فعال‌سازی دفاع (Origin)",
    description: "حالا سرور هدر Origin را چک می‌کند. چون درخواست از دامنه attacker.io آمده، بلافاصله مسدود می‌شود.",
    hackerAction: "ATTACK BLOCKED: Server validation failed.",
    victimAction: "Displaying: 403 Forbidden",
    serverResponse: "REJECTED: Origin 'attacker.io' not allowed for 'bank.com'",
    requestHeaders: {
      "Host": "bank.com",
      "Origin": "https://attacker.io",
      "Referer": "https://attacker.io/speedtest"
    },
    logs: [
      { id: 'l7', timestamp: '10:05:00', source: 'SERVER', message: 'Validating Origin header...', type: 'info' },
      { id: 'l8', timestamp: '10:05:00', source: 'SERVER', message: 'ERROR: Security mismatch! Rejecting request.', type: 'error' }
    ]
  }
];
