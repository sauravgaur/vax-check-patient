import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    public API_URI = {
        PAYMENT_STATUS: '/batch/payment-status',
        SNAPSHOT_UPLOAD: '/media/snapshots',
        SUPPLIMENT_DOC_UPLOAD: '/media/supplement-doc',
        PATIENT_BY_ID: '/batch/patient-by-id',
        HUMAN_API: {
            CREATE_TOKEN: '/humanapi/create-token',
            CREATE_ACCESS_TOKEN: '/humanapi/create-access-token'
        },
        ORG_BY_STATE: '/json/orgList'
    };

    public PAYMENT_STATUS_API = '/batch/payment-status';

    public CONTACT_ITEM: SelectItem[] = [{ label: 'Yes', value: 'YES' },
    { label: 'No', value: 'NO' }];

    public GENDER_ITEM: SelectItem[] = [{ label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Non-Binary', value: 'OTHER' }];

    public STATES: SelectItem[] = [
        {
            label: 'Alabama',
            value: 'AL'
        },
        {
            label: 'Alaska',
            value: 'AL'
        },
        {
            label: 'American Samoa',
            value: 'AS'
        },
        {
            label: 'Arizona',
            value: 'AZ'
        },
        {
            label: 'Arkansas',
            value: 'AR'
        },
        {
            label: 'California',
            value: 'CA'
        },
        {
            label: 'Colorado',
            value: 'CO'
        },
        {
            label: 'Connecticut',
            value: 'CT'
        },
        {
            label: 'Delaware',
            value: 'DE'
        },
        {
            label: 'District Of Columbia',
            value: 'DC'
        },
        {
            label: 'Federated States Of Micronesia',
            value: 'FM'
        },
        {
            label: 'Florida',
            value: 'FL'
        },
        {
            label: 'Georgia',
            value: 'GA'
        },
        {
            label: 'Guam',
            value: 'GU'
        },
        {
            label: 'Hawaii',
            value: 'HI'
        },
        {
            label: 'Idaho',
            value: 'ID'
        },
        {
            label: 'Illinois',
            value: 'IL'
        },
        {
            label: 'Indiana',
            value: 'IN'
        },
        {
            label: 'Iowa',
            value: 'IA'
        },
        {
            label: 'Kansas',
            value: 'KS'
        },
        {
            label: 'Kentucky',
            value: 'KY'
        },
        {
            label: 'Louisiana',
            value: 'LA'
        },
        {
            label: 'Maine',
            value: 'ME'
        },
        {
            label: 'Marshall Islands',
            value: 'MH'
        },
        {
            label: 'Maryland',
            value: 'MD'
        },
        {
            label: 'Massachusetts',
            value: 'MA'
        },
        {
            label: 'Michigan',
            value: 'MI'
        },
        {
            label: 'Minnesota',
            value: 'MN'
        },
        {
            label: 'Mississippi',
            value: 'MS'
        },
        {
            label: 'Missouri',
            value: 'MO'
        },
        {
            label: 'Montana',
            value: 'MT'
        },
        {
            label: 'Nebraska',
            value: 'NE'
        },
        {
            label: 'Nevada',
            value: 'NV'
        },
        {
            label: 'New Hampshire',
            value: 'NH'
        },
        {
            label: 'New Jersey',
            value: 'NJ'
        },
        {
            label: 'New Mexico',
            value: 'NM'
        },
        {
            label: 'New York',
            value: 'NY'
        },
        {
            label: 'North Carolina',
            value: 'NC'
        },
        {
            label: 'North Dakota',
            value: 'ND'
        },
        {
            label: 'Northern Mariana Islands',
            value: 'MP'
        },
        {
            label: 'Ohio',
            value: 'OH'
        },
        {
            label: 'Oklahoma',
            value: 'OK'
        },
        {
            label: 'Oregon',
            value: 'OR'
        },
        {
            label: 'Palau',
            value: 'PW'
        },
        {
            label: 'Pennsylvania',
            value: 'PA'
        },
        {
            label: 'Puerto Rico',
            value: 'PR'
        },
        {
            label: 'Rhode Island',
            value: 'RI'
        },
        {
            label: 'South Carolina',
            value: 'SC'
        },
        {
            label: 'South Dakota',
            value: 'SD'
        },
        {
            label: 'Tennessee',
            value: 'TN'
        },
        {
            label: 'Texas',
            value: 'TX'
        },
        {
            label: 'Utah',
            value: 'UT'
        },
        {
            label: 'Vermont',
            value: 'VT'
        },
        {
            label: 'Virgin Islands',
            value: 'VI'
        },
        {
            label: 'Virginia',
            value: 'VA'
        },
        {
            label: 'Washington',
            value: 'WA'
        },
        {
            label: 'West Virginia',
            value: 'WV'
        },
        {
            label: 'Wisconsin',
            value: 'WI'
        },
        {
            label: 'Wyoming',
            value: 'WY'
        }
    ];

    public MANUFACTURER: SelectItem[] = [
        {
            label: 'Moderna',
            value: 'Moderna'
        },
        {
            label: 'Pfizer',
            value: 'Pfizer'
        },
        {
            label: 'Johnson \& Johnson',
            value: 'Johnson \& Johnson'
        }
    ];

    public YESNO: SelectItem[] = [{ label: 'Yes', value: 'YES' },
    { label: 'No', value: 'NO' }];

    public ISLANDS: SelectItem[] = [{ label: 'O\'ahu', value: 'O\'ahu' },
    { label: 'Maui', value: 'Maui' },
    { label: 'Hawai\'i Island', value: 'Hawai\'i Island' },
    { label: 'Kaua\'i', value: 'Kaua\'i' },
    { label: 'Moloka\'i', value: 'Moloka\'i' },
    { label: 'Lana\'i', value: 'Lana\'i' }];

    public STATE_ORG1 = {
        HI: [
        { name: 'Adventist Health Castle', value: 'Adventist Health Castle' },
        { name: 'Costco', value: 'Costco' },
        { name: 'CVS/Long Drugs', value: 'CVS/Long Drugs' },
        { name: 'Hamakua Kohala Health', value: 'Hamakua Kohala Health' },
        { name: 'Hana Health Clinic', value: 'Hana Health Clinic' },
        { name: 'Hawai\'i - Bay Clinic, Inc.', value: 'Hawai\'i - Bay Clinic, Inc.' },
        { name: 'Hawaii Pacific Health (HPH)', value: 'Hawaii Pacific Health (HPH)' },
        { name: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs ', value: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs' },
        { name: 'Hilo - Safeway', value: 'Hilo - Safeway' },
        { name: 'Hilo - Target - CVS/Longs Drugs', value: 'Hilo - Target - CVS/Longs Drugs' },
        { name: 'Hilo Kilauea Av- CVS/Longs Drugs', value: 'Hilo Kilauea Av- CVS/Longs Drugs' },
        { name: 'Hilo Medical Center', value: 'Hilo Medical Center' },
        { name: 'Hui No Ke Ola Pono - J. Walter Cameron Center', value: 'Hui No Ke Ola Pono - J. Walter Cameron Center' },
        { name: 'Kahului - CVS Pharmacy', value: 'Kahului - CVS Pharmacy' },
        { name: 'Kahului - Safeway Pharmacy ', value: 'Other' },
        { name: 'Kahului - Walmart Inc', value: 'Kahului - Walmart Inc' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping ', value: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Kuakini', value: 'Kailua-Kona  CVS/Long Drugs - Kuakini' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Target', value: 'Kailua-Kona  CVS/Long Drugs - Target' },
        { name: 'Kailua-Kona Safeway', value: 'Kailua-Kona Safeway' },
        { name: 'Kaiser Permanente', value: 'Kaiser Permanente' },
        { name: 'Kihei - Safeway Pharmacy ', value: 'Kihei - Safeway Pharmacy' },
        { name: 'Kona Community Hospital', value: 'Kona Community Hospital' },
        { name: 'KTA Super Stores', value: 'KTA Super Stores' },
        { name: 'Leeward Community College Clinic', value: 'Leeward Community College Clinic' },
        { name: 'Lahaina - CVS Pharmacy', value: 'Lahaina - CVS Pharmacy' },
        { name: 'Longs Drugs (CVS) - Kahului', value: 'Longs Drugs (CVS) - Kahului' },
        { name: 'Longs Drugs (CVS) - Kihei', value: 'Longs Drugs (CVS) - Kihei' },
        { name: 'Longs Drugs (CVS) - Lahaina', value: 'Longs Drugs (CVS) - Lahaina' },
        { name: 'Longs Drugs (CVS) - Pukalani', value: 'Longs Drugs (CVS) - Pukalani' },
        { name: 'Maderna Vaccine Clinics - UH Maui College', value: 'Maderna Vaccine Clinics - UH Maui College' },
        { name: 'Makawao Town Pharmacy', value: 'Makawao Town Pharmacy' },
        { name: 'Maui - Costco Wholesale', value: 'Maui - Costco Wholesale' },
        { name: 'Maui Clinic Pharmacy', value: 'Maui Clinic Pharmacy' },
        { name: 'Maui District Health Office', value: 'Maui District Health Office' },
        { name: 'Maui Health – Kaiser Permanente', value: 'Maui Health – Kaiser Permanente' },
        { name: 'Maui Health – Maui Memorial Medical Center', value: 'Maui Health – Maui Memorial Medical Center' },
        { name: 'Maui Lani Medical Office', value: 'Maui Lani Medical Office' },
        { name: 'Maui Medical Group', value: 'Maui Medical Group' },
        { name: 'Mauliola Pharmacy', value: 'Mauliola Pharmacy' },
        { name: 'Mililani Town Association', value: 'Mililani Town Association' },
        { name: 'Minit Medical', value: 'Minit Medical' },
        { name: 'Moloka‘i Community Health Center2', value: 'Moloka‘i Community Health Center2' },
        { name: 'Moloka‘i General Hospital', value: 'Moloka‘i General Hospital' },
        { name: 'On Lāna‘i - Lana‘i Community Health Center', value: 'On Lāna‘i - Lana‘i Community Health Center' },
        { name: 'On Lāna‘i - Lana‘i Community Hospital', value: 'On Lāna‘i - Lana‘i Community Hospital' },
        { name: 'Other', value: 'Other' },
        { name: 'Pahala  CVS/Long Drugs - Pikaka St', value: 'Pahala  CVS/Long Drugs - Pikaka St' },
        { name: 'Pahoa - CVS/Long Drugs', value: 'Pahoa - CVS/Long Drugs' },
        { name: 'Queen’s Health Systems', value: 'Queen’s Health Systems' },
        { name: 'Queen’s North Hawai‘i Community Hospital', value: 'Queen’s North Hawai‘i Community Hospital' },
        { name: 'Safeway (Albertsons)', value: 'Safeway (Albertsons)' },
        { name: 'Sam’s Club', value: 'Sam’s Club' },
        { name: 'Shiigi Drug', value: 'Shiigi Drug' },
        { name: 'Times Pharmacy', value: 'Times Pharmacy' },
        { name: 'University of Hawaii, Maui College', value: 'University of Hawaii, Maui College' },
        { name: 'Veterans Affairs', value: 'Veterans Affairs' },
        { name: 'Wailuku - Malama I Ke Ola Health Center', value: 'Wailuku - Malama I Ke Ola Health Center' },
        { name: 'Wailuku - Safeway Pharmacy ', value: 'Wailuku - Safeway Pharmacy ' },
        { name: 'Walgreens', value: 'Walgreens' },
        { name: 'Walmart', value: 'Walmart' },
        { name: 'Windward POD at Windward Community College', value: 'Windward POD at Windward Community College' },
        ],
        CA: [
            { name: 'SAMS PHARMACY', type: 'External' },
            { name: 'Save Mart Supermarkets', type: 'External' },
            { name: 'Lucky Pharmacy', type: 'External' },
            { name: 'WalMart Pharmacy', type: 'External' },
            { name: 'Walgreens', type: 'External' },
            { name: 'SAFEWAY PHARMACY', type: 'External' },
            { name: 'Diablo Pharmacy', type: 'External' },
            { name: 'COSTCO PHARMACY', type: 'External' },
            { name: 'RITE AID PHARMACY', type: 'External' },
            { name: 'Dougherty Valley HIgh School', type: 'External' },
            { name: 'San Ramon Regional Medical Center – San Ramon', type: 'External' },
            { name: 'Diablo Valley College in San Ramon - Contra Costa Health Services', type: 'External' },
            { name: 'Arthritis and Rheumatology Center - San Ramon', type: 'External' },
            { name: 'Tri-Valley Medical Center Inc', type: 'External' },
            { name: 'San Ramon Valley Fire', type: 'External' },
            { name: 'SF Market', type: 'External' },
            { name: 'OneMedical - Mission Bay', type: 'External' },
            { name: 'California High School', type: 'External' },
            { name: 'Moscone Center - San Francisco City Vaccination Site', type: 'External' },
            { name: 'San Ramon Valley High School', type: 'External' },
            { name: 'OneMedical', type: 'External' },
            { name: 'San Francisco Wholesale Produce Market', type: 'External' },
            { name: 'Bayview Child Health Center', type: 'External' },
            { name: 'NOWRX SPECIALTY', type: 'External' },
            { name: 'Axis Community Health', type: 'External' },
            { name: 'Hayward Adult School Gym', type: 'External' },
            { name: 'United in Health', type: 'External' },
            { name: 'Clayworth Healthcare Pharmacy', type: 'External' },
            { name: 'Tiburcio Vasquez Health Center Inc', type: 'External' },
            { name: 'NOWRX HAYWARD', type: 'External' },
            { name: 'Fairmont Hospital – San Leandro (Alameda Health System', type: 'External' },
            { name: 'California High School', type: 'External' },
            { name: 'ValleyCare Medical Center – Pleasanton (Stanford Health Care', type: 'HAPI' },
            { name: 'UCLA Health', type: 'HAPI' },
            { name: 'UC San Francisco Medical Center', type: 'HAPI' },
            { name: 'Santa Clara Valley Health & Hospital System', type: 'HAPI' },
            { name: 'Riverside Medical Clinic', type: 'HAPI' },
            { name: 'UC Davis', type: 'HAPI' },
            { name: 'Providence Health (West Coast & SW Washingon', type: 'HAPI' },
            { name: 'Washington Hospital Health System', type: 'HAPI' },
            { name: 'Sisters of Charity of Leavenworth Health System', type: 'HAPI' },
            { name: 'Renown Health', type: 'HAPI' },
            { name: 'Fort Bragg Rural Health Center', type: 'HAPI' },
            { name: 'UC Irvine Health', type: 'HAPI' },
            { name: 'Prime Healthcare', type: 'HAPI' },
            { name: 'Molina', type: 'HAPI' },
            { name: 'Doctors Hospital Of Manteca', type: 'HAPI' },
            { name: 'Placentia Linda Hospital', type: 'HAPI' },
            { name: 'Corona Regional Medical Center', type: 'HAPI' },
            { name: 'Carson Valley Medical Center', type: 'HAPI' },
            { name: 'John F. Kennedy Memorial Hospital', type: 'HAPI' },
            { name: 'Huntington Memorial Hospital', type: 'HAPI' },
            { name: 'Saint Francis Memorial Hospital', type: 'HAPI' },
            { name: 'Delano Regional Medical Center', type: 'HAPI' },
            { name: 'Loma Linda University Medical Center-murrieta', type: 'HAPI' },
            { name: 'Temecula Valley Hospital', type: 'HAPI' },
            { name: 'Twin Cities Community Hospital', type: 'HAPI' },
            { name: 'Southwest Healthcare System Rancho Springs Campus', type: 'HAPI' },
            { name: 'UC San Diego Health System', type: 'HAPI' },
            { name: 'Cedars-Sinai', type: 'HAPI' },
            {
                name: 'Rady Children\'s Hospital', type: 'HAPI'
            },
            { name: 'Stanford Hospital and Clinics', type: 'HAPI' },
            { name: 'MemorialCare', type: 'HAPI' },
            { name: 'OCHIN', type: 'HAPI' },
            { name: 'Loma Linda Health System', type: 'HAPI' },
            { name: 'Sansum Clinic', type: 'HAPI' },
            { name: 'Sutter Health', type: 'HAPI' },
            { name: 'Doctors Medical Center Of Modesto', type: 'HAPI' },
            { name: 'Desert Regional Medical Center', type: 'HAPI' },
            { name: 'Tri-City Medical Center', type: 'HAPI' },
            { name: 'Adventist Health', type: 'HAPI' },
            { name: 'Pomerado Hospital', type: 'HAPI' },
            { name: 'Palomar Medical Center', type: 'HAPI' },
            { name: 'Sierra Vista Regional Medical Center', type: 'HAPI' },
            { name: 'Hanford Community Medical Center', type: 'HAPI' },
            { name: 'DBA Northbay Medical Center', type: 'HAPI' },
            { name: 'Contra Costa Health Services', type: 'HAPI' },
            { name: 'San Antonio Regional Hospital', type: 'HAPI' },
            { name: 'Lakewood Regional Medical Center', type: 'HAPI' },
            { name: 'Los Alamitos Medical Center', type: 'HAPI' },
            { name: 'Palmdale Regional Medical Center', type: 'HAPI' },
            { name: 'San Ramon Regional Medical Center', type: 'HAPI' },
            { name: 'Torrance Memorial Medical Center', type: 'HAPI' },
            { name: 'Fountain Valley Regional Hospital', type: 'HAPI' },
            { name: 'Community Medical Centers Healthcare Network', type: 'HAPI' },
            { name: 'The Neurology Center', type: 'HAPI' },
            { name: 'San Diego Sports Medicine', type: 'HAPI' },
            { name: 'UCSF Benioff Children\'s Hospital Oakland', type: 'HAPI' },
            { name: 'El Camino Hospital', type: 'HAPI' },
            { name: 'Riverside University Health System', type: 'HAPI' },
            { name: 'Stanford Children\'s Health', type: 'HAPI' },
            { name: 'SAC Health System', type: 'HAPI' },
            { name: 'Cottage Health System', type: 'HAPI' }
        ]
    };
    public ORGS = [{ name: 'Adventist Health Castle', value: 'Adventist Health Castle' },
    { name: 'Costco', value: 'Costco ' },
    { name: 'CVS/Long Drugs', value: 'CVS/Long Drugs' },
    { name: 'Hamakua Kohala Health', value: 'Hamakua Kohala Health' },
    { name: 'Hana Health Clinic', value: 'Hana Health Clinic' },
    { name: 'Hawai\'i - Bay Clinic, Inc.', value: 'Hawai\'i - Bay Clinic, Inc.' },
    { name: 'Hawaii Pacific Health (HPH)', value: 'Hawaii Pacific Health (HPH)' },
    { name: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs ', value: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs ' },
    { name: 'Hilo - Safeway', value: 'Hilo - Safeway' },
    { name: 'Hilo - Target - CVS/Longs Drugs', value: 'Hilo - Target - CVS/Longs Drugs' },
    { name: 'Hilo Kilauea Av- CVS/Longs Drugs', value: 'Hilo Kilauea Av- CVS/Longs Drugs' },
    { name: 'Hilo Medical Center', value: 'Hilo Medical Center' },
    { name: 'Hui No Ke Ola Pono - J. Walter Cameron Center', value: 'Hui No Ke Ola Pono - J. Walter Cameron Center' },
    { name: 'Kahului - CVS Pharmacy', value: 'Kahului - CVS Pharmacy' },
    { name: 'Kahului - Safeway Pharmacy ', value: 'Other' },
    { name: 'Kahului - Walmart Inc', value: 'Kahului - Walmart Inc' },
    { name: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping ', value: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping ' },
    { name: 'Kailua-Kona  CVS/Long Drugs - Kuakini', value: 'Kailua-Kona  CVS/Long Drugs - Kuakini' },
    { name: 'Kailua-Kona  CVS/Long Drugs - Target', value: 'Kailua-Kona  CVS/Long Drugs - Target' },
    { name: 'Kailua-Kona Safeway', value: 'Kailua-Kona Safeway' },
    { name: 'Kaiser Permanente', value: 'Kaiser Permanente' },
    { name: 'Kihei - Safeway Pharmacy ', value: 'Kihei - Safeway Pharmacy ' },
    { name: 'Kona Community Hospital', value: 'Kona Community Hospital' },
    { name: 'KTA Super Stores', value: 'KTA Super Stores' },
    { name: 'Leeward Community College Clinic', value: 'Leeward Community College Clinic' },
    { name: 'Lahaina - CVS Pharmacy', value: 'Lahaina - CVS Pharmacy' },
    { name: 'Longs Drugs (CVS) - Kahului', value: 'Longs Drugs (CVS) - Kahului' },
    { name: 'Longs Drugs (CVS) - Kihei', value: 'Longs Drugs (CVS) - Kihei' },
    { name: 'Longs Drugs (CVS) - Lahaina', value: 'Longs Drugs (CVS) - Lahaina' },
    { name: 'Longs Drugs (CVS) - Pukalani', value: 'Longs Drugs (CVS) - Pukalani' },
    { name: 'Maderna Vaccine Clinics - UH Maui College', value: 'Maderna Vaccine Clinics - UH Maui College' },
    { name: 'Makawao Town Pharmacy', value: 'Makawao Town Pharmacy' },
    { name: 'Maui - Costco Wholesale', value: 'Maui - Costco Wholesale' },
    { name: 'Maui Clinic Pharmacy', value: 'Maui Clinic Pharmacy' },
    { name: 'Maui District Health Office', value: 'Maui District Health Office' },
    { name: 'Maui Health – Kaiser Permanente', value: 'Maui Health – Kaiser Permanente' },
    { name: 'Maui Health – Maui Memorial Medical Center', value: 'Maui Health – Maui Memorial Medical Center' },
    { name: 'Maui Lani Medical Office', value: 'Maui Lani Medical Office' },
    { name: 'Maui Medical Group', value: 'Maui Medical Group' },
    { name: 'Mauliola Pharmacy', value: 'Mauliola Pharmacy' },
    { name: 'Mililani Town Association', value: 'Mililani Town Association' },
    { name: 'Minit Medical', value: 'Minit Medical' },
    { name: 'Moloka‘i Community Health Center2', value: 'Moloka‘i Community Health Center2' },
    { name: 'Moloka‘i General Hospital', value: 'Moloka‘i General Hospital' },
    { name: 'On Lāna‘i - Lana‘i Community Health Center', value: 'On Lāna‘i - Lana‘i Community Health Center' },
    { name: 'On Lāna‘i - Lana‘i Community Hospital', value: 'On Lāna‘i - Lana‘i Community Hospital' },
    { name: 'Other', value: 'Other' },
    { name: 'Pahala  CVS/Long Drugs - Pikaka St', value: 'Pahala  CVS/Long Drugs - Pikaka St' },
    { name: 'Pahoa - CVS/Long Drugs', value: 'Pahoa - CVS/Long Drugs' },
    { name: 'Queen’s Health Systems', value: 'Queen’s Health Systems' },
    { name: 'Queen’s North Hawai‘i Community Hospital', value: 'Queen’s North Hawai‘i Community Hospital' },
    { name: 'Safeway (Albertsons)', value: 'Safeway (Albertsons)' },
    { name: 'Sam’s Club', value: 'Sam’s Club' },
    { name: 'Shiigi Drug', value: 'Shiigi Drug' },
    { name: 'Times Pharmacy', value: 'Times Pharmacy' },
    { name: 'University of Hawaii, Maui College', value: 'University of Hawaii, Maui College' },
    { name: 'Veterans Affairs', value: 'Veterans Affairs' },
    { name: 'Wailuku - Malama I Ke Ola Health Center', value: 'Wailuku - Malama I Ke Ola Health Center' },
    { name: 'Wailuku - Safeway Pharmacy ', value: 'Wailuku - Safeway Pharmacy ' },
    { name: 'Walgreens', value: 'Walgreens' },
    { name: 'Walmart', value: 'Walmart' },
    { name: 'Windward POD at Windward Community College', value: 'Windward POD at Windward Community College' },
    ];
}
