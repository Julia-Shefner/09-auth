"use client";

import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfilePage = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const newUserName = (
      form.elements.namedItem("username") as HTMLInputElement
    ).value;
    const newEmail = user?.email as string;

    const updatedUser = await updateMe({
      username: newUserName,
      email: newEmail,
    });
    setUser(updatedUser);
    router.push("/profile");
  };

  const hanleCancel = () => {
    router.push("/profile");
  };

  return user ? (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          loading="eager"
          priority
        />
        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: </label>
            <input
              defaultValue={user.username}
              id="username"
              name="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={hanleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  ) : (
    <p>User not found</p>
  );
};

export default EditProfilePage;
