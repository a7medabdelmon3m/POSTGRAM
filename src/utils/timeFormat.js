export function timeAgo(dateString) {
  if (!dateString) return "";

  const pastDate = new Date(dateString);
  const currentDate = new Date();
  
  // بنحسب الفرق بالثواني ونستخدم Math.floor عشان نضمن إنه رقم صحيح
  const diffInSeconds = Math.floor((currentDate - pastDate) / 1000);

  // لو التاريخ مش صحيح (Invalid Date)
  if (isNaN(diffInSeconds)) return "";

  // لو الوقت لسه حصل حالا (أقل من 5 ثواني)
  if (diffInSeconds < 5) return "just now";

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // الوحدات الزمنية بالثواني
  const units = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  // بنلف على الوحدات عشان نلاقي أنسب وحدة نعرضها
  for (const unit in units) {
    if (diffInSeconds >= units[unit] || unit === 'second') {
      const value = Math.floor(diffInSeconds / units[unit]);
      // هنا بنبعت القيمة سالبة لـ format لأننا بنرجع لورا (ago)
      // وبنستخدم Math.trunc للتأكيد إن الرقم Finite
      return rtf.format(-Math.trunc(value), unit);
    }
  }

  return "just now";
}


export function formatPostTimeAgo(dateString) {
  if (!dateString) return "";

  const pastDate = new Date(dateString);
  const currentDate = new Date();
  
  // حساب الفرق بالثواني
  const diffInSeconds = Math.floor((currentDate - pastDate) / 1000);

  // حماية لو التاريخ مش صحيح (Invalid Date)
  if (isNaN(diffInSeconds)) return "";
  
  // لو البوست لسه نازل حالا (أقل من 5 ثواني)
  if (diffInSeconds < 5) return "just now";

  // ⏱️ سقف البوستات: 7 أيام (7 أيام * 24 ساعة * 60 دقيقة * 60 ثانية = 604800 ثانية)
  const maxSeconds = 7 * 86400;

  // الشرط السحري: لو البوست عدى عليه أكتر من 7 أيام، اظهر التاريخ العادي وماتدخلش في الحسابات
  if (diffInSeconds > maxSeconds) {
    return pastDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // لو البوست بقاله أقل من 7 أيام، بنشغل الـ RelativeTimeFormat العادي
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // الوحدات المتاحة للبوستات (من ثانية لحد يوم)
  const units = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const unit in units) {
    if (diffInSeconds >= units[unit] || unit === 'second') {
      const value = Math.floor(diffInSeconds / units[unit]);
      return rtf.format(-Math.trunc(value), unit);
    }
  }

  return "just now";
}