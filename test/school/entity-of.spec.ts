import { SchoolPageEntity } from '../../src/school/domain/school-page.entity';

describe('Entity of Test in School Domain', () => {
  it('스쿨 페이지 엔티티는 of 메서드를 통해서 생성되어야된다.', () => {
    //given
    const schoolName = 'test';
    const location = 'Seoul';

    //when
    const schoolPageEntity = SchoolPageEntity.of({
      location,
      schoolName,
    });

    //then
    expect(schoolPageEntity.schoolPageToken).not.toBeUndefined();
    expect(schoolPageEntity.location).toEqual(location);
    expect(schoolPageEntity.schoolName).toEqual(schoolName);
  });
});
