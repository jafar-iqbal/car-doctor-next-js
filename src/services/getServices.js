export const getServicesFromDB = async () => {
    const res = await fetch("http://localhost:3000/services/api/get-all");
    if (!res.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await res.json();
    return data;
};
  
export const getServicesDetailsFromDB = async (id) => {
    const res = await fetch(`http://localhost:3000/services/api/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await res.json();
    return data;
  };