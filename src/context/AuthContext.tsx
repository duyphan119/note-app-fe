import { login } from "@/api/author.api";
import { Loading } from "@/components";
import { Author } from "@/types/author";
import { getAuth } from "firebase/auth";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<any>({});

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged(async (user: any) => {
      if (user) {
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        const { data } = await login({
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        });

        console.log(data);

        setUser(
          data && data.data && data.data.login ? data.data.login.author : null
        );
        setIsLoading(false);
        return;
      }
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsLoading(false);
      navigate("/login");
    });

    return () => {
      unsubscribed();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser, auth }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
