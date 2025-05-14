type Dropdown = {
    name: string;
    object: string[];
    render: string;
    return: string;
    choices: any[];
};

type TextInput = {
    return: string;
    placeholder: string;
};

type Input = {
    dropdown?: Dropdown;
    textInput?: TextInput;
};


type ObjectStructure = {
    description: string;
    func: string;
    id: string;
    name: string;
    serviceName: string;
    toSend: Input[];
};

type Service = {
    name: string;
    logo: string;
    color: string;
    description: string;
    items?: string[];
    oauth2url?: string;
};

export type { Dropdown, TextInput, Input, ObjectStructure, Service };
