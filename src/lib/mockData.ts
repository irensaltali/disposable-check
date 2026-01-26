// Mock disposable email domains for frontend demo
export const DISPOSABLE_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'guerrillamail.com',
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'fakeinbox.com',
  'trashmail.com',
  'yopmail.com',
  'sharklasers.com',
  'getairmail.com',
  'guerrillamail.info',
  'spam4.me',
  'grr.la',
  'discard.email',
  'emailondeck.com',
  'tempail.com',
  'tempmailaddress.com',
  'burnermail.io',
  'maildrop.cc',
];

export const checkEmailDisposable = (email: string): { isDisposable: boolean; domain: string } => {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  const isDisposable = DISPOSABLE_DOMAINS.includes(domain);
  return { isDisposable, domain };
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Mock statistics
export const mockStats = {
  totalEmailsChecked: 1247893,
  totalDisposableDomains: 4521,
  recentContributions: 23,
};
