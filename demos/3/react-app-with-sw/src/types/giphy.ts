import {
  SearchPromiseActionType,
  SearchParamsActionType,
  SearchActionType
} from "./search";

export interface GiphySearchParamsAction {
  type: SearchParamsActionType;
  payload: string | number;
}

export interface GiphySearchParams {
  searchQuery: string;
  limit: number;
  offset: number;
  rating: string;
  lang: string;
}

export interface GiphySearchAction {
  type: SearchActionType;
  payload: GiphySearchParams;
}

export interface GiphySearchPromiseAction {
  type: SearchPromiseActionType;
  payload: GiphySearchResult | null;
}

export interface GiphySearchResult {
  searchQuery: string;
  data: GIFObject[];
  pagination?: PaginationObject;
  meta?: MetaObject;
  isLoading: boolean;
  isFetchingMore: boolean;
  error: boolean;
}

export type GiphyActionDispatch<
  T = GiphySearchAction | GiphySearchPromiseAction | GiphySearchParamsAction
> = (action: T) => void;

export interface GIFObject {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  caption: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  import_datetime: string;
  trending_datetime: string;
  images: ImageObject;
  meta: MetaObject;
}

export interface ImageObject {
  fixed_height: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_height_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_small_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized_large: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  original: {
    url: string;
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  original_still: {
    url: string;
    width: string;
    height: string;
  };
}

export interface MetaObject {
  msg: string;
  status: number;
  response_id: string;
}

export interface PaginationObject {
  offset: number;
  total_count: number;
  count: number;
}

export interface UserObject {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  twitter: string;
}

export interface ChildPackObject {
  id: number;
  parent: number;
  type: "community" | "editorial";
  slug: string;
  display_name: string;
  short_display_name: string;
  description: string;
  banner_image: string;
  has_children: boolean;
  user: UserObject;
  featured_gif: GIFObject;
}

export interface StickerPackMetadataObject {
  id: number;
  display_name: string;
  slug: string;
  content_type: string;
  short_display_name: string;
  description: string;
  banner_image: string;
  has_children: boolean;
  user: UserObject;
  featured_gif: GIFObject;
  tags: { tag: string; rank: number }[];
  ancestors: {
    id: number;
    slug: string;
    display_name: string;
    short_display_name: string;
    featured_gif_id: string;
    parent: string;
    has_children: boolean;
    banner_image: string;
  }[];
}
