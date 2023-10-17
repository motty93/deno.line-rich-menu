import ky from 'https://cdn.skypack.dev/ky?dts';
import { config } from 'https://deno.land/x/dotenv/mod.ts'

const env = config({ safe: true });
const TOKEN = env.LINE_TOKEN;
const RICHMENU_ID = env.LINE_RICH_MENU_ID;

async function getRichmenuDetail(
  token: string,
  richmenuId: string,
): Promise<any> {
  const API_URL = `https://api.line.me/v2/bot/richmenu/${richmenuId}`;

  const response = await ky.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response) {
    return null;
  }

  const menuDetail = await response.json();
  return menuDetail;
}

getRichmenuDetail(TOKEN, RICHMENU_ID)
  .then((menuDetail) => console.log(menuDetail))
  .catch((error) => console.error(error));
