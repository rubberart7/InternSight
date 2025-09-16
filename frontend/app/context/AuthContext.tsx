"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
  fetchNewAccessToken: (forceRefresh?: boolean) => Promise<string | null>;
  accessTokenExpiration: number | null;
  userCollectionsVersion: number;
  incrementUserCollectionsVersion: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  loading: true,
  fetchNewAccessToken: async () => null,
  accessTokenExpiration: null,
  userCollectionsVersion: 0, 
  incrementUserCollectionsVersion: () => {}, 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessTokenExpiration, setAccessTokenExpiration] = useState<number | null>(null);
  const [userCollectionsVersion, setUserCollectionsVersion] = useState(0);

  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const incrementUserCollectionsVersion = () => {
    setUserCollectionsVersion(prev => prev + 1);
  };

  const decodeAndSetToken = useCallback((token: string | null) => {
    if (!token) {
      setAccessToken(null);
      setAccessTokenExpiration(null);
      return;
    }
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp) {
        setAccessTokenExpiration(decoded.exp);
      } else {
        setAccessTokenExpiration(null);
      }
      setAccessToken(token);
    } catch (err) {
      console.log("Error", err)
      setAccessToken(null);
      setAccessTokenExpiration(null);
    }
  }, []);

  const isAccessTokenExpired = useCallback((): boolean => {
    if (!accessToken || !accessTokenExpiration) {
      return true;
    }
    const currentTime = Date.now() / 1000;
    return accessTokenExpiration < currentTime + 30;
  }, [accessToken, accessTokenExpiration]);

  const fetchNewAccessToken = useCallback(async (forceRefresh: boolean = false): Promise<string | null> => {
    if (!forceRefresh && accessToken && !isAccessTokenExpired()) {
      return accessToken;
    }

    if (!serverUrl) {
      return null;
    }

    try {
      const res = await fetch(`${serverUrl}api/auth/refresh`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        decodeAndSetToken(null);
        return null;
      }

      const data = await res.json();

      if (data.accessToken) {
        decodeAndSetToken(data.accessToken);
        return data.accessToken;
      } else {
        decodeAndSetToken(null);
        return null;
      }
    } catch (err) {
      console.log("Error", err)
      decodeAndSetToken(null);
      return null;
    }
  }, [serverUrl, accessToken, isAccessTokenExpired, decodeAndSetToken]);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        
        await fetchNewAccessToken(true);
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error during auth initialization:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [fetchNewAccessToken]); 

  useEffect(() => {
    if (!accessToken || !accessTokenExpiration) return;

    const timeUntilExpiry = (accessTokenExpiration * 1000) - Date.now() - (5 * 60 * 1000);
    
    if (timeUntilExpiry <= 0) return;

    const timeoutId = setTimeout(() => {
      fetchNewAccessToken(true);
    }, timeUntilExpiry);

    return () => clearTimeout(timeoutId);
  }, [accessToken, accessTokenExpiration, fetchNewAccessToken]);

  const enhancedSetAccessToken = useCallback((token: string | null) => {
    decodeAndSetToken(token);
  }, [decodeAndSetToken]);

  const contextValue = {
    accessToken,
    setAccessToken: enhancedSetAccessToken,
    loading,
    fetchNewAccessToken,
    accessTokenExpiration,
    userCollectionsVersion,
    incrementUserCollectionsVersion,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);