import { Prop, Schema } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalaray: number;

  @Prop()
  middleSalaray: number;

  @Prop()
  seniorSalaray: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ _id: true })
export class TopPageModel {
  @Prop({ enum: TopLevelCategory })
  firstLevel: TopLevelCategory;

  @Prop()
  secondLevel: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop([HhData])
  hh?: HhData;

  @Prop([TopPageAdvantage])
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];
}
