import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { v4 } from 'uuid';
import axiosAPI from '../../../apis/axios';
import Context from '../../../utilities/contextProvider/Context';

const UserDonations = () => {
  const [userDonations, setUserDonations] = useState([]);
  const {
    userData,
    messagingBox,
    navigate,
    location,
  } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getUserDonations = async (e) => {
    try {
      const result = await axiosAPI.getUserDonations();
      const { success, donations } = result.data;
      if (success) {
        setUserDonations(donations);
      }
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
    getUserDonations();
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
            <th>Donation</th>
          </tr>
        </thead>
        <tbody>
          {userDonations.map((obj) => {
            const {
              confirmationNum,
              donation,
              created,
            } = obj;
            const date = new Date(created);

            return (
              <tr className="text-center h5" key={v4()}>
                <td>{confirmationNum}</td>
                <td>{date.toDateString()}</td>

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

export default UserDonations;
