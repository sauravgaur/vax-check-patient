export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: 'Dashboard',
        desc: 'Latest updates and statistic charts'
      },
    },
     
   
    'user-management': {
      courses: {
        page: {title: 'Courses', desc: ''}
      },
      entities: {
        page: {title: 'Entities', desc: ''}
      }
    },
    header: {
      actions: {
        page: {title: 'Actions', desc: 'Actions example page'}
      }
    },
    profile: {
      page: {title: 'User Profile', desc: ''}
    },
    wizard: {
      'wizard-2': {page: {title: 'Patient Detail', desc: ''}},
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
