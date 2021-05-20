export interface IImageToText {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    mi?: string;
    patientNumber?: string;
    firstDose?: string;
    firstDoseDate?: Date;
    firstClinicName?: string;
    secondDose?: string;
    secondDoseDate?: Date;
    secondClinicName?: string;
    doseRecieved?: number;
    isVaXCompleted?: boolean;
    secondDoseEffectiveDate?: Date;
    firstDoseEffectiveDate?: Date;
    firstDoseExpireDate?: Date;
    secondDoseExpireDate?: Date;
}