export interface SimilarityRequest {
  candidates: User[];
  user: User;
}

export interface User {
  is_business_account: boolean;
  is_supervised_user: boolean;
  category_name: null | string;
  media_count: number;
  show_account_transparency_details: boolean;
  is_supervised_by_viewer: boolean;
  has_requested_viewer: boolean;
  hide_like_and_view_counts: boolean;
  category_enum: null | string;
  followed_by_viewer: boolean;
  external_url_linkshimmed: null | string;
  external_url: null | string;
  biography_with_entities: BiographyWithEntities;
  business_category_name: null | string;
  transparency_product: string;
  follows_viewer: boolean;
  is_professional_account: boolean;
  blocked_by_viewer: boolean;
  has_anonymous_profile_picture: boolean;
  has_blocked_viewer: boolean;
  is_embeds_disabled: boolean;
  country_block: boolean;
  is_joined_recently: boolean;
  full_name: string;
  followers: number;
  highlight_reel_count: number;
  following: number;
  pronouns: any[];
  is_private: boolean;
  has_ar_effects: boolean;
  edge_related_profiles?: EdgeRelatedProfiles;
  is_supervision_enabled: boolean;
  has_channel: boolean;
  eimu_id: string;
  is_guardian_of_viewer: boolean;
  is_verified_by_mv4b: boolean;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  bio_links: BioLink[];
  should_show_category: boolean;
  edge_saved_media: EdgeSavedMedia;
  biography: string;
  is_verified: boolean;
  has_clips: boolean;
  business_contact_method: string;
  fbid: string;
  should_show_public_contacts: boolean;
  pk: string;
  has_guides: boolean;
  username: string;
}

export interface BioLink {
  link_type: string;
  lynx_url: string;
  title: string;
  url: string;
}

export interface BiographyWithEntities {
  raw_text: string;
  entities: any[];
}

export interface EdgeRelatedProfiles {
  edges: any[];
}

export interface EdgeSavedMedia {
  page_info: PageInfo;
  count: number;
  edges: any[];
}

export interface PageInfo {
  has_next_page: boolean;
}
