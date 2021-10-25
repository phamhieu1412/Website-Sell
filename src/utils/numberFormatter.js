export const numberToVnd = (number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

export const numberFormat = (number) => new Intl.NumberFormat('vi-VN').format(number);

export const thoudsandFormater = (number) => `${numberFormat(number / 1000)}K`;

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(84|0)?(\d{3})(\d{2})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+84 ' : '';
    return ['(', intlCode, ') ', match[2], ' ', match[3], ' ', match[4]].join('');
  }
  return phoneNumberString;
};
