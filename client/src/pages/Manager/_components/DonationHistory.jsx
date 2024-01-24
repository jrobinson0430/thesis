import React, { useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { v4 } from 'uuid';
import Context from '../../../utilities/contextProvider/Context';
import axiosAPI from '../../../apis/axios';

const DonationHistory = ({ managerBox }) => {
  const { state, hooks } = managerBox;
  const { allDonations } = state;
  const { setAllDonations } = hooks;
  const { messagingBox, navigate, location } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getAllDonations = async (e) => {
    try {
      const result = await axiosAPI.getAllDonations();
      const { success, donations } = result.data;
      if (success) { setAllDonations(donations); }
    } catch (error) {
      setUnauthorizedMsg({
        errorMsg: error.message,
        path: location.pathname,
        href: error.response.data.href,
        responseMsg: error.response.data.message,
      });
      navigate('/unauthorized');
    }
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  return (
    <div className='tanTexture border1 rounded mb-3'>
      <h1 className="text-center p-2">Donation History</h1>
      <Table
        striped
        responsive
        bordered
        hover
        className='mb-0 border-dark'
      >
        <thead>
          <tr
            style={{ textDecoration: 'underline' }}
            className="text-center h3"
          >
            <th>Confirmation #</th>
            <th>Date</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Donation</th>
          </tr>
        </thead>
        <tbody>
          {allDonations.map((obj) => {
            const {
              confirmationNum,
              fullName,
              email,
              donation,
              created,
            } = obj;

            const date = new Date(created);

            return (
              <tr className="text-center h5" key={v4()}>
                <td>{confirmationNum}</td>
                <td>{date.toDateString()}</td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>
                  $
                  {donation}
                  .00
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DonationHistory;
