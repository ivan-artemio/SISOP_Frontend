export interface Dependencia {
    id: number;
    name: string;
    rfc: string;
    responsible: string;
    address: string;
    phone : string;
    acronym : string;
}

export interface Area {
    id: number;
    name: string;
    idOrganization: string;
    phone: string;
    responsible: string;
}

export interface Convenio {
    id: number;
    idOrganization: number;
    agreementDate: string;
    status: string;
    agreementNumber: string;
}

export interface ClaveValor {
    id: number;
    nombre: string;
}