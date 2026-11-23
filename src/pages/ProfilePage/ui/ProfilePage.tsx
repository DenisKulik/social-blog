import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider";
import {
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
} from "@/entities/Profile";
import { getUserAuthData } from "@/entities/User";
import { Loader } from "@/shared/ui";

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const profile = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);

  useEffect(() => {
    if (!authData) {
      return;
    }

    void dispatch(fetchProfileData());
  }, [authData, dispatch]);

  if (!authData) {
    return (
      <div>
        <h1>Profile Page</h1>
        <p>{t("Войдите в систему, чтобы просматривать профиль пользователя")}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {profile && (
        <div>
          <img
            src={profile.avatar}
            alt={`${profile.first} ${profile.lastname}`}
            width={120}
            height={120}
          />
          <p>
            {profile.first} {profile.lastname}
          </p>
          <p>
            {profile.city}, {profile.country}
          </p>
          <p>{profile.age}</p>
          <p>{profile.currency}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
