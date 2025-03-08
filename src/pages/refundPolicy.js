import DashboardLayout from '@/app/layout';
import React, { useEffect, useState } from 'react';

const Discover = () => {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('https://freecvbd.com/admin/api/footers');
        const data = await response.json();
        if (data && data?.length > 0) {
          setTerms(data[2]?.value);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <main className="">
      <DashboardLayout>
        <div className='pt-[100px] text-black'>
          <h1 className='text-4xl text-center font-heading font-bold'>Refund Policy</h1>
          
          <p className='text-center'>{terms}</p>
        </div>
      </DashboardLayout>
    </main>
  );
};

export default Discover;