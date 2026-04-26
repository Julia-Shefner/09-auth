import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotesServer = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
