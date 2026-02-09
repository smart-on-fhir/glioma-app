declare type Patient = {
    name: string;
    mrn: string;
    dob: string // YYYY-MM-DD format
    gender: string;
    description: string;
    
    treatmentClass: string[];

    characteristics: PatientCharacteristic[];
};

interface PatientCharacteristic {
    label: ReactNode;
    value: ReactNode;
    progressionEvidence: {
        radiographic: ReactNode;
        functional: ReactNode;
        suspected: ReactNode;
        none: ReactNode;
    }
}

