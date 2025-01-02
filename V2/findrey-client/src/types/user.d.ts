export interface Image {
  data: Uint8Array;
  contentType: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  image: Image;
}
