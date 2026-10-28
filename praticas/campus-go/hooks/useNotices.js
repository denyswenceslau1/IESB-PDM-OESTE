import { useCallback, useEffect, useState } from 'react';

import { fetchNotices } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNotices = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchNotices();
      setNotices(data || []);
    } catch (err) {
      setError(err.message || 'Erro ao carregar avisos.');
      setNotices([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  return {
    notices,
    isLoading,
    error,
    reload: loadNotices,
  };
}
