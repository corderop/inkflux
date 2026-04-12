export type FeedsResponse = Feed[];

export interface Feed {
  id: number;
  user_id: number;
  feed_url: string;
  site_url: string;
  title: string;
  checked_at: string;
  next_check_at: string;
  etag_header: string;
  last_modified_header: string;
  parsing_error_message: string;
  parsing_error_count: number;
  scraper_rules: string;
  rewrite_rules: string;
  crawler: boolean;
  blocklist_rules: string;
  keeplist_rules: string;
  user_agent: string;
  cookie: string;
  username: string;
  password: string;
  disabled: boolean;
  ignore_http_cache: boolean;
  fetch_via_proxy: boolean;
  category: Category;
}

export interface Category {
  id: number;
  title: string;
  user_id: number;
}

export interface Entry {
  id: number;
  user_id: number;
  feed_id: number;
  status: string;
  hash: string;
  title: string;
  url: string;
  comments_url: string;
  published_at: string;
  created_at: string;
  content: string;
  author: string;
  share_code: string;
  reading_time: number;
  starred: boolean;
  feed: Feed;
  tags: string[];
}

export interface EntriesResponse {
  total: number;
  entries: Entry[];
}

export interface User {
  id: number;
  username: string;
  is_admin: boolean;
  theme: string;
  language: string;
  timezone: string;
  entry_sorting_direction: string;
  stylesheet: string;
  google_id: string;
  openid_connect_id: string;
  entries_per_page: number;
  keyboard_shortcuts: boolean;
  show_reading_time: boolean;
  entry_swipe: boolean;
  last_login_at: string;
}

export type EntryStatus = "read" | "unread" | "removed";
type GetEntriesOrder =
  | "id"
  | "status"
  | "published_at"
  | "category_title"
  | "category_id";
type OrderDirection = "asc" | "desc";

export type GetEntriesFilters = {
  status?: EntryStatus;
  offset?: number;
  limit?: number;
  order?: GetEntriesOrder;
  direction?: OrderDirection;
};
