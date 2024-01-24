import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { v4 } from 'uuid';
import axiosAPI from '../../../apis/axios';
import Context from '../../../utilities/contextProvider/Context';

const UserAdoptions = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const { messagingBox, navigate, location } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getAdoptionRequests = async (e) => {
    try {
      const result = await axiosAPI.getUserAdoptions();
      console.log(result.data);
      const { success, adoptions } = result.data;

      if (success) {
        setAdoptionRequests(adoptions);
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
    getAdoptionRequests();
  }, []);

  return (
    <div className='tanTexture border1 rounded mb-3'>
      <h1 className="text-center p-2">Adoption Requests</h1>
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
            <th>Animal Name</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {adoptionRequests.map((obj) => {
            const {
              confirmationNum,
              created,
              status,
              comments,
              animalName,
            } = obj;
            const date = new Date(created);

            return (
              <tr className="text-center h5" key={v4()}>
                <td>{confirmationNum}</td>
                <td>{date.toDateString()}</td>
                <td>{animalName}</td>

                <td>
                  {status}
                </td>
                <td>
                  {comments}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>

  );
};

export default UserAdoptions;
