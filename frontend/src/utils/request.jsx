  const AsyncRequest = async (url, method, accessToken, body = null, options = {}) => {
    try {
        const defaultOptions = {
          method: method,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          ...options
          },
        };
        
        if (body) {
          defaultOptions.body = body;
        }
        
        const response = await fetch(url, defaultOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}: ${data.message || 'Unknown error'}`);
        }

        return data;
    }
    catch (error) {
      console.error("Request failed:", error.message);
      throw error;
    }
  };

export default AsyncRequest;