export class CoursesTable {
  public static courses: any = [
    {
      coursesCode: 'HealthCert-PCR',
      coursesName: 'SWAB Test result',
      pendingActions: 0, // Administrator
      totalIssued: 0,
      lastUpdated: '1w ago',
    }
  ];

  public static tokens: any = [
    {
      id: 1,
      accessToken: 'access-token-' + Math.random(),
      refreshToken: 'access-token-' + Math.random()
    }
  ];
}
