export interface CELEBRITIES {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

export interface CELEBRITYITEMS {
  celebrity: CELEBRITIES;
  onUpdate: (celebrity: CELEBRITIES) => void;
  onDelete: (celebrityId: number) => void;
}

export interface SEARCHBAR {
  onSearch: (term: string) => void;
}

export interface DIALOGMODEL {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
