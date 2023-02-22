// type Session = {
//   provider_token?: string | null;
//   access_token: string;
//   exppires_in?: number;
//   exppires_at?: number;
//   refresh_token?: string;
//   token_type: string;
//   user: User | null;
// };

type MetaData = {
  address: string;
  building: string;
  city: string;
  firstName: string;
  lastName: string;
  municipalities: string;
  postCode: string;
};

type Item = {
  category: string;
  content: string;
  description: string;
  flavor: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type PurchaseHistories = {
  id: number;
  userUid: string;
  itemId: string;
  flavor: string;
  countity: string;
};

type HistoryItem = {
  id: number;
  userUid: string;
  itemId: string;
  flavor: string;
  countity: string;
  itemImgUrl: string;
  itemName: string;
  itemPrice: string;
};

export type { MetaData, Item, PurchaseHistories, HistoryItem };
