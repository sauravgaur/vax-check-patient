export const builtInButtons = {
    cancel: {
      classes: 'cancel-button',
      secondary: true,
      text: 'Exit',
      type: 'cancel'
    },
    next: {
      classes: 'next-button',
      text: 'Next',
      type: 'next'
    },
    back: {
      classes: 'back-button',
      secondary: true,
      text: 'Back',
      type: 'back'
    }
  };
  
  export const defaultStepOptions = {
    classes: 'shepherd-theme-arrows custom-default-class',
    scrollTo: true,
    cancelIcon: {
      enabled: true
    }
  };
  
  export const steps = [
    {
      attachTo: {
        element: '.first-element',
        on: 'right'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.next
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'intro',
      title: 'Welcome to traveler information form.',
      text: `
            In this section, traveler has to fill their personal details like name, address and contact details.
          `
    },
    {
      attachTo: {
        element: '.install-element',
        on: 'right'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
        builtInButtons.next
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'installation',
      title: 'Organization Information',
      text: 'In this section, traveler has to fill the details of the organization from where vaccination has been conducted.'
    },
    {
      attachTo: {
        element: '.usage-element',
        on: 'right'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'usage',
      title: 'Upload Vaccination card',
      text: 'In this section, traveler can either take a snapshot of the vaccination card or upload a document from the device.'
    }
  ];