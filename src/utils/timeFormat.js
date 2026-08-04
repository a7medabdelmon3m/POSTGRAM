export function timeAgo(dateString) {
  if (!dateString) return "";

  const pastDate = new Date(dateString);
  const currentDate = new Date();
  
  const diffInSeconds = Math.floor((currentDate - pastDate) / 1000);

  if (isNaN(diffInSeconds)) return "";

  if (diffInSeconds < 5) return "just now";

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units = {
    year: 31536000,
    month: 2592000,
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


export function formatPostTimeAgo(dateString) {
  if (!dateString) return "";

  const pastDate = new Date(dateString);
  const currentDate = new Date();
  
  const diffInSeconds = Math.floor((currentDate - pastDate) / 1000);

  if (isNaN(diffInSeconds)) return "";
  
  if (diffInSeconds < 5) return "just now";

  const maxSeconds = 7 * 86400;

  if (diffInSeconds > maxSeconds) {
    return pastDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

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