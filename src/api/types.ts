export interface Group {
  id: string;
  name: string;
  location: string;
  date: string;
  min_age: number;
  max_age: number;
  styles: string[];
  spots_free: number;
  whatsapp_link: string;
  image?: string;
}

export interface UpcomingGroup {
  id: string;
  name: string;
  location: string;
  date: string;
  minAge: number;
  maxAge: number;
  styles: string[];
  spotsFree: number;
}

export interface SearchRequest {
  age: number;
  date?: string;
  styles: string[];
  has_van: boolean;
}

export interface JoinRequest {
  name: string;
  age: number;
}

export interface JoinResponse {
  success: boolean;
  whatsappLink: string;
}
