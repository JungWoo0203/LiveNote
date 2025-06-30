export interface ConnectClientRequest {
  noteCodes: string[];
}

export interface ConnectClientResponse {
  id: string;
  code: string;
  noteCodes: string[];
}

export interface GetNotesRequest {
  codes: string[];
}

export interface Note {
  code: string;
  title: string;
  content: string;
  createDate: string;
  updateDate: string;
}

export type GetNotesResponse = Note[];

export interface CreateNoteResponse extends Note {}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}

export interface UpdateNoteResponse extends Note {}
