const useFetch = (
  urlBase = "https://hw-18-751e8-default-rtdb.firebaseio.com/"
) => {
  const postHandler = (url, formData) => {
    return fetch(`${urlBase} ${url}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
  };
  const getHandler = async (url = "") => {
    const response = await fetch(`${urlBase} ${url}`);
	  return await response.json();
  };

  return {
    postHandler,
    getHandler,
  };
};

export default useFetch;
