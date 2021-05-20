import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
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
            value: 'AK'
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
