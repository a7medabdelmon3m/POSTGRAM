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