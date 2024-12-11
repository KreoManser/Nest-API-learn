export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class TopPageModel {
  _id: string;
  firstLevel: TopLevelCategory;
  secondLevel: string;
  title: string;
  category: string;
  hh?: {
    count: number;
    juniorSalaray: number;
    middleSalaray: number;
    seniorSalaray: number;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
