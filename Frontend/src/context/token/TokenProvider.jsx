import PropTypes from 'prop-types'
import TokenContext from './TokenContact';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { refreshToken } from '../../services/RecipeApi';
import { jwtDecode } from 'jwt-decode';

export default function TokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAccessToken = async () => {
      try {
        const token = await refreshToken();
        setAccessToken(token);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    initializeAccessToken();
  }, [])

  const handleSetToken = useCallback((newToken) => {
    setAccessToken(newToken)
  }, [])

  const token = useMemo(() => accessToken, [accessToken]);
  const user = useMemo(() => {
    return accessToken ? jwtDecode(accessToken) : "";
  }, [accessToken]);

  return (
    <TokenContext.Provider value={{ token, user, handleSetToken, loading }}>
      {children}
    </TokenContext.Provider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired
}