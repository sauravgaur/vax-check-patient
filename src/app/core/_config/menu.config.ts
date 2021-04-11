export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Applications',
          root: true,
          alignment: 'left',
          toggle: 'click',
          submenu: [
            {
              title: 'Batch Management',
              bullet: 'dot',
              icon: 'flaticon-user',
              submenu: [
                {
                  title: 'Courses',
                  page: '/user-management/courses'
                },
                {
                  title: 'Entities',
                  page: '/user-management/entities'
                }
              ]
            },
          ]
        },
        {
          title: 'Data Entry',
          root: true,
          alignment: 'left',
          toggle: 'click',
          submenu: [
            {
              title: 'Covid Form',
              bullet: 'dot',
              icon: 'flaticon2-mail-1',
              submenu: [
                {
                  title: 'Patient Detail',
                  page: '/wizard/wizard-2'
                }
              ]
            },
          ]
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {section: 'Applications'},
        {
          title: 'Course Management',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              title: 'Courses',
              page: '/user-management/courses'
            },
            {
              title: 'Entities',
              page: '/user-management/entities'
            }
          ]
        },
        {section: 'Data Entry'},
        {
          title: 'Covid Form',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-mail-1',
          submenu: [
            {
              title: 'Patient Detail',
              page: '/wizard/wizard-2'
            }
          ]
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
