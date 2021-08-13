import axios from 'axios';
import { useState, useEffect } from 'react';

const TroupePage = () => {
  const [troupe, setTroupe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/troupe/1');
        setTroupe(response.data.data);
      } catch (e) {
        // console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>로딩중</h1>;
  }
  if (!troupe) {
    return null;
  }

  return (
    <>
      {troupe && <textarea rows={7} value={JSON.stringify(troupe, null, 2)} />}
    </>
  );
};

export default TroupePage;
