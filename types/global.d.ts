declare type Patient = {
    name: string;
    mrn: string;
    dob: string // YYYY-MM-DD format
    gender: string;
    description: string;
    firstName: string;
    
    treatmentClass: string[];

    characteristics: PatientCharacteristic[];
};

interface PatientCharacteristic {
    label: ReactNode;
    value: ReactNode;
    link?: string;
    progressionEvidence: {
        // radiographic: ReactNode;
        // functional: ReactNode;
        // suspected: ReactNode;
        // none: ReactNode;

        progression    : { value: ReactNode; link?: string };
        symptomsPresent: { value: ReactNode; link?: string };
        visionDecline  : { value: ReactNode; link?: string };
    }
}

