import { Links, MakerResponse, SocialProfiles } from './MakerResponse';

export class Maker {
    id: string;
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

    constructor(maker: MakerResponse) {
        this.id = maker._id;
        this.publisherName = maker.publisherName;
        this.publisherId = maker.publisherId;
        this.publisherSlug = maker.publisherSlug;
        this.createdAt = new Date(maker.createdAt);
        this.updatedAt = new Date(maker.updatedAt);
        this.description = maker.description;
        this.heroImage = maker.heroImage;
        this.publisherLogo = maker.publisherLogo;
        this.links = maker.links;
        this.socialProfiles = maker.socialProfiles;
    }
}