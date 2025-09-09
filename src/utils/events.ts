import { LS, LSKeys } from '../ls';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  bot: string;
  sum: string;
  avto: 'off' | string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbz4Gto98kh-p6DYEJkJdyyjkwlo674JPQ6mvXqwjZJ5bLX0AMwmQpCt5-qHVI86nl7zpA/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, vari: 'var6', id: LS.getItem(LSKeys.UserId, 0) }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
