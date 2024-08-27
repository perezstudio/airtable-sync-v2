interface Base {
  id: string;
  name: string;
  permissionLevel: 'create' | 'read' | 'update' | 'delete';
}

interface BasesListResponse {
  bases: Base[];
}

interface AITextField {
  type: 'aiText';
  options: {
	prompt?: (string | { field: { fieldId: string; referencedFieldIds?: string[] } })[];
  };
}

interface Attachment {
  id: string;
  type: string;
  filename: string;
  height?: number;
  size: number;
  url: string;
  width?: number;
  thumbnails?: {
	full?: { url: string; height: number; width: number };
	large?: { url: string; height: number; width: number };
	small?: { url: string; height: number; width: number };
  };
}

interface AttachmentField {
  type: 'multipleAttachments';
  options: {
	isReversed: boolean;
  };
}

interface AutoNumberField {
  type: 'autoNumber';
}

interface BarcodeField {
  type: 'barcode';
  options: {
	type?: string | null;
	text: string;
  };
}

interface ButtonField {
  type: 'button';
  options: {
	label: string;
	url: string | null;
  };
}

interface CheckboxField {
  type: 'checkbox';
  options: {
	color: 'greenBright' | 'tealBright' | 'cyanBright' | 'blueBright' | 'purpleBright' | 'pinkBright' | 'redBright' | 'orangeBright' | 'yellowBright' | 'grayBright';
	icon: 'check' | 'xCheckbox' | 'star' | 'heart' | 'thumbsUp' | 'flag' | 'dot';
  };
}

interface Collaborator {
  id: string;
  email?: string;
  name?: string;
  permissionLevel?: 'none' | 'read' | 'comment' | 'edit' | 'create';
  profilePicUrl?: string;
}

interface CollaboratorField {
  type: 'singleCollaborator' | 'multipleCollaborators';
  options?: object;
}

interface CountField {
  type: 'count';
  options: {
	isValid: boolean;
	recordLinkFieldId?: string | null;
  };
}

interface CreatedByField {
  type: 'createdBy';
}

interface CreatedTimeField {
  type: 'createdTime';
}

interface CurrencyField {
  type: 'currency';
  options: {
	precision: number;
	symbol: string;
  };
}

interface DateField {
  type: 'date';
  options: {
	dateFormat: {
	  format: 'l' | 'LL' | 'M/D/YYYY' | 'D/M/YYYY' | 'YYYY-MM-DD';
	  name: 'local' | 'friendly' | 'us' | 'european' | 'iso';
	};
  };
}

interface DateTimeField {
  type: 'dateTime';
  options: {
	timeZone: string;
	dateFormat: {
	  format: 'l' | 'LL' | 'M/D/YYYY' | 'D/M/YYYY' | 'YYYY-MM-DD';
	  name: 'local' | 'friendly' | 'us' | 'european' | 'iso';
	};
	timeFormat: {
	  format: 'h:mma' | 'HH:mm';
	  name: '12hour' | '24hour';
	};
  };
}

interface DurationField {
  type: 'duration';
  options: {
	durationFormat: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS';
  };
}

interface EmailField {
  type: 'email';
}

interface FormulaField {
  type: 'formula';
  options: {
	formula: string;
	isValid: boolean;
	referencedFieldIds: string[] | null;
	result: any | null;
  };
}

interface LastModifiedByField {
  type: 'lastModifiedBy';
}

interface LastModifiedTimeField {
  type: 'lastModifiedTime';
  options: {
	isValid: boolean;
	referencedFieldIds: string[] | null;
	result: any | null;
  };
}

interface LinkToAnotherRecordField {
  type: 'multipleRecordLinks';
  options: {
	isReversed: boolean;
	linkedTableId: string;
	prefersSingleRecordLink: boolean;
	inverseLinkFieldId?: string;
	viewIdForRecordSelection?: string;
  };
}

interface LongTextField {
  type: 'multilineText';
}

interface LookupField {
  type: 'multipleLookupValues';
  options: {
	fieldIdInLinkedTable: string | null;
	isValid: boolean;
	recordLinkFieldId: string | null;
	result: any | null;
  };
}

interface MultipleSelectField {
  type: 'multipleSelects';
  options: {
	choices: {
	  id: string;
	  color?: string;
	  name: string;
	}[];
  };
}

interface NumberField {
  type: 'number';
  options: {
	precision: number;
  };
}

interface PercentField {
  type: 'percent';
  options: {
	precision: number;
  };
}

interface PhoneField {
  type: 'phoneNumber';
}

interface RatingField {
  type: 'rating';
  options: {
	color: 'yellowBright' | 'orangeBright' | 'redBright' | 'pinkBright' | 'purpleBright' | 'blueBright' | 'cyanBright' | 'tealBright' | 'greenBright' | 'grayBright';
	icon: 'star' | 'heart' | 'thumbsUp' | 'flag' | 'dot';
	max: number;
  };
}

interface RichTextField {
  type: 'richText';
}

interface RollupField {
  type: 'rollup';
  options: {
	fieldIdInLinkedTable?: string;
	recordLinkFieldId?: string;
	result?: any | null;
	isValid?: boolean;
	referencedFieldIds?: string[];
  };
}

interface SingleLineTextField {
  type: 'singleLineText';
}

interface SingleSelectField {
  type: 'singleSelect';
  options: {
	choices: {
	  id?: string;
	  color?: string;
	  name: string;
	}[];
  };
}

interface SyncSourceField {
  type: 'externalSyncSource';
  options: {
	choices: {
	  id: string;
	  color?: string;
	  name: string;
	}[];
  };
}

interface URLField {
  type: 'url';
}

type Field =
  | AITextField
  | AttachmentField
  | AutoNumberField
  | BarcodeField
  | ButtonField
  | CheckboxField
  | CollaboratorField
  | CountField
  | CreatedByField
  | CreatedTimeField
  | CurrencyField
  | DateField
  | DateTimeField
  | DurationField
  | EmailField
  | FormulaField
  | LastModifiedByField
  | LastModifiedTimeField
  | LinkToAnotherRecordField
  | LongTextField
  | LookupField
  | MultipleSelectField
  | NumberField
  | PercentField
  | PhoneField
  | RatingField
  | RichTextField
  | RollupField
  | SingleLineTextField
  | SingleSelectField
  | SyncSourceField
  | URLField;