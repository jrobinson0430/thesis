import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import Context from '../../../utilities/contextProvider/Context';
import axiosAPI from '../../../apis/axios';

const AdoptionRequests = ({ managerBox }) => {
  const { state, hooks, handles } = managerBox;
  const { allAdoptions } = state;
  const { setAllAdoptions } = hooks;
  const { handleStatusChange } = handles;
  const { messagingBox, navigate, location } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getAllAdoptions = async (e) => {
    try {
      const result = await axiosAPI.getAllAdoptions();
      const { success, adoptions } = result.data;

      if (success) {
        setAllAdoptions(adoptions);
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
    getAllAdoptions();
  }, []);

  return (
    <div className='tanTexture border1 rounded mb-3'>
      <h1 className="text-center p-2">Adoption Requests</h1>
      <Table
        striped
        bordered
        hover
        className=' mb-0 border-dark'
        responsive
      >
        <thead>
          <tr
            style={{ textDecoration: 'underline' }}
            className="text-center h3"
          >
            <th>Status</th>
            <th style={{ width: '12rem' }}>Confirmation</th>
            <th>Animal ID</th>
            <th style={{ width: '12rem' }}>Date</th>
            <th style={{ width: '12rem' }}>Full Name</th>
            <th>Email</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {allAdoptions.map((obj) => {
            const {
              confirmationNum,
              _id,
              fullName,
              email,
              comments,

              created,
              status,
              animalId,
            } = obj;

            const date = new Date(created);

            return (
              <tr className="text-center h5" key={v4()}>
                <td>
                  {status.toUpperCase()}
                </td>

                <td>{confirmationNum}</td>
                <td>{animalId}</td>
                <td>{date.toDateString()}</td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td
                  className="overflow-auto h6"
                >
                  {comments}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="dark"
                    data-adoptionid={_id}
                    className="actionBtn shadow1 btn-sm"
                    onClick={handleStatusChange}
                  >
                    Change Status
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdoptionRequests;
