import apiClient from "../client";
import {
  ConnectClientRequest,
  ConnectClientResponse,
  CreateNoteResponse,
  GetNotesRequest,
  GetNotesResponse,
  UpdateNoteRequest,
} from "./notes.dto";

// Client Connection APIs
export const connectClient = async (
  data: ConnectClientRequest
): Promise<ConnectClientResponse> => {
  const response = await apiClient.post("/connect/client", null, {
    params: { noteCodes: data.noteCodes },
  });
  return response.data;
};

export const getClientConnection = async (
  connectCode: string
): Promise<ConnectClientResponse> => {
  const response = await apiClient.get("/connect/client", {
    headers: { "Connect-Code": connectCode },
  });
  return response.data;
};

export const deleteNoteFromConnection = async (
  connectCode: string,
  noteCode: string
): Promise<ConnectClientResponse> => {
  const response = await apiClient.delete(
    `/connect/client/note/codes/${noteCode}`,
    {
      headers: { "Connect-Code": connectCode },
    }
  );
  return response.data;
};

// Note APIs
export const getNotes = async (
  params: GetNotesRequest
): Promise<GetNotesResponse> => {
  if (!params.codes || params.codes.length === 0) {
    return [];
  }
  const response = await apiClient.get<GetNotesResponse>("/note/list", {
    params,
  });
  return response.data;
};

export const createNote = async (
  connectCode?: string
): Promise<CreateNoteResponse> => {
  const response = await apiClient.post<CreateNoteResponse>(
    "/note",
    {},
    {
      headers: connectCode ? { "Connect-Code": connectCode } : {},
    }
  );
  return response.data;
};

export const updateNote = async (
  noteCode: string,
  data: UpdateNoteRequest,
  connectCode?: string
): Promise<void> => {
  const headers: Record<string, string> = {
    "Content-Type": "text/plain;charset=UTF-8",
  };
  if (connectCode) {
    headers["Connect-Code"] = connectCode;
  }

  if (data.title !== undefined) {
    await apiClient.put(`/note/${noteCode}/title`, data.title, {
      headers,
    });
  }

  if (data.content !== undefined) {
    await apiClient.put(`/note/${noteCode}/content`, data.content, {
      headers,
    });
  }
};

// Note: The API spec does not have a delete endpoint for a note itself,
// only for removing it from a connection.
// We might need to add a proper delete endpoint in the backend.
// For now, we can only implement the connection-based deletion.
