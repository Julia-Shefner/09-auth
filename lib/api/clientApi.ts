import type { Note, CreateNote } from "@/types/note";
import { nextServer } from "@/lib/api/api";
import { User } from "@/types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface CheckSessionRequest {
  success: boolean;
}

export interface EditRequest {
  email?: string;
  username?: string;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<NotesHttpResponse> => {
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (values: CreateNote): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", values);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (newUser: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", newUser);
  return response.data;
};

export const login = async (loginData: LoginRequest) => {
  const response = await nextServer.post<User>("auth/login", loginData);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (userData: EditRequest) => {
  const { data } = await nextServer.patch<User>("/users/me", userData);
  return data;
};
