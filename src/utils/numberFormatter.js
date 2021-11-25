import { toast } from "react-toastify";

export const numberToVnd = (number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    number
  );

export const numberFormat = (number) =>
  new Intl.NumberFormat("vi-VN").format(number);

export const thoudsandFormater = (number) => `${numberFormat(number / 1000)}K`;

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, "");
  const match = cleaned.match(/^(84|0)?(\d{3})(\d{2})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+84 " : "";
    return ["(", intlCode, ") ", match[2], " ", match[3], " ", match[4]].join(
      ""
    );
  }
  return phoneNumberString;
};

export const isVietnamesePhoneNumber = (number) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const toShortString = (text) => {
  let txt = ''
  if (text.length > 40) {
    txt = text.substring(0, 40) + "...";
  }
  return txt;
};
export const toShortString1 = (text, num) => {
  let txt = ''
  if (text.length > num) {
    txt = text.substring(0, num) + "...";
  }
  return txt;
};

export const notificationToast = (text) =>
  toast.error(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
export const successNotificationToast = (text) =>
  toast.success(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
