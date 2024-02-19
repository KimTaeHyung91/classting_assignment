import { Expose } from 'class-transformer';
import { SchoolPageEntity } from './school-page.entity';
import { SchoolNewsEntity } from './news/school-news.entity';

export namespace SchoolCommand {
  export class CreateSchoolPage {
    @Expose()
    readonly schoolName: string;

    @Expose()
    readonly location: string;

    toEntity() {
      return SchoolPageEntity.of({
        schoolName: this.schoolName,
        location: this.location,
      });
    }
  }

  export class CreateSchoolNews {
    @Expose()
    readonly schoolPageToken: string;

    @Expose()
    readonly title: string;

    @Expose()
    readonly content: string;

    toEntity(schoolPage: SchoolPageEntity) {
      const schoolNews = SchoolNewsEntity.of({
        title: this.title,
        content: this.content,
      });

      schoolNews.setSchoolPage(schoolPage);

      return schoolNews;
    }
  }

  export class ModifySchoolNews {
    @Expose()
    readonly schoolNewsToken: string;

    @Expose()
    readonly title: string;

    @Expose()
    readonly content: string;
  }
}
