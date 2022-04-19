export interface MakerResponse {
    _id: string;
    publisherName: string;
    publisherId: string;
    publisherSlug: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    heroImage: string;
    publisherLogo: string;
    links: Links;
    socialProfiles: SocialProfiles;
}

export interface Links {
    publisherWebsite: string;
    supportWebsite: string;
}

export interface SocialProfiles {
    discord: string;
    twitter: string;
    youtube: string;
    instagram: string;
    tiktok: string;
}